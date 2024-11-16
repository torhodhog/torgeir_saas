"use client"


import { SignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const searchParams = useSearchParams()
  const intent = searchParams.get("intent")

  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignIn 
      forceRedirectUrl={intent ? `/auth/sign-in?intent=${intent}` : "/dashboard"}
      />
    </div>
  )
}

export default Page