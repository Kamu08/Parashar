"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, FinishOption, WarmthOption, InquiryItem } from "@/lib/types";

interface InquiryContextType {
  items: InquiryItem[];
  addItem: (product: Product, selectedFinish?: FinishOption, selectedWarmth?: WarmthOption, qty?: number) => void;
  removeItem: (productId: string, finish: FinishOption, warmth: WarmthOption) => void;
  updateQuantity: (productId: string, finish: FinishOption, warmth: WarmthOption, qty: number) => void;
  clearBoard: () => void;
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  totalCount: number;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "parashar_inquiry_board_v1";

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse inquiry board from localStorage", e);
    }
  }, []);

  // Save to LocalStorage whenever items change
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save inquiry board to localStorage", e);
    }
  }, [items, isMounted]);

  const addItem = (
    product: Product,
    selectedFinish?: FinishOption,
    selectedWarmth?: WarmthOption,
    qty: number = 1
  ) => {
    const finish = selectedFinish || product.finishes[0];
    const warmth = selectedWarmth || product.warmthOptions[0];

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.product.id === product.id &&
          i.selectedFinish === finish &&
          i.selectedWarmth === warmth
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prev, { product, selectedFinish: finish, selectedWarmth: warmth, quantity: qty }];
      }
    });

    setIsOpen(true); // Automatically slide open drawer upon adding
  };

  const removeItem = (productId: string, finish: FinishOption, warmth: WarmthOption) => {
    setItems((prev) =>
      prev.filter(
        (i) =>
          !(
            i.product.id === productId &&
            i.selectedFinish === finish &&
            i.selectedWarmth === warmth
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    finish: FinishOption,
    warmth: WarmthOption,
    qty: number
  ) => {
    if (qty <= 0) {
      removeItem(productId, finish, warmth);
      return;
    }

    setItems((prev) =>
      prev.map((i) => {
        if (
          i.product.id === productId &&
          i.selectedFinish === finish &&
          i.selectedWarmth === warmth
        ) {
          return { ...i, quantity: qty };
        }
        return i;
      })
    );
  };

  const clearBoard = () => setItems([]);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <InquiryContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBoard,
        isOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        totalCount,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}
