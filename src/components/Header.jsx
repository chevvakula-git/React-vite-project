import React, { useMemo, useRef, useState } from 'react'

function Header({ onMenuClick = () => {} }) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const containerRef = useRef(null)

  const allSuggestions = useMemo(
    () => [
      'javascript tutorial',
      'react hooks explained',
      'tailwind css crash course',
      'frontend interview prep',
      'vite react setup',
      'web performance tips',
      'node.js best practices',
      'css grid vs flexbox',
    ],
    []
  )

  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) return allSuggestions.slice(0, 6)
    const lower = query.toLowerCase()
    return allSuggestions.filter((s) => s.includes(lower)).slice(0, 8)
  }, [allSuggestions, query])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsFocused(false)
    // In a real app, navigate to a search results page
    // For now, just alert the query
    if (query.trim()) alert(`Search: ${query}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-3 sm:h-16 sm:px-4">
        {/* Left: menu + logo */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Open menu"
            onClick={onMenuClick}
            className="rounded-full p-2 hover:bg-gray-100 md:pointer-events-none md:opacity-70"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
          <a href="#" className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-[6px] bg-red-600">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white"><path d="M8 5v14l11-7-11-7z"/></svg>
            </span>
            <span className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">VidTube</span>
          </a>
        </div>

        {/* Center: search */}
        <div ref={containerRef} className="relative hidden min-w-0 flex-1 items-center justify-center md:flex">
          <form onSubmit={handleSubmit} className="flex w-full max-w-2xl">
            <div className="flex w-full overflow-hidden rounded-l-full border border-gray-300 bg-white focus-within:border-blue-500">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder="Search"
                aria-label="Search"
                className="w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-r-full border-y border-r border-gray-300 bg-gray-100 px-4 hover:bg-gray-200"
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button
              type="button"
              aria-label="Voice search"
              onClick={() => alert('Voice search not implemented')}
              className="ml-2 rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700"><path d="M12 14a4 4 0 0 0 4-4V7a4 4 0 1 0-8 0v3a4 4 0 0 0 4 4Z"/><path d="M19 11a7 7 0 0 1-14 0"/><path d="M12 19v4"/></svg>
            </button>
          </form>

          {isFocused && (
            <div
              className="absolute left-0 right-0 top-12 z-50 mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
              onMouseDown={(e) => {
                // prevent input blur before click fires
                e.preventDefault()
              }}
            >
              <ul role="listbox" aria-label="Search suggestions" className="divide-y divide-gray-100">
                {filteredSuggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-50"
                      onClick={() => {
                        setQuery(s)
                        setIsFocused(false)
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
                      <span className="truncate">{s}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button type="button" className="rounded-full p-2 hover:bg-gray-100" aria-label="Create">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          </button>
          <button type="button" className="hidden rounded-full p-2 hover:bg-gray-100 sm:inline-flex" aria-label="Apps">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4zM4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z"/></svg>
          </button>
          <button type="button" className="relative rounded-full p-2 hover:bg-gray-100" aria-label="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21h4"/></svg>
            <span className="absolute right-1 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white">3</span>
          </button>
          <button type="button" className="ml-1 inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
            JT
          </button>
        </div>
      </div>

      {/* Mobile search bar under header */}
      <div className="block border-t border-gray-200 px-3 py-2 md:hidden">
        <form onSubmit={handleSubmit} className="flex">
          <div className="flex w-full overflow-hidden rounded-l-full border border-gray-300 bg-white focus-within:border-blue-500">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search"
              aria-label="Search"
              className="w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-r-full border-y border-r border-gray-300 bg-gray-100 px-4 hover:bg-gray-200"
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <button
            type="button"
            aria-label="Voice search"
            onClick={() => alert('Voice search not implemented')}
            className="ml-2 rounded-full bg-gray-100 p-2 hover:bg-gray-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700"><path d="M12 14a4 4 0 0 0 4-4V7a4 4 0 1 0-8 0v3a4 4 0 0 0 4 4Z"/><path d="M19 11a7 7 0 0 1-14 0"/><path d="M12 19v4"/></svg>
          </button>
        </form>
      </div>
    </header>
  )
}

export default Header


