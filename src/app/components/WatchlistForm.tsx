"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { useUser } from "@clerk/nextjs";

export const WatchlistForm = () => {
   const { user } = useUser();
   const [mainQuery, setMainQuery] = useState("");
   const [subQueries, setSubQueries] = useState<string[]>([]);
   const [notificationMethod, setNotificationMethod] = useState("dashboard");
   interface WatchlistItem {
      id: string;
      mainQuery: string;
      subQueries: string[];
      notificationMethod: string;
   }

   const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

   // Hent watchlist fra API ved oppstart
   useEffect(() => {
      if (user) {
         fetch(`/api/watchlist?userId=${user.id}`)
            .then((res) => res.json())
            .then((data) => setWatchlist(data.watchlist))
            .catch((err) => console.error("Error fetching watchlist:", err));
      }
   }, [user]);

   // Legg til ny underkategori
   const addSubQuery = () => {
      setSubQueries([...subQueries, ""]);
   };

   // Oppdater en underkategori
   const updateSubQuery = (index: number, value: string) => {
      const updated = [...subQueries];
      updated[index] = value;
      setSubQueries(updated);
   };

   // Lagre watchlist til backend
   const addToWatchlist = async () => {
      if (!mainQuery.trim()) return alert("Please enter a main search term!");

      const res = await fetch("/api/watchlist", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            userId: user?.id,
            mainQuery,
            subQueries,
            notificationMethod,
         }),
      });

      if (!res.ok) {
         alert("Error adding to watchlist!");
         return;
      }

      const newItem = await res.json();
      setWatchlist([...watchlist, newItem]);
      setMainQuery(""); // Nullstill input
      setSubQueries([]); // Nullstill underkategorier
   };

   return (
      <Card className="p-4 max-w-md mx-auto">
         <h2 className="text-lg font-semibold">Add to Watchlist</h2>
         <div className="mt-2">
            <Label>Search Term</Label>
            <Input
               type="text"
               placeholder="Enter a main keyword..."
               value={mainQuery}
               onChange={(e) => setMainQuery(e.target.value)}
            />
         </div>

         {/* Underkategorier */}
         <div className="mt-2">
            <Label>Subcategories</Label>
            {subQueries.map((subQuery, index) => (
               <Input
                  key={index}
                  type="text"
                  placeholder={`Subcategory ${index + 1}`}
                  value={subQuery}
                  onChange={(e) => updateSubQuery(index, e.target.value)}
                  className="mt-1"
               />
            ))}
            <Button onClick={addSubQuery} className="mt-2 w-full">
               + Add Subcategory
            </Button>
         </div>

         {/* Varslingsmetode */}
         <div className="mt-2">
            <Label>Notification Method</Label>
            <select
               value={notificationMethod}
               onChange={(e) => setNotificationMethod(e.target.value)}
               className="w-full border rounded-md p-2"
            >
               <option value="dashboard">Dashboard</option>
               <option value="discord">Discord</option>
            </select>
         </div>

         <Button onClick={addToWatchlist} className="mt-4 w-full">
            Add to Watchlist
         </Button>

         {/* Vis eksisterende watchlist */}
         <div className="mt-6">
            <h3 className="text-md font-semibold">Your Watchlist</h3>
            <ul className="mt-2">
               {watchlist.map((item) => (
                  <li key={item.id} className="border p-2 rounded-md mt-1">
                     <strong>{item.mainQuery}</strong> – {item.subQueries?.join(", ")} ({item.notificationMethod})
                  </li>
               ))}
            </ul>
         </div>
      </Card>
   );
};
