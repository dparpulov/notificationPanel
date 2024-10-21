"use client";

import { ToastType } from "../types";
import { ToastTypes } from "../constants";
import React, { createContext, useState, useContext, useCallback, ReactNode, FC } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { Cross1Icon } from '@radix-ui/react-icons';

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return {
    success: (message: string, duration: number = 1500) => context.showToast(message, ToastTypes.SUCCESS, duration),
    error: (message: string, duration: number = 1500) => context.showToast(message, ToastTypes.ERROR, duration),
    info: (message: string, duration: number = 1500) => context.showToast(message, ToastTypes.INFO, duration),
  };
};

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>(ToastTypes.INFO);
  const [duration, setDuration] = useState(1500);

  const showToast = useCallback((message: string, type: ToastType, duration?: number) => {
    setMessage(message);
    setType(type);
    setOpen(true);
    setDuration(duration || 1500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastPrimitive.Provider>
        {children}
        <ToastPrimitive.Root
          className={`bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut ${type === ToastTypes.SUCCESS
            ? 'border-l-4 border-green-500'
            : type === ToastTypes.ERROR
              ? 'border-l-4 border-red-500'
              : 'border-l-4 border-blue-500'
            }`}
          open={open}
          onOpenChange={setOpen}
          duration={duration}
        >
          <ToastPrimitive.Title className="[grid-area:_title] mb-[5px] font-medium text-slate-800 text-[15px]">
            {message}
          </ToastPrimitive.Title>
          <ToastPrimitive.Close aria-label="Close">
            <Cross1Icon />
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
        <ToastPrimitive.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};
