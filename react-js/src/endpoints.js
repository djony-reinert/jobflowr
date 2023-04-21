export const API_JOBS = () => ({ endpoint: "/jobs", method: "GET" });
export const API_JOBS_EDIT = ({ id }) => ({
  endpoint: `/jobs/${id}`,
  method: "GET",
});
export const API_CANDIDATES = () => ({
  endpoint: "/candidates",
  method: "GET",
});
export const API_CANDIDATES_EDIT = ({ id }) => ({
  endpoint: `/candidates/${id}/edit`,
  method: "PUT",
});
export const API_DEPARTMENTS = () => ({
  endpoint: "/departments",
  method: "GET",
});
