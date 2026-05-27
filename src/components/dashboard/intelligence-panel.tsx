"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, ChevronDown } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function IntelligencePanel({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="relative overflow-hidden p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(65,209,255,0.14),transparent_28%)]" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-3">
              <BrainCircuit className="h-5 w-5 text-cyan-200" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">AI summary</p>
              <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
            </div>
          </div>
          <Button variant="ghost" onClick={() => setExpanded((value) => !value)}>
            Expand <ChevronDown className={`ml-2 h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} />
          </Button>
        </div>
        <motion.div
          animate={{ height: expanded ? "auto" : 110 }}
          className="overflow-hidden"
        >
          <div className="mt-5 space-y-4 text-[15px] leading-7 text-slate-200">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </Card>
  );
}
