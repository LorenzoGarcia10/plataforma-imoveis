"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { mockPropertyInterests, type PropertyInterest } from "@/lib/mock-data"

type InterestsContextType = {
  interests: PropertyInterest[]
  setInterests: (interests: PropertyInterest[] | ((prev: PropertyInterest[]) => PropertyInterest[])) => void
  getInterestById: (id: string) => PropertyInterest | undefined
  updateInterest: (id: string, data: Partial<PropertyInterest>) => void
}

const InterestsContext = createContext<InterestsContextType | null>(null)

export function InterestsProvider({ children }: { children: React.ReactNode }) {
  const [interests, setInterests] = useState<PropertyInterest[]>(mockPropertyInterests)

  const getInterestById = useCallback(
    (id: string) => interests.find((i) => i.id === id),
    [interests]
  )

  const updateInterest = useCallback((id: string, data: Partial<PropertyInterest>) => {
    setInterests((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...data } : i))
    )
  }, [])

  return (
    <InterestsContext.Provider
      value={{ interests, setInterests, getInterestById, updateInterest }}
    >
      {children}
    </InterestsContext.Provider>
  )
}

export function useInterests() {
  const ctx = useContext(InterestsContext)
  if (!ctx) throw new Error("useInterests must be used within InterestsProvider")
  return ctx
}
