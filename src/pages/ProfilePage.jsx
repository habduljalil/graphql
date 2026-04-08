import "../styles/ProfilePage.css";
import { useProfileQueries } from "../hooks/useProfileQueries";
import{
RadarSkills,
getAuditRatioInfo
}from "../utils/functions";
import Header from "../components/Header";
import Information from "../components/Information";
import Audits from "../components/Audits";
import AuditOverview from "../components/AuditOverview";
import TechnicalSkills from "../components/TechnicalSkills";
import ProjectXPBarChart from "../components/ProjectXPBarChart";

// Main ProfilePage component
function ProfilePage() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const {
   userQuery,
    auditsQuery,
    statsQuery,
    skillsQuery,
    levelQuery,
    projectsQuery,
    loadingStates,
    errorStates,
  } = useProfileQueries();

  if (loadingStates.some(Boolean)) return <p className="loading">Loading...</p>;
  if (errorStates.some(Boolean)) {
    const errorMessage =
      errorStates.find((error) => error)?.message || "Unknown error";
    return <p className="error-message">Error: {errorMessage}</p>;
  }

  const user = userQuery.data?.user?.[0];
  const attrs = user?.attrs || {};
const level = levelQuery.data?.transaction?.[0]?.amount;
const projectTransactions = projectsQuery.data?.transaction || [];
  const validAudits = auditsQuery.data?.user?.[0]?.validAudits?.nodes || [];
  const failedAudits = auditsQuery.data?.user?.[0]?.failedAudits?.nodes || [];
  const auditRatio = statsQuery.data?.user?.[0]?.auditRatio || 0;
  const totalUp =  Math.round(statsQuery.data?.user?.[0]?.totalUp/1000 ) || 0;
  const totalDown = Math.round(statsQuery.data?.user?.[0]?.totalDown/1000) || 0;
  const auditData = [
    { name: "Done", value: totalUp},
    { name: "Received", value: totalDown },
  ];

  const radarData = skillsQuery.data?.transaction.map((s) => ({
    subject: s.type,
    value: s.amount,
    fullMark: 100,
  }));
  const radarDataToUse = radarData.length
    ? RadarSkills(radarData)
    : RadarSkills([
        { subject: "JavaScript", value: 80, fullMark: 100 },
        { subject: "React", value: 90, fullMark: 100 },
      ]);

  const { color: auditRatioColor, message: auditRatioMessage } =
    getAuditRatioInfo(auditRatio);

  return (
    <div className="profile-container">
      <Header
        firstName={attrs.firstName}
        lastName={attrs.lastName}
        onLogout={handleLogout}
      />

      {/* Move graphs to the top */}

    

      {/* Move details below graphs */}
      <Information user={user} attrs={attrs} levelQuery={level}/>
      <Audits validAudits={validAudits} failedAudits={failedAudits} />
                <TechnicalSkills radarDataToUse={radarDataToUse} />

     <AuditOverview
        auditData={auditData}
        auditRatioValue={auditRatio}
        auditRatioColor={auditRatioColor}
        auditRatioMessage={auditRatioMessage}
      />

        <ProjectXPBarChart transactions={projectTransactions} />

    </div>
  );
}


export default ProfilePage;
