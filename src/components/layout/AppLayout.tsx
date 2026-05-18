import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { BackgroundWash } from "./BackgroundWash";
import { Sidebar } from "./Sidebar";
import { MobileTopBar } from "./MobileTopBar";
import { BottomNav } from "./BottomNav";
import { PageTransition } from "@/components/motion/PageTransition";

export function AppLayout() {
  const location = useLocation();
  return (
    <div className="relative min-h-screen text-foreground">
      <BackgroundWash />
      <Sidebar />
      <MobileTopBar />
      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-8 sm:px-6 lg:px-10 lg:pb-16 lg:pt-12">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </div>
      </main>
      <BottomNav />
      <Toaster />
    </div>
  );
}
