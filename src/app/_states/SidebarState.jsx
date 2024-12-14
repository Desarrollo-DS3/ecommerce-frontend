'use client'
import { create } from 'zustand'

export const useSidebarState = create((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen })
}))
