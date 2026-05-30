"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;


export function DialogContent({
  className,
  children,
  ...props
}: DialogPrimitive.DialogContentProps) {
  return (
    <DialogPortal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-line bg-card p-7 shadow-2xl outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-6 top-6 rounded-lg p-1.5 text-muted/60 transition-colors hover:bg-panel hover:text-foreground">
          <X className="h-5 w-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>

  );
}
