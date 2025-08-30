import { BorrowerPipeline, Borrower, BrokerInfo, OnboardingWorkflow } from '../types'

// Mock data based on sample-response.json
const mockBorrowerPipeline: BorrowerPipeline = {
  new: [
    {
      id: "1",
      name: "Sarah Dunn",
      loan_type: "Home Loan",
      amount: 300000,
      status: "Renew"
    },
    {
      id: "3",
      name: "Lisa Carter",
      loan_type: "Home Loan",
      amount: 450000,
      status: "New"
    }
  ],
  in_review: [
    {
      id: "2",
      name: "Alan Matthews",
      loan_type: "Personal Loan",
      amount: 20000,
      status: "In Review"
    }
  ],
  approved: []
}

const mockBorrowerDetails: Record<string, Borrower> = {
  "1": {
    id: "1",
    name: "Sarah Dunn",
    email: "sarah.dunn@example.com",
    phone: "(355)123-4557",
    loan_type: "Home Loan",
    amount: 300000,
    status: "In Review",
    employment: "At Tech Company",
    income: 120000,
    existing_loan: 240000,
    credit_score: 720,
    source_of_funds: "Declared",
    risk_signal: "Missing Source of Funds declaration",
    ai_flags: [
      "Income Inconsistent with Bank statements",
      "High Debt-to-Income Ratio detected"
    ]
  },
  "2": {
    id: "2",
    name: "Alan Matthews",
    email: "alan.matthews@example.com",
    phone: "(555)987-6543",
    loan_type: "Personal Loan",
    amount: 20000,
    status: "In Review",
    employment: "Self Employed",
    income: 80000,
    existing_loan: 15000,
    credit_score: 680,
    source_of_funds: "Business Income",
    risk_signal: null,  // Now correctly typed as null
    ai_flags: [
      "Irregular income pattern"
    ]
  },
  "3": {
    id: "3",
    name: "Lisa Carter",
    email: "lisa.carter@example.com",
    phone: "(555)456-7890",
    loan_type: "Home Loan",
    amount: 450000,
    status: "New",
    employment: "Financial Services",
    income: 150000,
    existing_loan: 0,
    credit_score: 780,
    source_of_funds: "Salary",
    risk_signal: null,  // Now correctly typed as null
    ai_flags: []
  }
}

const mockBrokerInfo: BrokerInfo = {
  name: "Robert Turner",
  deals: 16,
  approval_rate: "75%",
  pending: 7660
}

const mockOnboardingWorkflow: OnboardingWorkflow = {
  steps: [
    "Deal Intake",
    "IDV & Credit Check",
    "Document Upload",
    "AI Validation",
    "Credit Committee",
    "Approval & Docs",
    "Funder Syndication"
  ]
}

// Mock API functions
export const mockApi = {
  getBorrowerPipeline: async (): Promise<BorrowerPipeline> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockBorrowerPipeline
  },
  
  getBorrowerDetail: async (id: string): Promise<Borrower | null> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockBorrowerDetails[id] || null
  },
  
  // Fixed: Prefix unused parameter with underscore to suppress warning
  getBrokerInfo: async (_id: string): Promise<BrokerInfo> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return mockBrokerInfo
  },
  
  getOnboardingWorkflow: async (): Promise<OnboardingWorkflow> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockOnboardingWorkflow
  }
}
