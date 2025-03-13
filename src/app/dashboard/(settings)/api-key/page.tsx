import { DashboardPage } from "@/app/components/dashboard-page"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ApiKeySettings } from "./api-key-settings"
import { WatchlistForm } from "@/app/components/WatchlistForm"

const Page = async () => {
   const auth = await currentUser()
   if (!auth) {
     redirect("/sign-in")
   }

   const user = await db.user.findUnique({
      where: { externalId: auth.id },
   })

   if (!user) {
      redirect("/sign-in")
   }

   return (
      <DashboardPage title="Settings">
         <div className="space-y-6 p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
            <ApiKeySettings apiKey={user.apiKey ?? ""} />
            <WatchlistForm />
         </div>
      </DashboardPage>
   )
   
}

export default Page