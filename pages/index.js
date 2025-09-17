import { useState, useEffect } from 'react'
import { theme } from '../theme.config.js'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.MASTER_REPO_URL}/api/content/${process.env.DOMAIN_NAME}`)
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div 
      style={{ 
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.fonts.body,
        minHeight: '100vh'
      }}
    >
      <header 
        style={{ 
          backgroundColor: theme.colors.primary,
          color: 'white',
          padding: '1rem 0'
        }}
      >
        <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto', padding: '0 1rem' }}>
          <h1 style={{ fontFamily: theme.fonts.heading, fontSize: '2rem', margin: 0 }}>
            Rollover401ktogold.us
          </h1>
        </div>
      </header>

      <main style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: theme.layout.sidebar ? '2fr 1fr' : '1fr', gap: '2rem' }}>
          <div>
            <h2 style={{ fontFamily: theme.fonts.heading, fontSize: '1.5rem', marginBottom: '1rem' }}>
              Latest Posts
            </h2>
            {posts.length === 0 ? (
              <p>No posts available yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {posts.slice(0, 10).map((post, index) => (
                  <article 
                    key={index}
                    style={{
                      backgroundColor: theme.colors.surface,
                      padding: '1.5rem',
                      borderRadius: '8px',
                      border: `1px solid ${theme.colors.border}`
                    }}
                  >
                    <h3 style={{ fontFamily: theme.fonts.heading, marginBottom: '0.5rem' }}>
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p style={{ color: theme.colors.textSecondary, marginBottom: '1rem' }}>
                        {post.excerpt}
                      </p>
                    )}
                    <a 
                      href={`/${post.slug}`}
                      style={{ color: theme.colors.accent, textDecoration: 'none' }}
                    >
                      Read More →
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>

          {theme.layout.sidebar && (
            <aside>
              <div 
                style={{
                  backgroundColor: theme.colors.surface,
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: `1px solid ${theme.colors.border}`
                }}
              >
                <h3 style={{ fontFamily: theme.fonts.heading, marginBottom: '1rem' }}>Recent Posts</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {posts.slice(0, 5).map((post, index) => (
                    <a 
                      key={index}
                      href={`/${post.slug}`}
                      style={{ 
                        color: theme.colors.text, 
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                      }}
                    >
                      {post.title}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}