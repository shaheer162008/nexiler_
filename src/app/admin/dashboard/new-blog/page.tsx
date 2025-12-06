'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { addDoc, collection } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db, app } from '../../../../../firebase/init'

interface BlogForm {
  title: string
  content: string
  category: string
  date: string
  featuredImage: string
  status: 'draft' | 'published'
  time: string
}

const NewBlogPage = () => {
  const router = useRouter()
  const auth = getAuth(app)
  
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showFormatGuide, setShowFormatGuide] = useState(false)

  const [formData, setFormData] = useState<BlogForm>({
    title: '',
    content: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    featuredImage: '',
    status: 'draft',
    time: '',
  })

  // Auth check - redirect if not authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        setIsLoading(false)
      } else {
        setIsAuthenticated(false)
        setIsLoading(false)
        router.push('/admin')
      }
    })

    return () => unsubscribe()
  }, [auth, router])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image size must be less than 10MB' }))
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setFormData((prev) => ({
          ...prev,
          featuredImage: reader.result as string,
        }))
        // Clear image error
        if (errors.image) {
          setErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors.image
            return newErrors
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Format helpers
  const insertFormat = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)

    if (!selectedText) {
      alert('Please select text to format')
      return
    }

    let formattedText = ''
    switch (format) {
      case 'bold':
        formattedText = `#${selectedText}#`
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        break
      case 'underline':
        formattedText = `_${selectedText}_`
        break
      case 'code':
        formattedText = `\`${selectedText}\``
        break
      case 'highlight':
        formattedText = `~${selectedText}~`
        break
      default:
        return
    }

    const newContent =
      formData.content.substring(0, start) +
      formattedText +
      formData.content.substring(end)

    setFormData((prev) => ({
      ...prev,
      content: newContent,
    }))

    // Restore focus and selection
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start, start + formattedText.length)
    }, 0)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required'
    } else if (formData.content.length < 50) {
      newErrors.content = 'Content must be at least 50 characters'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    }

    if (!formData.time.trim()) {
      newErrors.time = 'Read time is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Process content - keep formatting markers and encode line breaks
  const processContent = (content: string): string => {
    // Replace newlines with [BR] marker - KEEP ALL FORMATTING MARKERS
    return content.replace(/\n/g, '[BR]')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Process content to encode line breaks while keeping formatting markers
      const processedContent = processContent(formData.content)

      const blogData = {
        title: formData.title,
        excerpt: formData.content.substring(0, 150).replace(/\n/g, ' '),
        content: processedContent,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        featuredImage: formData.featuredImage,
        status: 'published',
        createdAt: new Date().toISOString(),
      }

      console.log('Saving blog data:', blogData)

      const docRef = await addDoc(collection(db, 'blogs'), blogData)
      console.log('Blog created with ID:', docRef.id)

      // Clear form and redirect
      setFormData({
        title: '',
        content: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        featuredImage: '',
        status: 'draft',
        time: '',
      })
      setImagePreview(null)
      
      // Redirect to dashboard
      router.push('/admin/dashboard')
    } catch (error: any) {
      console.error('Error creating blog:', error)
      setErrors({ submit: error.message || 'Failed to create blog. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleDraft = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Process content to encode line breaks while keeping formatting markers
      const processedContent = processContent(formData.content)

      const blogData = {
        title: formData.title,
        excerpt: formData.content.substring(0, 150).replace(/\n/g, ' '),
        content: processedContent,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        featuredImage: formData.featuredImage,
        status: 'draft',
        createdAt: new Date().toISOString(),
      }

      console.log('Saving draft data:', blogData)

      const docRef = await addDoc(collection(db, 'blogs'), blogData)
      console.log('Blog saved as draft with ID:', docRef.id)

      router.push('/admin/dashboard')
    } catch (error: any) {
      console.error('Error saving draft:', error)
      setErrors({ submit: error.message || 'Failed to save draft. Please try again.' })
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render content if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Go back"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
              <p className="text-sm text-gray-600">Add a new article to your blog</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Featured Image Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Featured Image</h2>
            <div className="flex flex-col gap-4">
              {imagePreview ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null)
                      setFormData((prev) => ({ ...prev, featuredImage: '' }))
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mx-auto mb-3 text-gray-400"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <label className="block cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700 font-semibold">Click to upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
              {errors.image && (
                <span className="text-red-600 text-sm">{errors.image}</span>
              )}
            </div>
          </div>

          {/* Basic Information Section */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Blog Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title (e.g., Getting Started with AI Automation)"
                maxLength={100}
                className={`w-full text-black px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.title
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white'
                }`}
              />
              <div className="flex justify-between mt-1">
                {errors.title && (
                  <span className="text-red-600 text-sm">{errors.title}</span>
                )}
                <span className={`text-xs ml-auto ${formData.title.length > 90 ? 'text-yellow-600' : 'text-gray-500'}`}>
                  {formData.title.length}/100
                </span>
              </div>
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Read Time <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="e.g., 5 min read"
                className={`w-full text-black px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.time
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white'
                }`}
              />
              {errors.time && (
                <span className="text-red-600 text-sm mt-1 block">{errors.time}</span>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Content</h2>
              <button
                type="button"
                onClick={() => setShowFormatGuide(!showFormatGuide)}
                className="text-xs px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              >
                {showFormatGuide ? 'Hide' : 'Show'} Format Guide
              </button>
            </div>

            {/* Format Guide */}
            {showFormatGuide && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Text Formatting Guide</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-blue-800">
                  <div>
                    <code className="bg-white px-2 py-1 rounded">#text#</code>
                    <p className="mt-1">Bold</p>
                  </div>
                  <div>
                    <code className="bg-white px-2 py-1 rounded">*text*</code>
                    <p className="mt-1">Italic</p>
                  </div>
                  <div>
                    <code className="bg-white px-2 py-1 rounded">_text_</code>
                    <p className="mt-1">Underline</p>
                  </div>
                  <div>
                    <code className="bg-white px-2 py-1 rounded">`text`</code>
                    <p className="mt-1">Code</p>
                  </div>
                  <div>
                    <code className="bg-white px-2 py-1 rounded">~text~</code>
                    <p className="mt-1">Highlight</p>
                  </div>
                  <div>
                    <code className="bg-white px-2 py-1 rounded">Enter Key</code>
                    <p className="mt-1">Line Break</p>
                  </div>
                </div>
              </div>
            )}

            {/* Formatting Toolbar */}
            <div className="flex flex-wrap text-black gap-2 p-3 bg-gray-100 rounded-lg border border-gray-300">
              <button
                type="button"
                onClick={() => insertFormat('bold')}
                title="Bold (select text first)"
                className="p-2 bg-white hover:bg-gray-50 border border-gray-300 rounded transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                  <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => insertFormat('italic')}
                title="Italic (select text first)"
                className="p-2 bg-white hover:bg-gray-50 border border-gray-300 rounded transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="4" x2="10" y2="4"></line>
                  <line x1="14" y1="20" x2="5" y2="20"></line>
                  <line x1="15" y1="4" x2="9" y2="20"></line>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => insertFormat('underline')}
                title="Underline (select text first)"
                className="p-2 bg-white hover:bg-gray-50 border border-gray-300 rounded transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 4v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4"></path>
                  <line x1="4" y1="21" x2="20" y2="21"></line>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => insertFormat('code')}
                title="Code (select text first)"
                className="p-2 bg-white hover:bg-gray-50 border border-gray-300 rounded transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => insertFormat('highlight')}
                title="Highlight (select text first)"
                className="p-2 bg-white hover:bg-gray-50 border border-gray-300 rounded transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 17.25V21h3.75L17.81 9.94m-6.75-6.75L17.81 9.94m0 0l3.75 3.75"></path>
                </svg>
              </button>
            </div>

            {/* Main Content */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Blog Content <span className="text-red-600">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog post content here...&#10;Select text and use the toolbar to format it.&#10;Press Enter to create new paragraphs."
                rows={10}
                className={`w-full text-black px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none font-mono ${
                  errors.content
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white'
                }`}
              />
              {errors.content && (
                <span className="text-red-600 text-sm mt-1 block">{errors.content}</span>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {formData.content.length} characters
              </p>
            </div>
          </div>

          {/* SEO & Metadata Section */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">SEO & Metadata</h2>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full text-black px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.category
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <option value="">Select a category</option>
                <option value="AI Automation">AI Automation</option>
                <option value="Security">Security</option>
                <option value="AI Insights">AI Insights</option>
                <option value="Development">Development</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Best Practices">Best Practices</option>
                <option value="Tutorials">Tutorials</option>
                <option value="Case Studies">Case Studies</option>
              </select>
              {errors.category && (
                <span className="text-red-600 text-sm mt-1 block">{errors.category}</span>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full text-black px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.date
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white'
                }`}
              />
              {errors.date && (
                <span className="text-red-600 text-sm mt-1 block">{errors.date}</span>
              )}
            </div>
          </div>

          {/* Error Summary */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm font-medium">{errors.submit}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 sticky bottom-6 bg-gray-50 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDraft}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.22" y1="4.22" x2="7.07" y2="7.07"></line>
                    <line x1="16.93" y1="16.93" x2="19.78" y2="19.78"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="7.07" y2="16.93"></line>
                    <line x1="16.93" y1="7.07" x2="19.78" y2="4.22"></line>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Publish Blog
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default NewBlogPage