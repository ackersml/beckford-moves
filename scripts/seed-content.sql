-- Run in Supabase SQL Editor (project piweqfwrfjhwtoupkzlv) if the API cannot write to beckford.site_content.
-- Seeds all content keys used in src/app/page.tsx with default values.

INSERT INTO beckford.site_content (key, value)
VALUES
  ('hero_title', '{"text": "1 on 1 Personal Training, Life Coaching and Nutrition Guidance"}'::jsonb),
  ('hero_subtitle', '{"text": "Transform your fitness journey with personalized 1-on-1 training, life coaching, and nutrition guidance. Sean Beckford brings 11 years of experience and 9 professional certifications to create custom programs that deliver real results."}'::jsonb),
  ('hero_body', '{"text": "Train virtually from anywhere or in-person in Downtown Toronto. Access your programming, video demonstrations, and 24/7 support through the beckfordfitness app. Flexible packages from $299/month or individual sessions available."}'::jsonb),
  ('hero_closing', '{"text": "Our holistic approach combines functional movement, evidence-based nutrition, and recovery methods to help you achieve lasting transformation."}'::jsonb),
  ('hero_cta', '{"text": "Schedule a Free Consultation"}'::jsonb),
  ('hero_cta_secondary', '{"text": "View Packages"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
