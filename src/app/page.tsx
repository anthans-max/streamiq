"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import ChatSection from "@/components/ChatSection";
import UseCasesSection from "@/components/UseCasesSection";
import ConsultSection from "@/components/ConsultSection";
import Footer from "@/components/Footer";

type Page = "home" | "analytics" | "chat" | "use-cases" | "consult";

const pageMap: Record<string, Page> = {
  home: "home",
  analytics: "analytics",
  chat: "chat",
  "use-cases": "use-cases",
  "use cases": "use-cases",
  consult: "consult",
};

export default function StreamIQ() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (key: string) => {
    const mapped = pageMap[key] ?? (key as Page);
    setPage(mapped);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  return (
    <div className="noise" style={{ minHeight: "100vh", background: "var(--bg)", overflowX: "hidden" }}>
      <Nav active={page} onNavigate={navigate} />
      {page === "home" && <HeroSection onNavigate={navigate} />}
      {page === "analytics" && <AnalyticsSection />}
      {page === "chat" && <ChatSection />}
      {page === "use-cases" && <UseCasesSection onNavigate={navigate} />}
      {page === "consult" && <ConsultSection />}
      <Footer onNavigate={navigate} />
    </div>
  );
}
