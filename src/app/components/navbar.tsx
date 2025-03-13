"use client"

import { useState, useEffect } from "react"
import { useUser, SignOutButton } from "@clerk/nextjs"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { MaxWidthWrapper } from "./MaxWithWrapper"
import { Button, buttonVariants } from "./ui/button"

export const Navbar = () => {
  const { user } = useUser() // Henter bruker fra Clerk
  const [isUserInPrisma, setIsUserInPrisma] = useState<boolean | null>(null)

  useEffect(() => {
    const checkUserInPrisma = async () => {
      if (!user) return

      try {
        const res = await fetch("/api/check-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ externalId: user.id }),
        })

        const data = await res.json()
        setIsUserInPrisma(data.exists) // ✅ Oppdaterer state basert på Prisma-sjekk
      } catch (error) {
        console.error("Error checking user in Prisma:", error)
        setIsUserInPrisma(false) // 🚨 Noe gikk galt
      }
    }

    checkUserInPrisma()
  }, [user])

  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold">
            Clean<span className="text-brand-700">Sheet</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <SignOutButton>
                  <Button size="sm" variant="ghost">
                    Sign Out
                  </Button>
                </SignOutButton>

                {isUserInPrisma === false && (
                  <p className="text-sm text-red-600">⚠️ User not in database</p>
                )}

                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1",
                  })}
                >
                  Dashboard <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Pricing
                </Link>
                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign in
                </Link>

                <div className="h-8 w-px bg-gray-200" />

                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1.5",
                  })}
                >
                  Sign up <ArrowRight className="size-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
