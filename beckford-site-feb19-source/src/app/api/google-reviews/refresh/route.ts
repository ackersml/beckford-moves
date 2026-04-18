import { NextRequest, NextResponse } from 'next/server'

// This endpoint is called by Vercel Cron to refresh Google reviews weekly
export async function GET(request: NextRequest) {
  // Verify this is a cron request
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  
  // Vercel Cron sends the secret in the Authorization header
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    if (process.env.NODE_ENV === 'production' && !authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    // Call the main Google Reviews API endpoint with POST to force refresh
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/google-reviews`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cronSecret || 'cron-secret'}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    return NextResponse.json({
      success: true,
      message: 'Google reviews refreshed',
      reviewsCount: data.reviews?.length || 0,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to refresh Google reviews',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}

