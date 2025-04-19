"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "TagMaster has completely transformed how I optimize my YouTube videos. My views have increased by 40% since I started using it!",
      author: "Alex Johnson",
      role: "Tech YouTuber",
      avatar: "/placeholder.svg?height=80&width=80",
      platform: "YouTube",
      rating: 5,
    },
    {
      quote: "The TikTok hashtag suggestions are spot on. I've seen my videos reach the FYP much more consistently.",
      author: "Sophia Chen",
      role: "Content Creator",
      avatar: "/placeholder.svg?height=80&width=80",
      platform: "TikTok",
      rating: 5,
    },
    {
      quote:
        "As someone who manages multiple social accounts, having all platforms in one tool is a game-changer for my workflow.",
      author: "Marcus Williams",
      role: "Social Media Manager",
      avatar: "/placeholder.svg?height=80&width=80",
      platform: "Multiple",
      rating: 4,
    },
  ]

  return (
    <section className="w-full py-8 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">Loved by Content Creators</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
              See what our users are saying about TagMaster
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
