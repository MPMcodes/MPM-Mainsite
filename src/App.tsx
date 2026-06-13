import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import ComingSoon from "@/pages/ComingSoon";
import NotFound from "@/pages/NotFound";

function AdminShell() {
  return (
    <div className="admin-theme">
      <ComingSoon title="Owner & Staff Dashboard" />
    </div>
  );
}

// Scroll to the top of the page on every route change — React Router preserves
// the previous scroll offset, so switching pages would otherwise land you mid-page.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Jump instantly — if the site sets `scroll-behavior: smooth`, this avoids
    // animating the new page up from the old scroll offset.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="journal" element={<ComingSoon title="The Journal" />} />
          <Route path="admin" element={<AdminShell />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
