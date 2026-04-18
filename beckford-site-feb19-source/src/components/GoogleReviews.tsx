'use client'

import { useState, useEffect } from 'react'
import { Star, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface GoogleReview {
  author_name: string
  author_url?: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface ReviewsData {
  reviews: GoogleReview[]
  placeName?: string
  averageRating?: number
  totalRatings?: number
  error?: string
}

export function GoogleReviews({ maxReviews = 6 }: { maxReviews?: number }) {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/google-reviews')
      const data = await response.json()
      
      if (data.reviews && data.reviews.length > 0) {
        setReviewsData(data)
        setError(null)
      } else if (data.error) {
        setError(data.error)
        setReviewsData(null)
      } else {
        setReviewsData({ reviews: [] })
      }
    } catch (err) {
      console.error('Failed to fetch Google reviews:', err)
      setError('Failed to load reviews')
      setReviewsData(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(maxReviews)].map((_, i) => (
          <div
            key={`loading-${i}`}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl animate-pulse"
          >
            <div className="h-4 bg-white/10 rounded mb-4" />
            <div className="h-20 bg-white/10 rounded mb-4" />
            <div className="h-4 bg-white/10 rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  // Return null if no reviews - parent will show fallback testimonials
  if (error || !reviewsData?.reviews || reviewsData.reviews.length === 0) {
    return null
  }

  const reviewsToShow = reviewsData.reviews.slice(0, maxReviews)

  return (
    <>
      {/* Average Rating Summary - rendered before parent grid */}
      {reviewsData.averageRating && reviewsData.totalRatings && (
        <div className="col-span-full text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-display text-5xl text-accent">
              {reviewsData.averageRating.toFixed(1)}
            </span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.round(reviewsData.averageRating!)
                      ? 'text-accent fill-accent'
                      : 'text-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-white/60">
            Based on {reviewsData.totalRatings} Google reviews
            {reviewsData.placeName && ` for ${reviewsData.placeName}`}
          </p>
        </div>
      )}

      {/* Reviews as grid items - will be placed in parent grid */}
      {reviewsToShow.map((review, index) => (
        <div
          key={`${review.author_name}-${review.time}`}
          className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-accent/20 transition-all hover-lift"
        >
            {/* Rating Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? 'text-accent fill-accent'
                      : 'text-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-white/80 leading-relaxed mb-6 text-sm">
              &quot;{review.text}&quot;
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                {review.profile_photo_url ? (
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold">
                    {review.author_name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-white text-sm">
                    {review.author_name}
                  </div>
                  <div className="text-white/50 text-xs">
                    {review.relative_time_description}
                  </div>
                </div>
              </div>
              {review.author_url && (
                <Link
                  href={review.author_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        ))}
      
      {/* View More Link - full width */}
      {reviewsData.placeName && (
        <div className="col-span-full text-center mt-8">
          <Link
            href={`https://www.google.com/maps/place/?q=place_id:${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors text-sm"
          >
            View all reviews on Google
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      )}
    </>
  )
}

