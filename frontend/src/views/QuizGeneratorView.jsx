import React, { useState } from 'react'
import quizService from '../services/quizService'

export default function QuizGeneratorView() {
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('Intermediate')
  const [isGenerating, setIsGenerating] = useState(false)
  const [quizData, setQuizData] = useState(null)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const difficulties = ['Beginner', 'Intermediate', 'Advanced']

  // Handle live backend quiz generation
  const handleGenerateSubmit = async (e) => {
    e.preventDefault()
    if (!topic.trim()) return

    setIsGenerating(true)
    setErrorMessage('')
    setQuizData(null)
    setSelectedAnswers({})
    setSubmitted(false)

    try {
      const data = await quizService.generateQuiz(topic.trim(), difficulty)
      
      if (data && data.questions && Array.isArray(data.questions)) {
        setQuizData(data)
      } else {
        throw new Error('Invalid response structure received from API.')
      }
    } catch (err) {
      console.error('Failed to generate quiz:', err)
      const details = err.response?.data?.error || err.response?.data?.details || err.message || 'Server timeout or connection failed.'
      setErrorMessage(`Failed to generate quiz: ${details}`)
    } finally {
      setIsGenerating(false)
    }
  }

  // Answer selection handler
  const handleSelectOption = (questionIndex, optionIndex) => {
    if (submitted) return
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }))
  }

  // Get current correct answers count
  const getScore = () => {
    if (!quizData) return 0
    let correct = 0
    quizData.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  return (
    <div className="flex-grow flex flex-col gap-6 w-full max-w-3xl mx-auto animate-fade-in pb-12">
      {/* Header Section */}
      <div>
        <h2 className="text-display-lg text-on-surface font-bold mb-2 tracking-tight">
          Quiz Generator
        </h2>
        <p className="text-body-md text-on-surface-variant">
          Assess your memory retention and critical comprehension with AI-configured quizzes.
        </p>
      </div>

      {/* 1. Form Card */}
      <div className="bg-white/[0.03] backdrop-blur-[20px] border border-white/10 border-t-white/20 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
        <div>
          <h3 className="text-headline-md font-bold text-on-surface mb-1">Create a Quiz</h3>
          <p className="text-label-sm text-on-surface-variant">Configure your topic and difficulty parameter settings.</p>
        </div>

        <form onSubmit={handleGenerateSubmit} className="flex flex-col gap-5">
          {/* Topic Input Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Quiz Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Indium Antimonide Nanowires or Quantum Mechanics"
              className="w-full bg-surface-container-high/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
              required
              disabled={isGenerating}
            />
          </div>

          {/* Difficulty Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {difficulties.map(diff => {
                const isActive = difficulty === diff
                return (
                  <button
                    type="button"
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    disabled={isGenerating}
                    className={`py-3 rounded-xl border font-semibold text-sm transition-all duration-200 active:scale-95 text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                      ${isActive
                        ? 'bg-primary-container/20 text-primary border-primary shadow-[0_0_15px_rgba(147,71,225,0.2)] font-bold'
                        : 'bg-surface-container-high/40 text-on-surface-variant border-white/5 hover:bg-white/5 hover:text-on-surface'}`}
                  >
                    {diff}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Generate Quiz Button */}
          <button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="w-full mt-4 bg-gradient-to-r from-primary-container to-inverse-primary text-white font-label-md py-4 rounded-xl shadow-[0_0_20px_rgba(147,71,225,0.25)] hover:shadow-[0_0_30px_rgba(147,71,225,0.45)] transition-all duration-300 active:scale-95 font-bold text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
                <span>Generating Quiz...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                <span>Generate Quiz</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* 2. Error Display */}
      {errorMessage && (
        <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl flex items-start gap-3 animate-fade-in">
          <span className="material-symbols-outlined text-rose-400 mt-0.5">error</span>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-rose-300">Quiz Generation Error</h4>
            <p className="text-xs text-rose-400 mt-1 leading-relaxed">{errorMessage}</p>
          </div>
          <button 
            onClick={handleGenerateSubmit}
            className="px-3 py-1.5 rounded-md bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {/* 3. Generating Loader Card */}
      {isGenerating && (
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-surface-container-high overflow-hidden">
            <div className="h-full bg-primary animate-pulse w-2/3 rounded-full"></div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary animate-pulse">
              <span className="material-symbols-outlined text-3xl">smart_toy</span>
            </div>
            <h4 className="text-headline-md font-bold text-on-surface">Assembling Quiz Questions...</h4>
            <p className="text-on-surface-variant text-label-sm max-w-xs leading-relaxed">
              Stud Bud.AI agents are scanning cached knowledge and preparing exactly 5 multiple choice items.
            </p>
          </div>
        </div>
      )}

      {/* 4. Generated Quiz Section (Placed BELOW the Form) */}
      {quizData && !isGenerating && (
        <div className="w-full bg-white/[0.03] backdrop-blur-[20px] border border-white/10 border-t-white/20 rounded-2xl p-6 md:p-8 flex flex-col gap-8 animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-semibold text-[10px] uppercase tracking-wider">
                  {quizData.difficulty}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">
                  {quizData.questions.length} Questions
                </span>
              </div>
              <h4 className="text-headline-lg font-bold text-on-surface truncate max-w-md">
                {quizData.topic} Assessment
              </h4>
            </div>
            <button
              onClick={() => {
                setQuizData(null);
                setSelectedAnswers({});
                setSubmitted(false);
              }}
              className="text-on-surface-variant hover:text-on-surface px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-xs font-semibold transition-all active:scale-95 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              <span>Clear</span>
            </button>
          </div>

          {/* Questions List */}
          <div className="flex flex-col gap-8">
            {quizData.questions.map((q, qIndex) => (
              <div key={qIndex} className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-container/20 text-primary border border-primary/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {qIndex + 1}
                  </div>
                  <h4 className="text-headline-sm font-semibold text-on-surface leading-snug">
                    {q.question}
                  </h4>
                </div>

                {/* Radio Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-9">
                  {q.options.map((option, optIdx) => {
                    const isChecked = selectedAnswers[qIndex] === optIdx;
                    
                    // Styling logic based on submission state
                    let optionStyle = 'bg-white/[0.02] border-white/5 text-on-surface-variant hover:bg-white/5 hover:text-on-surface';
                    if (submitted) {
                      if (optIdx === q.correctAnswer) {
                        optionStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-medium cursor-not-allowed';
                      } else if (isChecked) {
                        optionStyle = 'bg-rose-500/10 border-rose-500/40 text-rose-400 font-medium cursor-not-allowed';
                      } else {
                        optionStyle = 'bg-white/[0.01] border-white/5 text-on-surface-variant/40 cursor-not-allowed opacity-50';
                      }
                    } else if (isChecked) {
                      optionStyle = 'bg-primary/10 border-primary text-primary font-medium';
                    }

                    return (
                      <label
                        key={optIdx}
                        onClick={() => handleSelectOption(qIndex, optIdx)}
                        className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border transition-all duration-150 leading-relaxed
                          ${optionStyle}`}
                      >
                        <input
                          type="radio"
                          name={`quiz-question-${qIndex}`}
                          checked={isChecked}
                          disabled={submitted}
                          onChange={() => handleSelectOption(qIndex, optIdx)}
                          className="accent-primary w-4 h-4 mt-0.5 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <span className="text-xs leading-normal">{option}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Progress / Submission Footer */}
          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
            {submitted ? (
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-2xl border-2 shrink-0
                  ${getScore() === quizData.questions.length 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                    : 'bg-primary/20 text-primary border-primary/40'}`}
                >
                  {getScore()}/{quizData.questions.length}
                </div>
                <div>
                  <p className="text-base font-bold text-on-surface">
                    Quiz Completed!
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-normal">
                    You scored <span className="text-primary font-bold text-sm">{getScore()}</span> out of <span className="font-semibold">{quizData.questions.length}</span> correct answers.
                  </p>
                </div>
              </div>
            ) : (
              <span>
                {Object.keys(selectedAnswers).length} of {quizData.questions.length} answered
              </span>
            )}

            <div>
              {submitted ? (
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setSubmitted(false);
                  }}
                  className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-on-surface text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                >
                  Retake Quiz
                </button>
              ) : (
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={Object.keys(selectedAnswers).length < quizData.questions.length}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary-container to-inverse-primary text-white text-xs font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
