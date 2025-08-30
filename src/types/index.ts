export interface Borrower {
  id: string
  name: string
  loan_type: string
  amount: number
  status: "New" | "In Review" | "Approved" | "Renew"
  email?: string
  phone?: string
  employment?: string
  income?: number
  existing_loan?: number
  credit_score?: number
  source_of_funds?: string
  risk_signal?: string | null  // Allow null values
  ai_flags?: string[]
}

export interface BorrowerPipeline {
  new: Borrower[]
  in_review: Borrower[]
  approved: Borrower[]
}

export interface BrokerInfo {
  name: string
  deals: number
  approval_rate: string
  pending: number
}

export interface OnboardingWorkflow {
  steps: string[]
}

export type TabType = "new" | "in_review" | "approved"
