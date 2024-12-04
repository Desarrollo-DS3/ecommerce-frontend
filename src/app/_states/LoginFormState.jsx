'use client'
import { create } from 'zustand'

export const useLoginModalState = create((set) => ({
  isModalOpen: false,
  turnOn: () => set((state) => ({ isModalOpen: true })),
  turnOff: () => set((state) => ({ isModalOpen: false }))
}))
