const BASE_JOBS_URL = "/jobs";
const BASE_CANDIDATES_URL = "/candidates";
const BASE_USERS_URL = "/users";

// Jobs
export const API_JOBS = () => BASE_JOBS_URL;
export const API_JOBS_CREATE = () => BASE_JOBS_URL;
export const API_JOBS_EDIT = ({ id }) => `${BASE_JOBS_URL}/${id}`;
export const API_JOBS_UPDATE = ({ id }) => `${BASE_JOBS_URL}/${id}`;
export const API_JOBS_DELETE = ({ id }) => `${BASE_JOBS_URL}/${id}`;

// Candidates
export const API_CANDIDATES = () => BASE_CANDIDATES_URL;
export const API_CANDIDATES_CREATE = () => BASE_CANDIDATES_URL;
export const API_CANDIDATES_EDIT = ({ id }) => `${BASE_CANDIDATES_URL}/${id}`;
export const API_CANDIDATES_UPDATE = ({ id }) => `${BASE_CANDIDATES_URL}/${id}`;
export const API_CANDIDATES_DELETE = ({ id }) => `${BASE_CANDIDATES_URL}/${id}`;

// Users
export const API_USERS = () => BASE_USERS_URL;
export const API_USERS_CREATE = () => BASE_USERS_URL;
export const API_USERS_EDIT = ({ id }) => `${BASE_USERS_URL}/${id}`;
export const API_USERS_UPDATE = ({ id }) => `${BASE_USERS_URL}/${id}`;
export const API_USERS_DELETE = ({ id }) => `${BASE_USERS_URL}/${id}`;

// Departments
export const API_DEPARTMENTS = () => "/departments";
