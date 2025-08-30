import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { useAppStore } from "../../store/useAppStore"
import { mockApi } from "../../services/mockApi"
import { formatCurrency } from "../../lib/utils"
import { Borrower, TabType } from "../../types"

export function BorrowerPipeline() {
  const {
    borrowerPipeline,
    activeTab,
    selectedBorrower,
    setActiveTab,
    setSelectedBorrower,
    setBorrowerPipeline
  } = useAppStore()

  useEffect(() => {
    const fetchPipeline = async () => {
      const pipeline = await mockApi.getBorrowerPipeline()
      setBorrowerPipeline(pipeline)
      
      // Auto-select first borrower if none selected
      if (!selectedBorrower && pipeline.new.length > 0) {
        const firstBorrower = await mockApi.getBorrowerDetail(pipeline.new[0].id)
        if (firstBorrower) {
          setSelectedBorrower(firstBorrower)
        }
      }
    }
    
    fetchPipeline()
  }, [])

  const handleBorrowerClick = async (borrower: Borrower) => {
    const fullBorrower = await mockApi.getBorrowerDetail(borrower.id)
    if (fullBorrower) {
      setSelectedBorrower(fullBorrower)
    }
  }

  const getBorrowersByTab = (tab: TabType) => {
    switch (tab) {
      case 'new':
        return borrowerPipeline.new
      case 'in_review':
        return borrowerPipeline.in_review
      case 'approved':
        return borrowerPipeline.approved
      default:
        return []
    }
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
        <CardTitle>Borrower Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="in_review">In Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="space-y-2">
            {getBorrowersByTab('new').map((borrower) => (
              <BorrowerCard
                key={borrower.id}
                borrower={borrower}
                isSelected={selectedBorrower?.id === borrower.id}
                onClick={() => handleBorrowerClick(borrower)}
                getStatusColor={getStatusColor}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="in_review" className="space-y-2">
            {getBorrowersByTab('in_review').map((borrower) => (
              <BorrowerCard
                key={borrower.id}
                borrower={borrower}
                isSelected={selectedBorrower?.id === borrower.id}
                onClick={() => handleBorrowerClick(borrower)}
                getStatusColor={getStatusColor}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="approved" className="space-y-2">
            {getBorrowersByTab('approved').length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No approved borrowers</p>
            ) : (
              getBorrowersByTab('approved').map((borrower) => (
                <BorrowerCard
                  key={borrower.id}
                  borrower={borrower}
                  isSelected={selectedBorrower?.id === borrower.id}
                  onClick={() => handleBorrowerClick(borrower)}
                  getStatusColor={getStatusColor}
                />
              ))
            )}
          </TabsContent>
        </Tabs>

        <div className="space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            F-SANITISED ACTIVE
          </h3>
          <RadioGroup defaultValue="active" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="active" />
              <Label htmlFor="active">Active Pipeline</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="archived" id="archived" />
              <Label htmlFor="archived">Archived</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}

interface BorrowerCardProps {
  borrower: Borrower
  isSelected: boolean
  onClick: () => void
  getStatusColor: (status: string) => string
}

function BorrowerCard({ borrower, isSelected, onClick, getStatusColor }: BorrowerCardProps) {
  return (
    <div
      className={`cursor-pointer rounded-lg border p-3 transition-colors hover:bg-accent ${
        isSelected ? 'border-primary bg-accent' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-medium">{borrower.name}</p>
          <p className="text-sm text-muted-foreground">{borrower.loan_type}</p>
        </div>
        <div className="text-right space-y-1">
          <p className="font-medium">{formatCurrency(borrower.amount)}</p>
          <Badge className={getStatusColor(borrower.status)} variant="secondary">
            {borrower.status}
          </Badge>
        </div>
      </div>
    </div>
  )
}
