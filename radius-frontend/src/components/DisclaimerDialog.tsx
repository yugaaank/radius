"use client";

import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, ExclamationTriangleIcon, RocketIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DisclaimerDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show if we are in a hosted environment or explicitly told to
    const isHosted = window.location.hostname !== 'localhost';
    const hasSeenDisclaimer = sessionStorage.getItem('has_seen_disclaimer');
    
    if (isHosted && !hasSeenDisclaimer) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('has_seen_disclaimer', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md z-[1000] animate-in fade-in duration-300" />
        <Dialog.Content 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[540px] bg-white rounded-[32px] shadow-2xl z-[1001] border border-neutral-200/50 overflow-hidden focus:outline-none animate-in zoom-in-95 fade-in duration-300"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Icon Header */}
              <div className="relative">
                <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-500 shadow-inner">
                  <ExclamationTriangleIcon width={36} height={36} />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-neutral-900 rounded-2xl flex items-center justify-center text-white shadow-lg border-4 border-white">
                  <RocketIcon width={18} height={18} />
                </div>
              </div>

              <div className="space-y-3">
                <Dialog.Title className="text-2xl font-black text-neutral-900 tracking-tight">
                  Welcome to the Radius Showcase
                </Dialog.Title>
                <Dialog.Description className="text-neutral-500 text-sm font-medium leading-relaxed max-w-[400px]">
                  Experience the future of engineering intelligence. Please note that the data you see here is <span className="text-neutral-900 font-bold underline decoration-amber-300 decoration-2">simulated mock data</span>.
                </Dialog.Description>
              </div>

              <div className="w-full bg-neutral-50 rounded-2xl p-6 border border-neutral-100 space-y-4 text-left">
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 shrink-0" />
                  <p className="text-xs text-neutral-600 leading-normal font-medium">
                    Deploying the <span className="font-bold text-neutral-800">Coral SQL Engine</span> online is restricted due to its local-first security model—Radius is designed to keep your tokens on <span className="italic">your</span> machine.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 shrink-0" />
                  <p className="text-xs text-neutral-600 leading-normal font-medium">
                    This hosted version is designed to showcase the <span className="font-bold text-neutral-800">intuitive UI and urgency mapping</span> without forcing you to set up a local server right now.
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-col gap-3 pt-2">
                <button 
                  onClick={handleClose}
                  className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl text-sm font-bold transition-all shadow-lg active:scale-[0.98]"
                >
                  Explore the Interface
                </button>
                <a 
                  href="https://github.com/yugaaank/radius" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-600 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  <GitHubLogoIcon width={18} height={18} />
                  View the Code
                </a>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
