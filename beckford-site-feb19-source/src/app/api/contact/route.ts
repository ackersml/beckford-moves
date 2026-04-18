import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, service, goals } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !goals) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Option 1: Send to Formspree (replace with Sean's Formspree endpoint)
    // const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT
    // if (formspreeEndpoint) {
    //   await fetch(formspreeEndpoint, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ firstName, lastName, email, phone, service, goals }),
    //   })
    // }

    // Option 2: Send via Resend (requires RESEND_API_KEY env var)
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Beckford Moves <noreply@beckfordmoves.com>',
          to: ['beckford.sean@gmail.com'],
          subject: `New Consultation Request from ${firstName} ${lastName}`,
          html: `
            <h2>New Consultation Request</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Interested In:</strong> ${service || 'Not specified'}</p>
            <h3>Goals:</h3>
            <p>${goals}</p>
          `,
        }),
      })
    }

    // Log submission (for development/debugging)
    console.log('Contact form submission:', {
      firstName,
      lastName,
      email,
      phone,
      service,
      goals,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}

