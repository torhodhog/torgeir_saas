import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardPage } from "../components/dashboard-page";
import { DashboardPageContent } from "./dasboard-page-content";
import { CreateEventCategoryModal } from "../components/create-event-category-modal";
import { Button } from "../components/ui/button";
import { PlusIcon } from "lucide-react";

const Page = async () => {
  console.log("Fetching authenticated user...");
  const auth = await currentUser();

  if (!auth) {
    console.error("No authenticated user found. Redirecting to sign-in.");
    redirect("/sign-in");
    return null; // Unødvendig, men for sikkerhet
  }

  console.log("Authenticated Clerk user:", auth);

  try {
    const user = await db.user.findUnique({
      where: { externalId: auth.id },
    });

    if (!user) {
      console.error(
        `No user found in Prisma for externalId: ${auth.id}. Redirecting to sign-in.`
      );
      redirect("/sign-in");
      return null;
    }

    console.log("User found in Prisma:", user);

    return (
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
    );
  } catch (error) {
    console.error("Error fetching user from Prisma:", error);
    redirect("/sign-in");
    return null;
  }
};

export default Page;
