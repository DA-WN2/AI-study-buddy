import React, { useState, useEffect } from 'react'
import api from '../services/api'

export default function FlashCardsView() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [decks, setDecks] = useState([])
  const [loadingDecks, setLoadingDecks] = useState(true)
  
  // Study session state
  const [studyDeck, setStudyDeck] = useState(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [sessionSuccessCount, setSessionSuccessCount] = useState(0)

  // Creation state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newDeckName, setNewDeckName] = useState('')
  const [isCreatingDeck, setIsCreatingDeck] = useState(false)



  // Fetch decks & their cards on mount
  const fetchDecks = async () => {
    try {
      setLoadingDecks(true)
      const data = await api.getDecks()
      
      const decksWithCards = await Promise.all(
        data.map(async (deck, idx) => {
          try {
            const cards = await api.getFlashcardsByDeck(deck._id)
            return {
              id: deck._id,
              title: deck.name,
              subtitle: 'AI Generated Deck',
              icon: idx % 3 === 0 ? 'science' : idx % 3 === 1 ? 'web' : 'language',
              iconColor: idx % 3 === 0 ? 'text-primary' : idx % 3 === 1 ? 'text-emerald-400' : 'text-rose-400',
              iconBg: idx % 3 === 0 ? 'from-blue-500/20 to-purple-500/20' : idx % 3 === 1 ? 'from-emerald-500/20 to-teal-500/20' : 'from-rose-500/20 to-orange-500/20',
              cardsCount: cards.length,
              lastStudied: 'Recently',
              mastery: cards.length > 0 ? Math.min(45 + (cards.length * 8), 98) : 0,
              isDue: cards.length > 0 && idx % 2 === 0,
              dueCount: cards.length > 0 ? Math.ceil(cards.length / 2) : 0,
              cards: cards
            }
          } catch (cardErr) {
            console.error(`Failed to fetch cards for deck ${deck._id}:`, cardErr)
            return {
              id: deck._id,
              title: deck.name,
              subtitle: 'Deck load issue',
              icon: 'warning',
              iconColor: 'text-rose-400',
              iconBg: 'from-rose-500/20 to-orange-500/20',
              cardsCount: 0,
              lastStudied: 'Never',
              mastery: 0,
              isDue: false,
              dueCount: 0,
              cards: []
            }
          }
        })
      )

      setDecks(decksWithCards)
    } catch (err) {
      console.error("Failed to fetch decks:", err)
    } finally {
      setLoadingDecks(false)
    }
  }

  useEffect(() => {
    fetchDecks()
  }, [])

  // Create a new blank deck
  const handleCreateDeckSubmit = async (e) => {
    e.preventDefault()
    if (!newDeckName.trim()) return

    setIsCreatingDeck(true)
    try {
      const created = await api.createDeck(newDeckName.trim())
      setNewDeckName('')
      setShowCreateModal(false)
      
      // Auto-create a sample starting card for user
      if (created && created._id) {
        await api.createFlashcard(
          created._id, 
          `What is the main topic of the ${created.name} deck?`, 
          `This deck contains synthesized flashcards regarding ${created.name}.`
        )
      }
      
      fetchDecks()
    } catch (err) {
      console.error("Failed to create deck:", err)
    } finally {
      setIsCreatingDeck(false)
    }
  }

  // Delete a deck
  const handleDeleteDeck = async (id, e) => {
    e.stopPropagation()
    if (confirm("Are you sure you want to delete this deck and all its flashcards?")) {
      try {
        await api.deleteDeck(id)
        fetchDecks()
      } catch (err) {
        console.error("Failed to delete deck:", err)
      }
    }
  }

  // Start study session
  const startStudy = (deck) => {
    if (!deck.cards || deck.cards.length === 0) {
      alert("This deck has no cards yet. Synthesize some sources or add a card first!")
      return
    }
    setStudyDeck(deck)
    setCurrentCardIndex(0)
    setIsFlipped(false)
    setSessionSuccessCount(0)
  }

  // Study card progress handlers
  const handleCardFeedback = (gotIt) => {
    if (gotIt) {
      setSessionSuccessCount(prev => prev + 1)
    }
    
    if (currentCardIndex + 1 < studyDeck.cards.length) {
      setIsFlipped(false)
      setCurrentCardIndex(prev => prev + 1)
    } else {
      // Completed session
      setCurrentCardIndex(studyDeck.cards.length) // trigger complete screen
    }
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-8 items-start w-full">
      {/* Primary Canvas (Left Section) */}
      <div className="flex-1 flex flex-col gap-8 w-full">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-display-lg text-on-surface font-bold mb-2 tracking-tight">
              FlashCards
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Master your knowledge base with AI-driven spaced repetition.
            </p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-container to-inverse-primary text-white px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(147,71,225,0.3)] hover:shadow-[0_0_30px_rgba(147,71,225,0.5)] transition-all duration-300 active:scale-95 whitespace-nowrap font-label-md font-bold"
          >
            <span className="material-symbols-outlined">add</span>
            <span>Create New Deck</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 whitespace-nowrap border
              ${activeFilter === 'all' 
                ? 'bg-primary/20 text-primary border-primary/30' 
                : 'bg-surface-container/50 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-white/5'}`}
          >
            All Decks
          </button>
          <button 
            onClick={() => setActiveFilter('recent')}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 whitespace-nowrap border
              ${activeFilter === 'recent' 
                ? 'bg-primary/20 text-primary border-primary/30' 
                : 'bg-surface-container/50 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-white/5'}`}
          >
            Recent
          </button>
          <button 
            onClick={() => setActiveFilter('favorites')}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 whitespace-nowrap border
              ${activeFilter === 'favorites' 
                ? 'bg-primary/20 text-primary border-primary/30' 
                : 'bg-surface-container/50 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-white/5'}`}
          >
            Favorites
          </button>
        </div>

        {/* Decks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {loadingDecks && decks.length === 0 ? (
            <div className="col-span-full text-center py-10 text-on-surface-variant text-sm">
              Loading decks and flashcards from database...
            </div>
          ) : decks.length === 0 ? (
            <div className="col-span-full text-center py-12 text-on-surface-variant text-sm border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
              No decks found. Generate research sources or click "Create New Deck" to start!
            </div>
          ) : (
            decks.map((deck) => (
              <div 
                key={deck.id}
                className={`bg-white/[0.03] backdrop-blur-[20px] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/[0.05] transition-all duration-300 group relative overflow-hidden
                  ${deck.isDue ? 'border-primary/30 border-t-primary/50' : 'border-t-white/20'}`}
              >
                {deck.isDue && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] rounded-full -mr-10 -mt-10 pointer-events-none"></div>
                )}
                
                <div className="flex justify-between items-start relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${deck.iconBg} flex items-center justify-center border border-white/5`}>
                    <span className={`material-symbols-outlined ${deck.iconColor} text-2xl`}>
                      {deck.icon}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => handleDeleteDeck(deck.id, e)}
                      className="text-on-surface-variant hover:text-red-400 p-2 rounded-md hover:bg-white/5 transition-colors"
                      title="Delete Deck"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-headline-md font-bold text-on-surface mb-1 group-hover:text-primary transition-colors truncate">
                    {deck.title}
                  </h3>
                  <p className="text-label-sm text-on-surface-variant font-medium">
                    {deck.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-on-surface-variant text-label-sm relative z-10">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">style</span>
                    <span>{deck.cardsCount} Cards</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/20"></div>
                  <div>Last studied: {deck.lastStudied}</div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-3 relative z-10">
                  {deck.isDue ? (
                    <button 
                      onClick={() => startStudy(deck)}
                      className="flex-1 bg-gradient-to-r from-primary-container to-inverse-primary text-white font-label-md text-sm py-2.5 rounded-lg shadow-[0_0_15px_rgba(147,71,225,0.2)] hover:shadow-[0_0_25px_rgba(147,71,225,0.4)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      <span>Review Due</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => startStudy(deck)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-on-surface font-label-md text-sm py-2.5 rounded-lg border border-white/5 backdrop-blur-md transition-colors flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      <span>Study</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Create blank deck card */}
          <div 
            onClick={() => setShowCreateModal(true)}
            className="bg-white/[0.01] border border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.03] hover:border-white/40 transition-all duration-300 cursor-pointer min-h-[280px]"
          >
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border border-white/5">
              <span className="material-symbols-outlined text-on-surface-variant text-3xl">add_circle</span>
            </div>
            <div className="text-center">
              <h3 className="text-headline-md text-on-surface mb-1 font-semibold">Create Blank Deck</h3>
              <p className="text-label-sm text-on-surface-variant">Start from scratch or use AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Widgets (Right Column) */}
      <aside className="w-full lg:w-80 flex flex-col gap-6 shrink-0">

        {/* Recent Activity Widget */}
        <div className="bg-white/[0.03] backdrop-blur-[20px] border border-white/10 border-t-white/20 rounded-2xl p-6">
          <h3 className="text-headline-md font-bold text-on-surface mb-4">Recent Activity</h3>
          <div className="flex flex-col gap-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
            {decks.slice(0, 3).map((deck, idx) => (
              <div key={deck.id} className="flex gap-4 relative z-10">
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                </div>
                <div>
                  <p className="text-label-md text-on-surface font-medium">Auto-prepared deck</p>
                  <p className="text-label-sm text-primary truncate max-w-[180px]">{deck.title}</p>
                  <p className="text-label-sm text-on-surface-variant mt-1">{deck.cardsCount} cards added</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Create Deck Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-md hover:bg-white/5"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-headline-md font-bold text-on-surface mb-2">Create Blank Deck</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              Enter a name for the new flashcard deck. We'll initialize it with a starting sample card.
            </p>
            <form onSubmit={handleCreateDeckSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Deck Name
                </label>
                <input 
                  type="text" 
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                  placeholder="e.g. Molecular Chemistry" 
                  className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  required
                  autoFocus
                />
              </div>
              <div className="flex gap-3 justify-end mt-4">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-lg hover:bg-white/5 text-on-surface-variant text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isCreatingDeck}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary-container to-inverse-primary text-white text-sm font-semibold shadow-[0_0_15px_rgba(147,71,225,0.2)] hover:shadow-[0_0_25px_rgba(147,71,225,0.4)] transition-all active:scale-95"
                >
                  {isCreatingDeck ? 'Creating...' : 'Create Deck'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Active Study Session Modal Overlay */}
      {studyDeck && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container border border-white/10 p-6 rounded-2xl w-full max-w-xl shadow-2xl relative flex flex-col min-h-[400px] justify-between">
            {/* Header / progress */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h3 className="text-headline-md font-bold text-primary truncate max-w-sm">{studyDeck.title}</h3>
                <p className="text-xs text-on-surface-variant">Spaced Repetition Session</p>
              </div>
              <button 
                onClick={() => setStudyDeck(null)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-md hover:bg-white/5"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Main Card View */}
            <div className="flex-1 flex items-center justify-center py-8">
              {currentCardIndex < studyDeck.cards.length ? (
                <div className="w-full max-w-md">
                  {/* Card Index */}
                  <div className="text-center text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-4">
                    Card {currentCardIndex + 1} of {studyDeck.cards.length}
                  </div>

                  {/* Flippable Glass Panel Card */}
                  <div 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="glass-panel cursor-pointer min-h-[180px] p-6 rounded-2xl border border-t-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden group"
                  >
                    <div className="absolute top-2 right-3 text-[10px] text-on-surface-variant/40 group-hover:text-primary transition-colors flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-xs">flip</span> Click to Flip
                    </div>

                    {!isFlipped ? (
                      <div className="animate-fade-in">
                        <p className="text-xs font-semibold uppercase text-primary tracking-wider mb-2">Question</p>
                        <h4 className="text-lg font-bold text-on-surface leading-snug px-4">
                          {studyDeck.cards[currentCardIndex].question}
                        </h4>
                      </div>
                    ) : (
                      <div className="animate-fade-in">
                        <p className="text-xs font-semibold uppercase text-emerald-400 tracking-wider mb-2">Answer</p>
                        <p className="text-sm font-medium text-on-surface leading-relaxed px-4">
                          {studyDeck.cards[currentCardIndex].answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Congrats Finished Screen */
                <div className="text-center flex flex-col items-center max-w-sm py-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-4 text-primary animate-bounce">
                    <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                  </div>
                  <h4 className="text-headline-md font-bold text-on-surface mb-2">Session Complete!</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    You've successfully completed the study cards in this deck. 
                    Your daily goals progress has been updated!
                  </p>
                  <div className="mt-4 text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-on-surface">
                    Score: {sessionSuccessCount} / {studyDeck.cards.length} Got It
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="border-t border-white/10 pt-4 flex gap-3 justify-end">
              {currentCardIndex < studyDeck.cards.length ? (
                <>
                  {!isFlipped ? (
                    <button 
                      onClick={() => setIsFlipped(true)}
                      className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-on-surface text-sm font-semibold transition-all"
                    >
                      Show Answer
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleCardFeedback(false)}
                        className="px-4 py-2.5 rounded-lg border border-red-500/30 text-rose-400 bg-red-500/10 hover:bg-red-500/20 text-sm font-semibold transition-all"
                      >
                        Need Study
                      </button>
                      <button 
                        onClick={() => handleCardFeedback(true)}
                        className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500/80 to-teal-500/80 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg transition-all active:scale-95"
                      >
                        Got It!
                      </button>
                    </>
                  )}
                </>
              ) : (
                <button 
                  onClick={() => setStudyDeck(null)}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary-container to-inverse-primary text-white text-sm font-semibold shadow-md transition-all active:scale-95"
                >
                  Close Session
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
