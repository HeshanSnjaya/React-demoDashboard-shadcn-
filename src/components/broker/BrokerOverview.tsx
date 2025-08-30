import { useEffect, useState } from "react"
import { Phone, Mail, MessageCircle, CheckCircle, Clock, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { useAppStore } from "../../store/useAppStore"
import { mockApi } from "../../services/mockApi"
import { formatCurrency } from "../../lib/utils"

export function BrokerOverview() {
  const { 
    brokerInfo, 
    onboardingWorkflow, 
    setBrokerInfo, 
    setOnboardingWorkflow 
  } = useAppStore()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const [broker, workflow] = await Promise.all([
        mockApi.getBrokerInfo("1"),
        mockApi.getOnboardingWorkflow()
      ])
      
      setBrokerInfo(broker)
      setOnboardingWorkflow(workflow)
    }
    
    fetchData()
  }, [setBrokerInfo, setOnboardingWorkflow])

  if (!brokerInfo || !onboardingWorkflow) {
    return (
      <Card className="h-full min-h-[400px]">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-muted-foreground text-center">Loading broker info...</p>
        </CardContent>
      </Card>
    )
  }

  if (isMobile) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg sm:text-xl">Broker Overview</CardTitle>
        </CardHeader>
        
        <CardContent>
          <Accordion type="multiple" className="w-full space-y-2">
            {/* Broker Info Accordion Item */}
            <AccordionItem value="broker-info" className="border rounded-lg px-3">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-medium">Broker Information</span>
              </AccordionTrigger>
              <AccordionContent>
                <BrokerInfoContent brokerInfo={brokerInfo} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="workflow" className="border rounded-lg px-3">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-medium">Onboarding Workflow</span>
              </AccordionTrigger>
              <AccordionContent>
                <WorkflowContent workflow={onboardingWorkflow} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ai-assistant" className="border rounded-lg px-3">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-medium">AI Assistant</span>
              </AccordionTrigger>
              <AccordionContent>
                <AIAssistantContent />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl">Broker Overview</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <BrokerInfoContent brokerInfo={brokerInfo} />
        <Separator />
        <WorkflowContent workflow={onboardingWorkflow} />
        <Separator />
        <AIAssistantContent />
      </CardContent>
    </Card>
  )
}

function BrokerInfoContent({ brokerInfo }: { brokerInfo: any }) {
  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-semibold">{brokerInfo.name}</h3>
      
      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div className="space-y-1">
          <p className="text-lg sm:text-2xl font-bold">{brokerInfo.deals}</p>
          <p className="text-xs text-muted-foreground">Deals</p>
        </div>
        <div className="space-y-1">
          <p className="text-lg sm:text-2xl font-bold">{brokerInfo.approval_rate}</p>
          <p className="text-xs text-muted-foreground">Approval Rate</p>
        </div>
        <div className="space-y-1">
          <p className="text-lg sm:text-2xl font-bold">{formatCurrency(brokerInfo.pending)}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Phone className="h-4 w-4 mr-1" />
          Call
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Mail className="h-4 w-4 mr-1" />
          Email
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <MessageCircle className="h-4 w-4 mr-1" />
          Chat
        </Button>
      </div>
    </div>
  )
}

function WorkflowContent({ workflow }: { workflow: any }) {
  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-semibold">Onboarding Workflow</h3>
      
      <div className="space-y-3">
        {workflow.steps.map((step: string, index: number) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
              {index + 1}
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span className="text-xs sm:text-sm">{step}</span>
              {index < 3 ? (
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              ) : index === 3 ? (
                <Clock className="h-4 w-4 text-yellow-500 flex-shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AIAssistantContent() {
  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-semibold">AI Assistant</h3>
      
      <div className="flex items-center space-x-2">
        <Switch id="ai-assistant" defaultChecked />
        <Label htmlFor="ai-assistant" className="text-sm">Enable AI Assistant</Label>
      </div>
      
      <p className="text-xs sm:text-sm text-muted-foreground">
        AI Assistant will help automate document review and risk assessment.
      </p>
    </div>
  )
}
