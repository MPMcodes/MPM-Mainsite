import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { TopContactBar } from "./TopContactBar";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { BackgroundWash } from "./BackgroundWash";
import { PageTransition } from "@/components/motion/PageTransition";

export function AppLayout() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <BackgroundWash />
      <TopContactBar />
      <SiteHeader />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}
