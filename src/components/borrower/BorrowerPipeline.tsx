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
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl">Borrower Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="new" className="text-xs sm:text-sm px-2 py-2">
              New
            </TabsTrigger>
            <TabsTrigger value="in_review" className="text-xs sm:text-sm px-2 py-2">
              In Review
            </TabsTrigger>
            <TabsTrigger value="approved" className="text-xs sm:text-sm px-2 py-2">
              Approved
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="space-y-2 mt-4">
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
          
          <TabsContent value="in_review" className="space-y-2 mt-4">
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
          
          <TabsContent value="approved" className="space-y-2 mt-4">
            {getBorrowersByTab('approved').length === 0 ? (
              <p className="text-center text-muted-foreground py-8 text-sm">
                No approved borrowers
              </p>
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

        <div className="space-y-3 pt-4">
          <h3 className="text-xs sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
            F-SANITISED ACTIVE
          </h3>
          <RadioGroup defaultValue="active" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="active" />
              <Label htmlFor="active" className="text-sm">Active Pipeline</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="archived" id="archived" />
              <Label htmlFor="archived" className="text-sm">Archived</Label>
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="space-y-1 min-w-0 flex-1">
          <p className="font-medium text-sm sm:text-base truncate">{borrower.name}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">{borrower.loan_type}</p>
        </div>
        <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right sm:space-y-1">
          <p className="font-medium text-sm sm:text-base">{formatCurrency(borrower.amount)}</p>
          <Badge className={`${getStatusColor(borrower.status)} text-xs`} variant="secondary">
            {borrower.status}
          </Badge>
        </div>
      </div>
    </div>
  )
}
