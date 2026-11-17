"use client";

import React, { useState } from "react";
import { CheckIcon, CopyIcon } from "./Icons";

interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: open mail client if clipboard permission is unavailable
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 border border-earth px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-amber transition-colors duration-300 hover:border-amber hover:bg-earth/20 cursor-pointer"
      aria-label={copied ? "Email copied to clipboard" : `Copy ${email}`}
    >
      {copied ? (
        <>
          <CheckIcon className="h-3.5 w-3.5" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <CopyIcon className="h-3.5 w-3.5" />
          <span>Copy Address</span>
        </>
      )}
    </button>
  );
}
