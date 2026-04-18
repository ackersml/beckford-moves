import { NextRequest, NextResponse } from 'next/server'

// This endpoint is called by Vercel Cron to refresh Instagram posts weekly
export async function GET(request: NextRequest) {
  // Verify this is a cron request
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  
  // Vercel Cron sends the secret in the Authorization header
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // In production, Vercel automatically adds the auth header
    // For local testing, you can bypass this check
    if (process.env.NODE_ENV === 'production' && !authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    // Call the main Instagram API endpoint with POST to force refresh
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/instagram`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cronSecret || 'cron-secret'}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    return NextResponse.json({
      success: true,
      message: 'Instagram feed refreshed',
      postsCount: data.posts?.length || 0,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to refresh Instagram feed',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}

