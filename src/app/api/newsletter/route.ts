import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      )
    }

    // Option 1: Mailchimp integration
    // const mailchimpApiKey = process.env.MAILCHIMP_API_KEY
    // const mailchimpListId = process.env.MAILCHIMP_LIST_ID
    // const mailchimpDc = mailchimpApiKey?.split('-')[1]
    // 
    // if (mailchimpApiKey && mailchimpListId) {
    //   await fetch(
    //     `https://${mailchimpDc}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Authorization': `apikey ${mailchimpApiKey}`,
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email_address: email,
    //         status: 'subscribed',
    //       }),
    //     }
    //   )
    // }

    // Option 2: ConvertKit integration
    // const convertKitApiKey = process.env.CONVERTKIT_API_KEY
    // const convertKitFormId = process.env.CONVERTKIT_FORM_ID
    // 
    // if (convertKitApiKey && convertKitFormId) {
    //   await fetch(
    //     `https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`,
    //     {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         api_key: convertKitApiKey,
    //         email: email,
    //       }),
    //     }
    //   )
    // }

    // Option 3: Send notification via Resend
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
          subject: source === 'ebook' ? 'Ebook Download Request' : 'New Newsletter Subscriber',
          html: `<p>${source === 'ebook' ? 'Ebook download' : 'Newsletter'} request: ${email}</p>`,
        }),
      })
    }

    // Log subscription (for development/debugging)
    console.log('Newsletter subscription:', {
      email,
      source: source || 'newsletter',
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

