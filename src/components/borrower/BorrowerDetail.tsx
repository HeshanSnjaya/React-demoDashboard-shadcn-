import { AlertTriangle, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Alert, AlertDescription } from "../ui/alert"
import { Separator } from "../ui/separator"
import { useAppStore } from "../../store/useAppStore"
import { formatCurrency } from "../../lib/utils"

export function BorrowerDetail() {
  const { 
    selectedBorrower, 
    requestDocuments, 
    sendToValuer, 
    approveLoan, 
    escalateToCommittee 
  } = useAppStore()

  if (!selectedBorrower) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Select a borrower to view details</p>
        </CardContent>
      </Card>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'in review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'renew':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedBorrower.name}</h2>
              <Badge className={getStatusColor(selectedBorrower.status)} variant="secondary">
                {selectedBorrower.status}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>{selectedBorrower.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>{selectedBorrower.phone}</span>
              </div>
            </div>
            
            <p className="text-lg font-semibold">
              Loan Amount: {formatCurrency(selectedBorrower.amount)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {selectedBorrower.ai_flags && selectedBorrower.ai_flags.length > 0 && (
          <Accordion type="single" collapsible defaultValue="ai-flags">
            <AccordionItem value="ai-flags">
              <AccordionTrigger className="text-left">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span>AI Explainability ({selectedBorrower.ai_flags.length} issues)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {selectedBorrower.ai_flags.map((flag, index) => (
                    <Alert key={index} className="border-red-200 dark:border-red-800">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <AlertDescription>{flag}</AlertDescription>
                    </Alert>
                  ))}
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => requestDocuments(selectedBorrower.id)}
                    >
                      Request Documents
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => sendToValuer(selectedBorrower.id)}
                    >
                      Send to Valuer
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => approveLoan(selectedBorrower.id)}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Loan Summary</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Employment</p>
              <p className="font-medium">{selectedBorrower.employment}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Income</p>
              <p className="font-medium">
                {selectedBorrower.income ? formatCurrency(selectedBorrower.income) : 'N/A'}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Existing Loan</p>
              <p className="font-medium">
                {selectedBorrower.existing_loan ? formatCurrency(selectedBorrower.existing_loan) : 'None'}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Credit Score</p>
              <p className="font-medium">{selectedBorrower.credit_score}</p>
            </div>
            
            <div className="space-y-1 col-span-2">
              <p className="text-sm text-muted-foreground">Source of Funds</p>
              <p className="font-medium">{selectedBorrower.source_of_funds}</p>
            </div>
          </div>

          {selectedBorrower.risk_signal && (
            <Alert className="border-orange-200 dark:border-orange-800">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <AlertDescription>
                <strong>Risk Signal:</strong> {selectedBorrower.risk_signal}
              </AlertDescription>
            </Alert>
          )}

          <Button 
            className="w-full" 
            size="lg"
            onClick={() => escalateToCommittee(selectedBorrower.id)}
          >
            Escalate to Credit Committee
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
