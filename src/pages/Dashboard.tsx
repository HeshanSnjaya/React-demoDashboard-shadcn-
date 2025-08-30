import { BorrowerPipeline } from "../components/borrower/BorrowerPipeline"
import { BorrowerDetail } from "../components/borrower/BorrowerDetail"
import { BrokerOverview } from "../components/broker/BrokerOverview"

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      <div className="lg:col-span-1">
        <BorrowerPipeline />
      </div>
      
      <div className="lg:col-span-1">
        <BorrowerDetail />
      </div>
      
      <div className="lg:col-span-1">
        <BrokerOverview />
      </div>
    </div>
  )
}
