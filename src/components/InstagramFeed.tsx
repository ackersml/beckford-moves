'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Instagram, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface InstagramPost {
  id: string
  media_url: string
  permalink: string
  caption?: string
  timestamp: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/instagram')
      const data = await response.json()
      
      if (data.posts && data.posts.length > 0) {
        setPosts(data.posts)
        setError(null)
      } else if (data.error) {
        setError(data.error)
        // Use fallback placeholder posts if API not configured
        setPosts([])
      } else {
        setPosts([])
      }
    } catch (err) {
      console.error('Failed to fetch Instagram posts:', err)
      setError('Failed to load Instagram posts')
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  // Fallback placeholder images (current static images)
  const fallbackImages = [
    '/550817016_4275966279348856_5968913664506866919_nfull.webp',
    '/551823294_827877546333490_7871412054573750767_nfull.webp',
    '/549049402_1484409522793244_4827967998982376665_nfull.webp',
  ]

  // Use real posts if available, otherwise use fallback images
  const displayPosts: (InstagramPost | string)[] = posts.length > 0 
    ? posts 
    : fallbackImages

  // Show 6 posts in grid
  const postsToShow = displayPosts.slice(0, 6)

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-10">
      {loading ? (
        // Loading skeletons
        [...Array(6)].map((_, i) => (
          <div
            key={`loading-${i}`}
            className="aspect-square bg-white/5 rounded-lg animate-pulse"
          />
        ))
      ) : (
        <>
          {postsToShow.map((post, i) => {
            const isString = typeof post === 'string'
            const postId = isString ? `fallback-${i}` : post.id
            const href = isString ? 'https://instagram.com/beckford_sean' : post.permalink
            const imageSrc = isString ? post : post.media_url
            const imageAlt = isString ? `Instagram post ${i + 1}` : (post.caption?.substring(0, 50) || `Instagram post ${i + 1}`)
            
            return (
              <Link
                key={postId}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square bg-white/5 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer group relative"
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
                {!isString && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </Link>
            )
          })}
          {/* Fill remaining slots with placeholders if needed */}
          {postsToShow.length < 6 && [...Array(6 - postsToShow.length)].map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center"
            >
              <Instagram className="w-8 h-8 text-white/20" />
            </div>
          ))}
        </>
      )}
      {error && !loading && (
        <div className="col-span-full text-center text-white/40 text-sm mt-4">
          {error.includes('not configured') ? (
            <span>Instagram feed will appear here once configured</span>
          ) : (
            <span>Unable to load Instagram posts</span>
          )}
        </div>
      )}
    </div>
  )
}

