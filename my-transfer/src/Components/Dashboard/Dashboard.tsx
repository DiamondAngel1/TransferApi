import StatsGrid from "./StatsGrid.tsx";
import ChartSection from "./ChartSection.tsx";

function Dashboard() {
    return (
        <div className="space-y-6">
            <StatsGrid/>
            <ChartSection/>
        </div>
    );
}

export default Dashboard;