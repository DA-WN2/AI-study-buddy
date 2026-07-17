import React from 'react'

export default function Navbar({ onMenuToggle, activeTab }) {
  const getBreadcrumbs = () => {
    switch (activeTab) {
      case 'flashcards':
        return 'FlashCards'
      case 'research':
        return 'AI Research Assistant'
      case 'quiz':
        return 'Quiz Generator'
      case 'settings':
        return 'Workspace Settings'
      default:
        return 'Dashboard'
    }
  }

  return (
    <header className="fixed top-5 right-5 left-5 md:left-[300px] h-16 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-sm z-30 flex justify-between items-center px-6 transition-all duration-300">
      {/* Left side: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle button */}
        <button 
          onClick={onMenuToggle}
          className="text-on-surface-variant hover:text-primary transition-colors md:hidden p-1.5 hover:bg-white/5 rounded-lg active:scale-95"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        {/* Breadcrumbs or Dashboard Title */}
        <div className="flex items-center gap-2">
          <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider hidden sm:inline">Stud Bud.AI</span>
          <span className="text-on-surface-variant/40 hidden sm:inline text-xs">/</span>
          <span className="font-label-md text-label-md font-semibold text-on-surface">{getBreadcrumbs()}</span>
        </div>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-4 ml-auto sm:ml-0">
        {/* Notifications */}
       

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 hidden sm:block"></div>

        {/* User Details (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <p className="text-on-surface font-label-md font-semibold text-sm">Alex Chen</p>
            <p className="text-on-surface-variant text-[11px]">Pro Plan</p>
          </div>
          <img 
            alt="User avatar" 
            className="w-9 h-9 rounded-full object-cover border border-white/10 ring-2 ring-primary/20 shadow-sm"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0xke1O4uAXX_icj69Us-Bkq8QQsyMR5-ZFtreTE0ahik4VYumpZ_UGzA1R7MuH3nZssCw3EK4FElaGYMvGKD5TW0IH80Ly2xpX436HYrWBttaMyu6tkF-OOvj-hv39BDqizgeLbzPZEmkBtTaLz23sgJUhJUrwmd5fOX-4nA3blP-LSbVDkRMTTcz5NV0psle1BUJKsKdj6g6ap2Gp2YeW7eQhJceQEZM_3FxBGRQw32NqDl5Ph_6"
          />
        </div>

        {/* User details (Mobile avatar only) */}
        <img 
          alt="User avatar" 
          className="w-8 h-8 rounded-full object-cover border border-white/10 sm:hidden"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0xke1O4uAXX_icj69Us-Bkq8QQsyMR5-ZFtreTE0ahik4VYumpZ_UGzA1R7MuH3nZssCw3EK4FElaGYMvGKD5TW0IH80Ly2xpX436HYrWBttaMyu6tkF-OOvj-hv39BDqizgeLbzPZEmkBtTaLz23sgJUhJUrwmd5fOX-4nA3blP-LSbVDkRMTTcz5NV0psle1BUJKsKdj6g6ap2Gp2YeW7eQhJceQEZM_3FxBGRQw32NqDl5Ph_6"
        />
      </div>
    </header>
  )
}
