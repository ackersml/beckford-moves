import { NextRequest, NextResponse } from 'next/server'

// Instagram post type
export interface InstagramPost {
  id: string
  media_url: string
  permalink: string
  caption?: string
  timestamp: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
}

// Cache Instagram posts (refresh weekly)
let cachedPosts: InstagramPost[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

export async function GET(request: NextRequest) {
  // Return cached data if still valid
  const now = Date.now()
  if (cachedPosts && (now - cacheTimestamp) < CACHE_DURATION) {
    return NextResponse.json({ 
      posts: cachedPosts,
      cached: true,
      lastUpdated: new Date(cacheTimestamp).toISOString()
    })
  }

  try {
    // Method 1: Try Instagram Basic Display API (if configured)
    const instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const instagramUserId = process.env.INSTAGRAM_USER_ID || 'beckford_sean' // Instagram handle: @beckford_sean

    if (instagramAccessToken) {
      // Using Instagram Graph API
      const response = await fetch(
        `https://graph.instagram.com/${instagramUserId}/media?fields=id,media_type,media_url,permalink,caption,timestamp&access_token=${instagramAccessToken}&limit=12`
      )

      if (response.ok) {
        const data = await response.json()
        cachedPosts = data.data || []
        cacheTimestamp = now
        return NextResponse.json({ 
          posts: cachedPosts,
          cached: false,
          lastUpdated: new Date().toISOString()
        })
      }
    }

    // Method 2: Fallback - Use Instagram oEmbed or public feed
    // Note: Instagram's public API is limited, so we'll use a fallback approach
    // For production, you'll need to set up Instagram API credentials
    
    // For now, return a message indicating setup is needed
    return NextResponse.json({ 
      posts: [],
      error: 'Instagram API not configured. Please set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID environment variables.',
      cached: false,
      lastUpdated: new Date().toISOString()
    }, { status: 200 }) // Return 200 so the frontend doesn't break

  } catch (error) {
    console.error('Instagram API error:', error)
    
    // Return cached data if available, even if expired
    if (cachedPosts) {
      return NextResponse.json({ 
        posts: cachedPosts,
        cached: true,
        error: 'Failed to fetch new posts, using cached data',
        lastUpdated: new Date(cacheTimestamp).toISOString()
      })
    }

    return NextResponse.json({ 
      posts: [],
      error: 'Failed to fetch Instagram posts',
      cached: false
    }, { status: 500 })
  }
}

// Force refresh endpoint (for cron jobs)
export async function POST(request: NextRequest) {
  // Verify cron secret if set
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Clear cache to force refresh
  cachedPosts = null
  cacheTimestamp = 0

  // Fetch fresh data
  return GET(request)
}

