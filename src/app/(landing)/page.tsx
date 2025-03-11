import { Check, Star } from "lucide-react"
import Image from "next/image"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

import { DiscordMessage } from "../components/discord-message"
import { Heading } from "../components/Heading"
import { Icons } from "../components/icons"
import { MaxWidthWrapper } from "../components/MaxWithWrapper"
import { MockDiscordUi } from "../components/mock-discordUi"
import { ShinyButton } from "../components/ShinyButton"
import { AnimatedList } from "../components/ui/animated-list"

const Page = () => {
  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
    method: "POST",
    body: JSON.stringify({
      category: "sale",
      fields: {
        plan: "PRO",
        email: "zoe.martinez2001@email.com",
        amount: 49.00
      }
    }),
    headers: {
      Authorization: "Bearer <YOUR_API_KEY>"
    }
  })`

  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center">
            <div className="mb-6">
              <Heading>
                <span>
                  Exclusive Reputation Protection & Content Monitoring,
                </span>
                <br />
                <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">
                  Delivered Instantly
                </span>
              </Heading>
            </div>
            <p className="text-base/7 text-gray-700 max-w-prose text-center text-pretty mb-6">
              <span className="font-semibold text-brand-700">
                Protect your reputation, monitor leaks, and take control of your
                online presence.
              </span>
              Get instant alerts when your name, brand, or sensitive data
              appears online –
              <span className="font-semibold text-brand-800">
                from Google, social media, Jodel, and all over the web.
              </span>
            </p>

            <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start mb-6">
              {[
                "Instant notifications when your name or brand appears online",
                "Premium subscription, fully automated & exclusive",
                "Monitor leaks, rumors, and unauthorized content across the web",
              ].map((item, index) => (
                <li key={index} className="flex gap-1.5 items-center text-left">
                  <Check className="size-5 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="w-full max-w-80">
              <ShinyButton
                href="/sign-up"
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                {" "}
                Sign Up for free today{" "}
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="relative bg-brand-25 pb-4">
        <div className="absolute inset-x-0 bottom-24 top-24 bg-brand-700" />
        <div className="relative mx-auto">
          <MaxWidthWrapper className="relative">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
              <MockDiscordUi>
                <AnimatedList>
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="Clean Sheet Bot"
                    username="Clean Sheet"
                    timestamp="Today at 12:20PM"
                    badgeText="Alert"
                    badgeColor="#ff4444"
                    title="🚨 Mention Detected"
                    content={{
                      platform: "Twitter",
                      content: "Breaking: [Client Name] accused of...",
                      link: "https://twitter.com/post123",
                    }}
                  />

                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="Clean Sheet Bot"
                    username="Clean Sheet"
                    timestamp="Today at 12:20PM"
                    badgeText="Alert"
                    badgeColor="#ff4444"
                    title="🚨 Mention Detected"
                    content={{
                      platform: "Jodel",
                      content:
                        "Anonymous: '[Client Name] er involvert i en skandale!'",
                      link: "https://jodel.com/thread123",
                    }}
                  />

                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="Clean Sheet Bot"
                    username="Clean Sheet"
                    timestamp="Today at 12:21PM"
                    badgeText="Resolved"
                    badgeColor="#43b581"
                    title="✅ Content Removed"
                    content={{
                      platform: "Dark Web",
                      action: "Manually requested takedown",
                      status: "Success",
                    }}
                  />
                </AnimatedList>
              </MockDiscordUi>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center text-base/7 font-semibold text-brand-600">
              Intuitive Monitoring
            </h2>
            <Heading>Stay ahead with real time insights</Heading>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />

              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Instant Alerts, Total Control
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-700 max-lg:text-center">
                    Get notified the moment your name, brand, or sensitive data
                    appears online. Stay ahead of rumors, leaks, and unwanted
                    exposure – anytime, anywhere.
                  </p>
                </div>

                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <Image
                      className="size-full object-cover object-top"
                      src="/phone-screen.png"
                      alt="Phone screen displaying app interface"
                      fill
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]" />
            </div>

            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Monitor Any Mention
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-700 max-lg:text-center">
                    Stay informed whenever your name, brand, or sensitive data
                    appears online. From social media to the dark web, Clean
                    Sheet keeps you in control.
                  </p>
                </div>

                <div className="flex flex-1 items-center justify-center px-8 max-lg:pd-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <Image
                    className="w-full max-lg:max-w-xs"
                    src="/bento-any-event.png"
                    alt="Bento box illustrating event tracking"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
            </div>

            {/* THIRD GRID */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white">
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                      Monitor Custom Keywords
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-700 max-lg:text-center">
                      Track any name, brand, or keyword you want. Customize your
                      alerts to monitor specific mentions, leaks, or emerging
                      trends before they spread.
                    </p>
                  </div>

                  <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                    <Image
                      className="w-full max-lg:max-w-xs"
                      src="/bento-custom-data.png"
                      alt="Bento box illustrating custom data tracking"
                      width={500}
                      height={300}
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
              </div>
            </div>

            {/* fourth bento grid element */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />

              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Seamless Integration
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-700 max-lg:text-center">
                    Connect Clean Sheet to your existing tools effortlessly. Get
                    real-time alerts via Discord, email, or API—ensuring you're
                    always informed.
                  </p>
                </div>

                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                          cleansheet.js
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <div className="max-h-[30rem]">
                        <SyntaxHighlighter
                          language="typescript"
                          style={{
                            ...oneDark,
                            'pre[class*="laguage-"]': {
                              ...oneDark['pre[class*="laguage-"]'],
                              background: "transparent",
                              overflow: "hidden",
                            },
                            'code[class*="laguage-"]': {
                              ...oneDark['code[class*="laguage-"]'],
                              background: "transparent",
                            },
                          }}
                        >
                          {codeSnippet}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="relative py-24 sm:py-32 bg-white">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center text-base/7 font-semibold text-brand-700">
              Real World Experiences
            </h2>
            <Heading className="text-center">What Our Customers say</Heading>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:max-0 lg:max-w-none lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            {/* First testimonial */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-50 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-brand-600 text-brand-600" />
                <Star className="size-5 text-brand-600 text-brand-600" />
                <Star className="size-5 text-brand-600 text-brand-600" />
                <Star className="size-5 text-brand-600 text-brand-600" />
                <Star className="size-5 text-brand-600 text-brand-600" />
              </div>

              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                Clean Sheet har been a game-changer for me. Ive seen sales pop
                uo in real-time and I can now make decisions faster than ever.
              </p>

              <div className=" flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/user-2.png"
                  className="rounded-full object-cover"
                  alt="User profile picture"
                  width={48}
                  height={48}
                />

                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Line Lundberg
                    <Icons.verificationBadge className="size-4 inline-block ml-1.5" />
                  </p>
                  <p className="text-sm text-gray-600">@linlun</p>
                </div>
              </div>
            </div>

            {/* Second review */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-50 p-6 sm:p-8 lg:p-16 rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-brand-600 text-brand-600" />
                <Star className="size-5 text-brand-600 text-brand-600" />
                <Star className="size-5 text-brand-600 text-brand-600" />
                <Star className="size-5 text-brand-600 text-brand-600" />
                <Star className="size-5 text-brand-600 text-brand-600" />
              </div>

              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                PingPanda works great. Been baying off for our SaaS. Nice to
                follow how were doing it day by day.
              </p>

              <div className=" flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/user-1.png"
                  className="rounded-full object-cover"
                  alt="User profile picture"
                  width={48}
                  height={48}
                />

                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Tord Stensletten
                    <Icons.verificationBadge className="size-4 inline-block ml-1.5" />
                  </p>
                  <p className="text-sm text-gray-600">@stensly</p>
                </div>
              </div>
            </div>
          </div>

          <ShinyButton
            href="/sign-up"
            className="relative z-10 h-14 w-full max-w-xs text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            Sign Up for free today
          </ShinyButton>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page
