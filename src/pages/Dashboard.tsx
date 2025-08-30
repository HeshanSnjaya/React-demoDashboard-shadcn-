import { BorrowerPipeline } from "../components/borrower/BorrowerPipeline"
import { BorrowerDetail } from "../components/borrower/BorrowerDetail"
import { BrokerOverview } from "../components/broker/BrokerOverview"

export function Dashboard() {
  return (
    <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6 h-auto lg:h-[calc(100vh-8rem)]">
      <div className="lg:col-span-4 xl:col-span-3">
        <BorrowerPipeline />
      </div>
      
      <div className="lg:col-span-5 xl:col-span-6">
        <BorrowerDetail />
      </div>
      
      <div className="lg:col-span-3 xl:col-span-3">
        <BrokerOverview />
      </div>
    </div>
  )
}
