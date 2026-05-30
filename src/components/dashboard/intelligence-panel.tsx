"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, ChevronDown } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function IntelligencePanel({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="relative overflow-hidden bg-teal-50/20 border-teal-100/40 p-8 shadow-sm">
      <div className="relative">
        <div className="flex items-start gap-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-teal-700/80">Executive Insight</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
            
            <div className="mt-6 space-y-4">
              <p className="text-gray-700 leading-relaxed max-w-3xl">
                {paragraphs[0]}
              </p>
              <motion.div
                initial={false}
                animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
                className="overflow-hidden space-y-4"
              >
                {paragraphs.slice(1).map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600 leading-relaxed max-w-3xl">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpanded(!expanded)}
                className="p-0 h-auto font-semibold text-teal-700 hover:bg-transparent hover:text-teal-800"
              >
                {expanded ? "Collapse analysis" : "View full analysis"} 
                <ChevronDown className={cn("ml-1.5 h-4 w-4 transition-transform", expanded && "rotate-180")} />
              </Button>
              <span className="text-[10px] font-medium text-gray-400">Generated 2h ago</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

