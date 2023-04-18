import React from 'react';
import SvgColor from '../../../components/svg-color';
import {ROUTE_JOBS} from "../../../Router/routes";

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'jobs',
    path: ROUTE_JOBS(),
    icon: icon('ic_job'),
  }
];

export default navConfig;
