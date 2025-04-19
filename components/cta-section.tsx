"use client"
import { motion } from "framer-motion"

export function CTASection() {
  return (
    <section className="w-full py-8 md:py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 dark:from-indigo-950 dark:via-purple-950 dark:to-indigo-950">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-3 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-1 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
              Ready to Optimize Your Content?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
              Start generating perfect tags and hashtags for your content across all platforms today.
            </p>
          </div>
          <div className="mt-4 bg-primary/10 rounded-md p-3 max-w-xl mx-auto">
            <p className="text-center font-medium text-primary">
              Simply scroll up to access our platform tools and start optimizing your content right away!
            </p>
            <p className="text-sm text-muted-foreground mt-1 text-center">
              No sign-up required. No downloads needed. Just use it directly in your browser.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
