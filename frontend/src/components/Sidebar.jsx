import React from 'react'

export default function Sidebar({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navItems = [
    { id: 'flashcards', label: 'FlashCards', icon: 'amp_stories' },
    { id: 'research', label: 'AI Research Assistant', icon: 'psychology' }
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Sidebar container */}
      <aside className={`
        fixed top-5 bottom-5 left-5 w-64 glass-panel rounded-xl flex flex-col justify-between z-40 overflow-y-auto transition-all duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col gap-4 p-4">
          {/* Logo Section */}
          <div 
            className="flex gap-3 items-center mb-6 px-2 cursor-pointer group"
            onClick={() => handleTabClick('dashboard')}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-on-primary font-variation-settings-[FILL=1]" style={{ fontVariationSettings: "'FILL' 1" }}>
                lightbulb
              </span>
            </div>
            <div>
              <h1 className="text-primary text-headline-md font-bold leading-normal tracking-tight">Lumina AI</h1>
              <p className="text-on-surface-variant text-[10px] uppercase tracking-wider font-semibold">Intelligence Workspace</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all active:scale-95 duration-200 w-full text-left
                    ${isActive 
                      ? 'bg-primary-container/20 text-primary border-l-4 border-primary font-semibold' 
                      : 'text-on-surface-variant hover:bg-white/10 hover:text-on-surface'}
                  `}
                >
                  <span 
                    className="material-symbols-outlined" 
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-label-md font-medium leading-normal">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        
        
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
