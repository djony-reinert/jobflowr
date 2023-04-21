const BASE_JOBS_URL = "/jobs";
const BASE_CANDIDATES_URL = "/candidates";

// Jobs
export const API_JOBS = () => BASE_JOBS_URL;
export const API_JOBS_CREATE = () => BASE_JOBS_URL;
export const API_JOBS_EDIT = ({ id }) => `${BASE_JOBS_URL}/${id}`;
export const API_JOBS_UPDATE = ({ id }) => `${BASE_JOBS_URL}/${id}`;
export const API_JOBS_DELETE = ({ id }) => `${BASE_JOBS_URL}/${id}`;

// Candidates
export const API_CANDIDATES = () => BASE_CANDIDATES_URL;
export const API_CANDIDATES_EDIT = ({ id }) => `${BASE_CANDIDATES_URL}/${id}`;

// Departments
export const API_DEPARTMENTS = () => "/departments";
