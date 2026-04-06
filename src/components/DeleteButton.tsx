"use client";

import { useFormStatus } from "react-dom";

export default function DeleteButton({ message }: { message: string }) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit"
      disabled={pending}
      className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] px-5 py-2.5 rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0)] hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={(e) => {
        if(!confirm(message)) {
          e.preventDefault();
        }
      }}
    >
      {pending ? "Purging..." : "Purge Asset"}
    </button>
  );
}

export function DeleteLeadButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit"
      disabled={pending}
      className="text-[10px] text-red-500/50 hover:text-red-400 uppercase tracking-widest font-bold transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
      onClick={(e) => {
        if(!confirm("Purge this lead permanently?")) {
          e.preventDefault();
        }
      }}
    >
      {pending ? "..." : "Purge"}
    </button>
  );
}