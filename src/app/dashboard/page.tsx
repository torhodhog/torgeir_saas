import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardPage } from "../components/dashboard-page";
import { DashboardPageContent } from "./dasboard-page-content"; // Sikrer riktig import
import { CreateEventCategoryModal } from "../components/create-event-category-modal";
import { Button } from "../components/ui/button";
import { PlusIcon } from "lucide-react";
import { createCheckoutSession } from "../lib/stripe";
import { PaymentSuccessModal } from "../components/payment-success-modal";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  console.log("Fetching authenticated user...");
  const auth = await currentUser();

  if (!auth) {
    console.error("No authenticated user found. Redirecting to sign-in.");
    redirect("/sign-in");
    return null;
  }

  console.log("Authenticated Clerk user:", auth);

  try {
    let user = await db.user.findUnique({
      where: { externalId: auth.id },
    });

    // Hvis brukeren ikke finnes i Prisma, opprett en ny
    if (!user) {
      console.log(`No user found in Prisma for externalId: ${auth.id}. Creating new user.`);

      user = await db.user.create({
        data: {
          externalId: auth.id,
          email: auth.emailAddresses[0]?.emailAddress || "",
          quotaLimit: 100, // Standard kvote
          plan: "BASIC", // Endret fra "FREE" til en gyldig plan
        },
      });

      console.log(`New user created in Prisma: ${user.email}`);
    }

    // Håndter betalingsoppgradering
    const intent = searchParams.intent;
    if (intent === "upgrade") {
      console.log("User wants to upgrade. Creating checkout session...");
      const session = await createCheckoutSession({
        userEmail: user.email,
        userId: user.id,
      });

      if (session.url) {
        console.log(`Redirecting user to payment page: ${session.url}`);
        redirect(session.url);
      }
    }

    const success = searchParams.success;

    return (
      <>
        {success ? <PaymentSuccessModal /> : null}

        <DashboardPage
          cta={
            <CreateEventCategoryModal>
              <Button className="w-full sm:w-fit">
                <PlusIcon className="size-4 mr-2" />
                Add Category
              </Button>
            </CreateEventCategoryModal>
          }
          title="Dashboard"
        >
          <DashboardPageContent />
        </DashboardPage>
      </>
    );
  } catch (error) {
    console.error("Error fetching user from Prisma:", error);
    redirect("/sign-in");
    return null;
  }
};

export default Page;
