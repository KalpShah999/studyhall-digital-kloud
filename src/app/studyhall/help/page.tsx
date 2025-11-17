"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, HelpCircle, MessageSquare, Mail } from "lucide-react"

export default function HelpPage() {
  const router = useRouter()

  const faqs = [
    {
      question: "How do I add a new study place?",
      answer: "Tap the '+' icon in the bottom navigation, fill out the form with place details, and submit!",
    },
    {
      question: "How accurate is the crowd level information?",
      answer: "Crowd levels are updated by users who check in. The more recent check-ins, the more accurate the information.",
    },
    {
      question: "Can I edit or delete my review?",
      answer: "Currently, reviews cannot be edited or deleted. Please be thoughtful when posting!",
    },
    {
      question: "Why can't I see certain buildings?",
      answer: "Only places that have been added by community members appear in the app. Add missing places using the '+' button!",
    },
    {
      question: "How do I report incorrect information?",
      answer: "You can leave a comment in the Q&A section of any place to notify the community of issues.",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => router.back()}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Help & Support</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* FAQs */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Still Need Help?</h2>
          </div>
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm">Email Support</h3>
                  <p className="text-sm text-muted-foreground">
                    support@studyhall.mcmaster.ca
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    We typically respond within 24-48 hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* About */}
        <div>
          <h2 className="text-lg font-semibold mb-3">About StudyHall</h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                StudyHall is a community-driven platform designed to help McMaster students find the perfect study spots on campus. Built by students, for students.
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                Version 1.0.0
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

