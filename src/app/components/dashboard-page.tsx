import { ReactNode } from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { Heading } from "./Heading";

interface DashboardPageProps {
   title: string;
   children?: ReactNode;
   hideBackBtton?: boolean;
   cta?: ReactNode;
}




export const DashboardPage = ({title, children, hideBackBtton, cta}: DashboardPageProps) => {
 return (
   <section className="flex-1 h-full flex flex-col">
      <div className="p-6 sm:p-8 flex justify-between border-b border-gray-200">
         <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-8">
            {hideBackBtton ? null : ( <Button className="w-fit bg-white" variant="outline">
               <ArrowLeft className="size-4"/>
               </Button>)}

               <Heading>{title}</Heading>
         </div>
      </div>
   </section>
 )
}