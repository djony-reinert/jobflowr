import React from 'react';
import SvgColor from '../../../../components/svg-color';
import { ROUTE_JOBS, ROUTE_CANDIDATES, ROUTE_USERS, ROUTE_REPORTS } from "../../../../Router/routes";
import TableChartIcon from '@mui/icons-material/TableChart';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navbarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'jobs',
    path: ROUTE_JOBS(),
    icon: icon('ic_job'),
  },
  {
    title: 'Candidates',
    path: ROUTE_CANDIDATES(),
    icon: icon('ic_candidate'),
  },
  {
    title: 'Users',
    path: ROUTE_USERS(),
    icon: icon('ic_user'),
  },
  {
    title: 'Reports',
    path: ROUTE_REPORTS(),
    icon: <TableChartIcon />
  }
];

export default navbarConfig;
