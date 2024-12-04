'use client'
import { create } from 'zustand'

export const useAppInfoState = create((set) => ({
  companyName: 'Eamazon',
  appVersion: '1.0.0',
  setCompanyName: (name) => set({ companyName: name }),
  setAppVersion: (version) => set({ appVersion: version })
}))
