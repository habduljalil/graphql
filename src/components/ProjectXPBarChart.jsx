import PropTypes from "prop-types";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/ProjectXPBarChart.css";

// Component to display XP per project as a Bar Chart
const ProjectXPBarChart = ({ transactions }) => {
  // Aggregate XP by project name
  const chartData = useMemo(() => {
    const grouped = {};

    transactions.forEach((tx) => {
      const projectName = tx.object?.name || "Unknown";

      if (!grouped[projectName]) {
        grouped[projectName] = 0;
      }

      grouped[projectName] += tx.amount;
    });

    return Object.keys(grouped).map((project) => ({
      project,
      xp: grouped[project],
    }));
  }, [transactions]);

  return (
    <div className="radar-chart-container">
      <h2 className="radar-chart-title">XP by Project</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="project"
            stroke="#c7c7c7"
            tick={{ fontSize: 12 }}
            angle={-50}
            textAnchor="end"
			height={140}
          />
          <YAxis stroke="#c7c7c7" />
          <Tooltip />
          <Bar
            dataKey="xp"
            fill="#ff6347"
            radius={[0, 0, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
C:\Users\Custom_PC\Desktop\01-Dashboard-main\src
// Prop  
ProjectXPBarChart.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      object: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default ProjectXPBarChart;