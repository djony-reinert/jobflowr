import React from 'react';
import SvgColor from '../../../../components/svg-color';
import { ROUTE_JOBS, ROUTE_CANDIDATES } from "../../../../Router/routes";

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
  }
];

export default navbarConfig;
