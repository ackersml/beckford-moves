export const metadata = {
  title: 'Beckford Moves Studio',
  description: 'Content management for Beckford Moves website',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}



