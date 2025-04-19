"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MessageSquare, Star, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

export function FeedbackButton() {
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState("3")
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)

    // In a real app, this would send the feedback to a server
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      })

      setTimeout(() => {
        setFeedback("")
        setRating("3")
        setIsSubmitted(false)
        setIsOpen(false)
      }, 1500)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 z-50 focus-ring"
          aria-label="Provide feedback"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogDescription>We'd love to hear your thoughts on how we can improve TagMaster.</DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="feedback-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-4 py-4"
            >
              <div className="space-y-2">
                <Label htmlFor="rating" className="text-sm font-medium">
                  How would you rate your experience?
                </Label>
                <div className="flex items-center justify-center space-x-2 py-2">
                  <RadioGroup
                    value={rating}
                    onValueChange={setRating}
                    className="flex items-center space-x-1"
                    id="rating"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex flex-col items-center">
                        <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="sr-only peer" />
                        <Label
                          htmlFor={`rating-${value}`}
                          className="cursor-pointer p-2 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary rounded-full peer-data-[state=checked]:text-yellow-500"
                        >
                          <Star
                            className={`h-8 w-8 transition-colors ${
                              Number.parseInt(rating) >= value
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        </Label>
                        <span className="sr-only">{value} stars</span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback" className="text-sm font-medium">
                  Your feedback
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us what you think..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px] focus-ring"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="feedback-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Star className="h-6 w-6 text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Thank you for your feedback!</h3>
              <p className="mt-2 text-sm text-muted-foreground">Your input helps us improve TagMaster for everyone.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter>
          {!isSubmitted && (
            <>
              <Button variant="outline" onClick={() => setIsOpen(false)} className="focus-ring">
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!feedback.trim() || isSubmitting} className="focus-ring">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
