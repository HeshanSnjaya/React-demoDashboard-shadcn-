import { BorrowerPipeline } from "../components/borrower/BorrowerPipeline"
import { BorrowerDetail } from "../components/borrower/BorrowerDetail"
import { BrokerOverview } from "../components/broker/BrokerOverview"


export function Dashboard() {
  return (
    <div
      className="
        w-full overflow-x-hidden box-border
        flex flex-col gap-6
        lg:grid
        lg:[grid-template-columns:minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)]
        xl:[grid-template-columns:minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]
        lg:gap-4 xl:gap-6
        min-h-[calc(100vh-7rem)]
      "
    >
      <section
        className="
          min-w-0 break-words
          lg:max-h-[calc(100vh-10rem)] lg:overflow-hidden
        "
      >
        <div className="h-full overflow-auto pr-1">
          <BorrowerPipeline />
        </div>
      </section>

      <section
        className="
          min-w-0 break-words
          lg:max-h-[calc(100vh-10rem)] lg:overflow-hidden
        "
      >
        <div className="h-full overflow-auto pr-1">
          <BorrowerDetail />
        </div>
      </section>

      <section
        className="
          min-w-0 break-words
          lg:max-h-[calc(100vh-10rem)] lg:overflow-hidden
        "
      >
        <div className="h-full overflow-auto pr-1">
          <BrokerOverview />
        </div>
      </section>
    </div>
  )
}
