"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs"; // ✅ Bruker client-side autentisering
import { DashboardPage } from "../components/dashboard-page";
import { DashboardPageContent } from "./dasboard-page-content";
import { CreateEventCategoryModal } from "../components/create-event-category-modal";
import { Button } from "../components/ui/button";
import { PlusIcon, RefreshCw } from "lucide-react";
import { Input } from "../components/ui/input"; // Input for søkefelt

const Page = () => {
  const { user } = useUser(); // ✅ Henter innlogget bruker fra Clerk
  const [isCrawling, setIsCrawling] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Brukerens søketekst

  // 🌟 Funksjon for å starte crawlen
  const startCrawl = async () => {
    console.log("Sending request with userId:", user?.id);

    if (!user) {
      alert("You must be logged in to start a search.");
      return;
    }

    try {
      setIsCrawling(true);

      const res = await fetch("/api/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id, // ✅ Bruker riktig ID fra Clerk!
          query: searchQuery || "Jon Almaas", // ✅ Bruk inputfelt eller fallback
        }),
      });

      const data = await res.json();
      setIsCrawling(false);

      if (!res.ok) {
        alert(`Error: ${data.error}`);
        return;
      }

      alert("Crawling started successfully!");
    } catch (error) {
      console.error("Error starting crawl:", error);
      alert("Something went wrong!");
      setIsCrawling(false);
    }
  };

  return (
    <>
      <DashboardPage
        cta={
          <div className="flex flex-col gap-4">
            <CreateEventCategoryModal>
              <Button className="w-full sm:w-fit">
                <PlusIcon className="size-4 mr-2" />
                Add Category
              </Button>
            </CreateEventCategoryModal>

            {/* 🌟 Inputfelt for søk */}
            <Input
              placeholder="Hva vil du overvåke?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-96 px-4 py-2 border rounded-md"
            />

            {/* 🌟 Knapp for å starte crawlen */}
            <Button
              onClick={startCrawl}
              className="w-full sm:w-fit bg-brand-600 text-white"
              disabled={isCrawling}
            >
              <RefreshCw className={`size-4 mr-2 ${isCrawling ? "animate-spin" : ""}`} />
              {isCrawling ? "Running..." : "Run Web Crawler"}
            </Button>
          </div>
        }
        title="Dashboard"
      >
        <DashboardPageContent />
      </DashboardPage>
    </>
  );
};

export default Page;
