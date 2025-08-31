import { useAuthStore } from "@/store/useAuthStore"
import { useAppStore } from "@/store/useAppStore"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Phone, Mail, User } from "lucide-react"

export function BorrowerDetail() {
  const selectedBorrower = useAppStore(s => s.selectedBorrower)
  const hasRole = useAuthStore(s => s.hasRole)

  const handleAction = (action: string) => {
    console.log(`${action}: ${selectedBorrower?.id}`)
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase() || ""
    if (s === "approved") return "bg-green-100 text-green-800"
    if (s === "in review") return "bg-blue-100 text-blue-800" 
    if (s === "renew") return "bg-orange-100 text-orange-800"
    return "bg-gray-100 text-gray-800"
  }

  if (!selectedBorrower) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select a borrower to view details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const aiFlags = [
    "Income Inconsistent with Bank statements",
    "High Debt-to-Income Ratio detected"
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle data-testid="borrower-name" className="text-xl font-bold">
              {selectedBorrower.name}
            </CardTitle>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="flex items-center gap-2" data-testid="borrower-email">
                <Mail className="h-4 w-4" />
                {selectedBorrower.email || "sarah.dunn@example.com"}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {selectedBorrower.phone || "(355)123-4557"}
              </p>
            </div>
            <p className="text-base sm:text-lg font-semibold" data-testid="loan-amount">
              Loan Amount: {formatCurrency(selectedBorrower.amount)}
            </p>
          </div>
          <Badge 
            className={`${getStatusColor(selectedBorrower.status || "In Review")} border-0`}
            data-testid="status-badge"
          >
            {selectedBorrower.status || "In Review"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="ai-explainability">
            <AccordionTrigger 
              data-testid="ai-explainability-trigger"
              className="text-left"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                AI Explainability
              </div>
            </AccordionTrigger>
            <AccordionContent data-testid="ai-explainability-content">
              <div className="space-y-4">
                <div className="space-y-2" data-testid="ai-flags">
                  {aiFlags.map((flag, index) => (
                    <div key={index} className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">{flag}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    data-testid="btn-request-docs"
                    onClick={() => handleAction('Request Documents')}
                  >
                    Request Documents
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    data-testid="btn-send-valuer"
                    onClick={() => handleAction('Send to Valuer')}
                  >
                    Send to Valuer
                  </Button>
                  {hasRole('ADMIN', 'ANALYST') && (
                    <Button 
                      size="sm" 
                      data-testid="btn-approve"
                      onClick={() => handleAction('Approve')}
                    >
                      Approve
                    </Button>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Loan Summary</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Employment:</span>
                <span className="font-medium">{selectedBorrower.employment || "At Tech Company"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Existing Loan:</span>
                <span className="font-medium">
                  {selectedBorrower.existing_loan ? formatCurrency(selectedBorrower.existing_loan) : formatCurrency(240000)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Credit Score:</span>
                <span className="font-medium">{selectedBorrower.credit_score || 720}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source of Funds:</span>
                <span className="font-medium">{selectedBorrower.source_of_funds || "Declared"}</span>
              </div>
            </div>
          </div>

          <Alert data-testid="risk-signal">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Risk Signal:</strong> Missing Source of Funds declaration
            </AlertDescription>
          </Alert>

          <div className="pt-4">
            <Button
              className="w-full sm:w-auto"
              data-testid="btn-escalate"
              onClick={() => handleAction('Escalate to Credit Committee')}
            >
              Escalate to Credit Committee
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
