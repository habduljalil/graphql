import PropTypes from "prop-types";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "../styles/AuditOverview.css";

// Component for displaying audit performance data as a Pie Chart
const AuditOverview = ({
  auditData,
  auditRatioValue,
  auditRatioColor,
  auditRatioMessage,
}) => {
  // Define color schemes for the Pie chart
  const COLORS = ['#ff6347', 'rgba(111, 0, 255, 0.6)']; // Green for good, Purple for bad

  return (
    <div className="audit-overview-container">
      <h2 className="audit-overview-title">Audit Overview</h2>

   
      {/* Audit Ratio Section */}
      <div className="audit-ratio-container">
        <div className="audit-ratio-header">
          Audit Ratio:
          <span className="audit-ratio-value" style={{ color: auditRatioColor }}>
            {auditRatioValue.toFixed(2)}
          </span>
        </div>
        <p className="audit-message">{auditRatioMessage}</p>
      </div>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={300} className="audit-pie-chart">
        <PieChart>
        <Pie
  data={auditData}
  dataKey="value"
  nameKey="name"
  outerRadius={100}
  label={({ name }) => `${name}`}
>
            
            {auditData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Prop Validation for the component props
AuditOverview.propTypes = {
  auditData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  auditRatioValue: PropTypes.number.isRequired,
  auditRatioColor: PropTypes.string.isRequired,
  auditRatioMessage: PropTypes.string.isRequired,
};

export default AuditOverview;