import React from 'react'

export default function DashboardHome({ setActiveTab }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline-variant/30 bg-surface-container-low/30 backdrop-blur-sm p-14 relative overflow-hidden group min-h-[500px]">
        {/* Subtle background ambient glow for the empty state */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent opacity-50 pointer-events-none"></div>
        
        <div className="flex max-w-[480px] flex-col items-center gap-4 relative z-10 text-center">
          {/* Central Icon */}
          <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-4 text-on-surface-variant shadow-inner border border-outline-variant/20 transition-transform group-hover:scale-105 duration-300">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 300" }}>
              view_cozy
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-on-background text-headline-lg font-semibold leading-tight tracking-tight">
            Main Dashboard Content
          </h2>

          {/* Subheading Description */}
          <p className="text-on-surface-variant text-body-lg">
            Your selected content will appear here. Select a tool from the sidebar to begin.
          </p>

          {/* Actions shortcut */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button 
              onClick={() => setActiveTab('flashcards')}
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-on-surface font-label-md text-sm border border-white/5 backdrop-blur-md transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">amp_stories</span>
              Go to FlashCards
            </button>
            <button 
              onClick={() => setActiveTab('research')}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary-container to-inverse-primary text-white font-label-md text-sm shadow-[0_0_15px_rgba(147,71,225,0.2)] hover:shadow-[0_0_25px_rgba(147,71,225,0.4)] transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">psychology</span>
              Open AI Research
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
