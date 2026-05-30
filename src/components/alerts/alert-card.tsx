"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, ChevronDown } from "lucide-react";

import type { AlertItem } from "@/types";
import { SeverityBadge } from "@/components/alerts/severity-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AlertCard({ alert, index = 0 }: { alert: AlertItem; index?: number }) {
  const content = (
    <Card className="group p-5 transition-shadow hover:shadow-md border-gray-100 cursor-pointer">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-xs font-bold text-gray-900">
            {alert.companyMark}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">{alert.company}</span>
              <span className="text-[10px] text-gray-400">•</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">{alert.timestamp}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-gray-800 leading-snug">{alert.title}</p>
            <p className="mt-2 text-xs text-gray-500 line-clamp-2 leading-relaxed">{alert.summary}</p>
          </div>
        </div>
        <SeverityBadge severity={alert.severity} />
      </div>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      {alert.source && alert.source !== "AI Intelligence" ? (
        <a href={alert.source} target="_blank" rel="noreferrer" className="block decoration-transparent">
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
}

export function IntelligencePanel({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="relative overflow-hidden bg-teal-50/30 border-teal-100/50 p-8">
      <div className="relative">
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-1 items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700/70">Executive Summary</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
              
              <div className="mt-6 space-y-4">
                <p className="text-gray-700 leading-relaxed max-w-2xl">
                  {paragraphs[0]}
                </p>
                {expanded && paragraphs.slice(1).map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600 leading-relaxed max-w-2xl">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setExpanded(!expanded)}
                  className="p-0 h-auto font-semibold text-teal-700 hover:bg-transparent hover:text-teal-800"
                >
                  {expanded ? "Read less" : "Read full analysis"} 
                  <ChevronDown className={cn("ml-1.5 h-4 w-4 transition-transform", expanded && "rotate-180")} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
