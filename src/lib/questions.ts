/**
 * Q&A Management System
 * Stores questions and answers for places
 */

const QUESTIONS_KEY = "studyhall_questions"

export interface Question {
  id: string
  placeId: string
  question: string
  answer: string | null
  timestamp: number
  author: string
}

export function getAllQuestions(): Question[] {
  if (typeof window === "undefined") return []
  try {
    const questions = localStorage.getItem(QUESTIONS_KEY)
    return questions ? JSON.parse(questions) : []
  } catch {
    return []
  }
}

export function getQuestionsForPlace(placeId: string): Question[] {
  return getAllQuestions().filter((q) => q.placeId === placeId)
}

export function addQuestion(placeId: string, questionText: string): void {
  if (typeof window === "undefined") return
  
  const question: Question = {
    id: `question_${Date.now()}`,
    placeId,
    question: questionText,
    answer: null,
    timestamp: Date.now(),
    author: "You",
  }
  
  const questions = getAllQuestions()
  questions.unshift(question)
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions))
  window.dispatchEvent(new CustomEvent("questionsChanged"))
}

