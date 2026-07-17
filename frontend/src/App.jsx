import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import DashboardHome from './views/DashboardHome'
import FlashCardsView from './views/FlashCardsView'
import ResearchAssistantView from './views/ResearchAssistantView'
import QuizGeneratorView from './views/QuizGeneratorView'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('flashcards')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome setActiveTab={setActiveTab} />
      case 'flashcards':
        return <FlashCardsView />
      case 'research':
        return <ResearchAssistantView />
      case 'quiz':
        return <QuizGeneratorView />
      case 'settings':
        return (
          <div className="flex-grow flex flex-col gap-6">
            <h2 className="text-display-lg text-on-surface font-bold mb-2">Workspace Settings</h2>
            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6 max-w-2xl">
              <div>
                <h3 className="text-headline-md font-bold text-on-surface mb-2">AI Configuration</h3>
                <p className="text-body-md text-on-surface-variant mb-4">Manage models and automatic synthesis thresholds.</p>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl border border-white/5">
                    <div>
                      <div className="text-label-md font-semibold text-on-surface">Default Synthesis Model</div>
                      <div className="text-xs text-on-surface-variant">Stud Bud.AI Model V4 (Default)</div>
                    </div>
                    <button className="px-4 py-2 bg-primary-container/20 text-primary border border-primary/30 rounded-lg text-xs font-semibold hover:bg-primary-container/30 transition-all">
                      Configure
                    </button>
                  </div>
                  <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl border border-white/5">
                    <div>
                      <div className="text-label-md font-semibold text-on-surface">Auto-Synthesis Threshold</div>
                      <div className="text-xs text-on-surface-variant">Trigger analysis after 3 new papers are uploaded</div>
                    </div>
                    <span className="px-2.5 py-1 bg-secondary/15 text-secondary border border-secondary/20 rounded text-xs font-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <DashboardHome setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="relative min-h-screen text-on-surface">
      {/* Background Gradient Effect */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-container-high/50 via-background to-background"></div>

      {/* Floating Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />

      {/* Main Content Layout Container */}
      <main className="min-h-screen pt-28 pb-10 px-margin-mobile md:px-margin-desktop md:pl-[300px] max-w-container-max mx-auto flex flex-col transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
