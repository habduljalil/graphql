import { useQuery } from "@apollo/client";
import {
  FETCH_USER_INFO,
  FETCH_TRANSACTIONS,
  FETCH_USER_AUDITS,
  FETCH_AUDIT_STATS,
  FETCH_TECHNICAL_SKILLS,
  FETCH_USER_LEVEL,
  GET_PROJECTS_WITH_XP
} from "../queries/queries";

// Custom hook to fetch profile-related data using GraphQL queries
export const useProfileData = () => {
  const userQuery = useQuery(FETCH_USER_INFO);
  const transactionsQuery = useQuery(FETCH_TRANSACTIONS);
  const auditsQuery = useQuery(FETCH_USER_AUDITS);
  const statsQuery = useQuery(FETCH_AUDIT_STATS);
  const skillsQuery = useQuery(FETCH_TECHNICAL_SKILLS);
  const levelQuery = useQuery(FETCH_USER_LEVEL);

    const userId = userQuery.data?.user?.[0]?.id;

const projectsQuery = useQuery(GET_PROJECTS_WITH_XP, {
  variables: { userId },
  skip: !userId, // important to avoid running before user loads
});
  // Return all queries so they can be accessed by the consuming component
  return {
    userQuery,
    transactionsQuery,
    auditsQuery,
    statsQuery,
    skillsQuery,
    levelQuery,
    projectsQuery
  };
};
