import { NextRequest, NextResponse } from 'next/server'

// Google Review type
export interface GoogleReview {
  author_name: string
  author_url?: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

// Cache Google reviews (refresh weekly)
let cachedReviews: GoogleReview[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

export async function GET(request: NextRequest) {
  // Return cached data if still valid
  const now = Date.now()
  if (cachedReviews && (now - cacheTimestamp) < CACHE_DURATION) {
    return NextResponse.json({ 
      reviews: cachedReviews,
      cached: true,
      lastUpdated: new Date(cacheTimestamp).toISOString()
    })
  }

  try {
    // Get Google Place ID from environment
    const placeId = process.env.GOOGLE_PLACE_ID
    const googleApiKey = process.env.GOOGLE_API_KEY

    if (!placeId || !googleApiKey) {
      return NextResponse.json({ 
        reviews: [],
        error: 'Google API not configured. Please set GOOGLE_PLACE_ID and GOOGLE_API_KEY environment variables.',
        cached: false,
        lastUpdated: new Date().toISOString()
      }, { status: 200 }) // Return 200 so frontend doesn't break
    }

    // Fetch reviews from Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${googleApiKey}`
    )

    if (!response.ok) {
      throw new Error('Google API request failed')
    }

    const data = await response.json()

    if (data.status === 'OK' && data.result?.reviews) {
      cachedReviews = data.result.reviews.slice(0, 10) // Get top 10 reviews
      cacheTimestamp = now
      
      return NextResponse.json({ 
        reviews: cachedReviews,
        placeName: data.result.name,
        averageRating: data.result.rating,
        totalRatings: data.result.user_ratings_total,
        cached: false,
        lastUpdated: new Date().toISOString()
      })
    } else {
      throw new Error(data.error_message || 'Failed to fetch reviews')
    }

  } catch (error) {
    console.error('Google Reviews API error:', error)
    
    // Return cached data if available, even if expired
    if (cachedReviews) {
      return NextResponse.json({ 
        reviews: cachedReviews,
        cached: true,
        error: 'Failed to fetch new reviews, using cached data',
        lastUpdated: new Date(cacheTimestamp).toISOString()
      })
    }

    return NextResponse.json({ 
      reviews: [],
      error: 'Failed to fetch Google reviews',
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
  cachedReviews = null
  cacheTimestamp = 0

  // Fetch fresh data
  return GET(request)
}

