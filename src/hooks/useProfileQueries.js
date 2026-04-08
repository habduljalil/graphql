import { useProfileData } from "./useProfileData";

// Custom hook to aggregate profile-related query data and states
export const useProfileQueries = () => {
  const {
    userQuery,
    transactionsQuery,
    auditsQuery,
    statsQuery,
    skillsQuery,
    levelQuery,
    projectsQuery,
  } = useProfileData();

  // Combine loading states of all queries into a single array
  const loadingStates = [
    userQuery.loading,
    transactionsQuery.loading,
    auditsQuery.loading,
    statsQuery.loading,
    skillsQuery.loading,
    levelQuery.loading,
    projectsQuery.loading,
  ];

  // Combine error states of all queries into a single array
  const errorStates = [
    userQuery.error,
    transactionsQuery.error,
    auditsQuery.error,
    statsQuery.error,
    skillsQuery.error,
    levelQuery.error,
    projectsQuery.error,
  ];

  // Return all queries along with their aggregated states
  return {
    userQuery,
    transactionsQuery,
    auditsQuery,
    statsQuery,
    skillsQuery,
    levelQuery,
    projectsQuery,
    loadingStates,
    errorStates,
  };
};
