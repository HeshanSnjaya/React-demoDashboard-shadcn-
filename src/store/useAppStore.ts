import { create } from 'zustand'
import { Borrower, BorrowerPipeline, BrokerInfo, OnboardingWorkflow, TabType } from '../types'

interface AppState {
  // Theme
  theme: 'light' | 'dark'
  toggleTheme: () => void
  
  // Borrower data
  borrowerPipeline: BorrowerPipeline
  selectedBorrower: Borrower | null
  activeTab: TabType
  
  // Broker data
  brokerInfo: BrokerInfo | null
  onboardingWorkflow: OnboardingWorkflow | null
  
  // Actions
  setActiveTab: (tab: TabType) => void
  setSelectedBorrower: (borrower: Borrower | null) => void
  setBorrowerPipeline: (pipeline: BorrowerPipeline) => void
  setBrokerInfo: (info: BrokerInfo) => void
  setOnboardingWorkflow: (workflow: OnboardingWorkflow) => void
  
  // API Actions
  requestDocuments: (borrowerId: string) => Promise<void>
  sendToValuer: (borrowerId: string) => Promise<void>
  approveLoan: (borrowerId: string) => Promise<void>
  escalateToCommittee: (borrowerId: string) => Promise<void>
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  theme: 'light',
  borrowerPipeline: { new: [], in_review: [], approved: [] },
  selectedBorrower: null,
  activeTab: 'new',
  brokerInfo: null,
  onboardingWorkflow: null,
  
  // Theme actions
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light'
    set({ theme: newTheme })
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  },
  
  // State setters
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedBorrower: (borrower) => set({ selectedBorrower: borrower }),
  setBorrowerPipeline: (pipeline) => set({ borrowerPipeline: pipeline }),
  setBrokerInfo: (info) => set({ brokerInfo: info }),
  setOnboardingWorkflow: (workflow) => set({ onboardingWorkflow: workflow }),
  
  // Mock API actions
  requestDocuments: async (borrowerId) => {
    console.log(`Requesting documents for borrower ${borrowerId}`)
    await new Promise(resolve => setTimeout(resolve, 1000))
  },
  
  sendToValuer: async (borrowerId) => {
    console.log(`Sending to valuer for borrower ${borrowerId}`)
    await new Promise(resolve => setTimeout(resolve, 1000))
  },
  
  approveLoan: async (borrowerId) => {
    console.log(`Approving loan for borrower ${borrowerId}`)
    await new Promise(resolve => setTimeout(resolve, 1000))
  },
  
  escalateToCommittee: async (borrowerId) => {
    console.log(`Escalating to credit committee for borrower ${borrowerId}`)
    await new Promise(resolve => setTimeout(resolve, 1000))
  },
}))
