"use client"

import { MaxWidthWrapper } from "@/app/components/MaxWithWrapper"
import { Button } from "@/app/components/ui/button"
import { client } from "@/app/lib/client"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "@tanstack/react-query"
import { CheckIcon, Heading } from "lucide-react"
import { useRouter } from "next/navigation"

const Page = () => {
  const { user } = useUser()
  const router = useRouter()

  const PLANS = [
    {
      name: "Basic",
      price: "499 kr",
      description: "Monitor social media platforms for mentions & unwanted posts.",
      features: [
        "Facebook, Twitter, Instagram, Reddit monitoring",
        "Instant Discord alerts",
        "Automated takedown requests",
      ],
    },
    {
      name: "Advanced",
      price: "1 999 kr",
      description: "Covers social media, news websites & public records.",
      features: [
        "Everything in Basic",
        "News site & public record tracking",
        "AI-driven sentiment analysis",
      ],
    },
    {
      name: "👑 Elite",
      price: "9 999 kr",
      description: "Full-scale monitoring including dark web surveillance.",
      features: [
        "Everything in Advanced",
        "Dark web & data breach alerts",
        "Manual intervention & priority support",
      ],
    },
  ]

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async (plan: string) => {
      const res = await client.payment.createCheckoutSession.$post({ body: JSON.stringify({ plan }) })
      return await res.json()
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url)
    },
  })

  const handleGetAccess = (plan: string) => {
    if (user) {
      createCheckoutSession(plan)
    } else {
      router.push("/sign-in?intent=upgrade")
    }
  }

  return (
    <div className="bg-brand-25 py-24 sm:py-32">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-2xl sm:text-center">
          <Heading className="text-center">Your Digital Privacy, Secured</Heading>
          <p className="mt-6 text-base/7 text-gray-600 max-w-prose text-center text-pretty">
            Choose your level of protection. Our system scans the web, alerts you to threats, and ensures unwanted content is removed before it spreads.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div key={plan.name} className="bg-white rounded-3xl ring-1 ring-gray-200 p-8 text-center shadow-lg">
              <h3 className="text-2xl font-heading font-semibold tracking-tight text-gray-900">{plan.name}</h3>
              <p className="mt-2 text-gray-600">{plan.description}</p>
              <p className="mt-6 text-4xl font-bold tracking-tight text-gray-900">{plan.price}</p>
              <ul className="mt-6 space-y-4 text-sm text-gray-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center justify-center gap-3">
                    <CheckIcon className="h-5 w-5 text-brand-700" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button onClick={() => handleGetAccess(plan.name)} className="mt-6 w-full">
                Get {plan.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-heading font-semibold tracking-tight text-gray-900">Need VIP Treatment?</h3>
          <p className="mt-4 text-gray-600">Contact us for a custom solution tailored to your needs.</p>
          <Button className="mt-6">Contact Us</Button>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
