import LineChart from "@/components/ui/LineChart";
import CenterLayout from "../layout/center.layout";

function DashboardPage() {
  return (
    <CenterLayout className="min-h-[calc(100vh-105px)]">
      <div className="min-h-[calc(100vh-105px)] w-full">
        <div className="w-full flex sm:flex-row flex-col mt-5 gap-2">
          <div className="w-full sm:w-2/5 p-2 border border-input rounded-md">
            asd
          </div>
          <div className="w-full sm:w-3/5 p-2 border border-input rounded-md">
            <LineChart />
          </div>

        </div>
      </div>
    </CenterLayout>
  );
}

export default DashboardPage;
