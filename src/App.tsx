import { Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Home from "@/pages/Home";
import ComingSoon from "@/pages/ComingSoon";
import NotFound from "@/pages/NotFound";

function AdminShell() {
  return (
    <div className="admin-theme">
      <ComingSoon title="Owner & Staff Dashboard" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="properties" element={<ComingSoon title="Portfolio" />} />
        <Route path="residents" element={<ComingSoon title="Resident Portal" />} />
        <Route path="maintenance" element={<ComingSoon title="Maintenance Requests" />} />
        <Route path="owners" element={<ComingSoon title="Owner Inquiry" />} />
        <Route path="journal" element={<ComingSoon title="The Journal" />} />
        <Route path="admin" element={<AdminShell />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
