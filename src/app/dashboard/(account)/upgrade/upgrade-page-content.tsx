"use client"

import { Card } from "@/app/components/ui/card"
import { client } from "@/app/lib/client"
import { Plan } from "@prisma/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { BarChart } from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

export const UpdatePageContent = ({ plan }: { plan: Plan }) => {
  const router = useRouter()

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post()
      return await res.json()
    },
    onSuccess: ({ url }) => {
      if (url) {
        router.push(url)
      }
    },
  })

  const { data: usageData } = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      const res = await client.project.getUsage.$get()
      return await res.json()
    },
  })

  // Beskrivelse basert på plan
  const planDescriptions = {
    BASIC: "Get started with essential monitoring features.",
    STANDARD: "Monitor more sources and access advanced analytics.",
    PREMIUM: "Complete digital footprint monitoring with priority alerts."
  }

  return (
    <div className="max-w-3xl flex flex-col gap-8">
      <div>
        <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">
          Plan: {plan}
        </h1>
        <p className="text-sm/6 text-gray-600 max-w-prose">
          {planDescriptions[plan as keyof typeof planDescriptions] || "Select the right plan for your needs."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-brand-700">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">Total Scans</p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-2xl font-bold">
              {usageData?.eventsUsed || 0} of {usageData?.eventsLimit?.toLocaleString() || 100}
            </p>
            <p className="text-xs/5 text-muted-foreground">Scans this period</p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">Monitored Sources</p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-2xl font-bold">
              {usageData?.categoriesUsed || 0} of {usageData?.categoriesLimit?.toLocaleString() || 10}
            </p>
            <p className="text-xs/5 text-muted-foreground">Active sources</p>
          </div>
        </Card>
      </div>

      <p className="text-sm text-gray-500">
        Usage resets{" "}
        {usageData?.resetDate ? (
          format(usageData.resetDate, "MMMM d, yyyy")
        ) : (
          <span className="animate-pulse w-8 h-4 bg-gray-200"> </span>
        )}
        {plan !== "PREMIUM" && (
          <span
            onClick={() => createCheckoutSession()}
            className="cursor-pointer inline underline text-brand-600"
          >
            {" "}
            or upgrade now to increase your limit &rarr;
          </span>
        )}
      </p>
    </div>
  )
}
