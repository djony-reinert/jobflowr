import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import CustomTable from "../../../../../components/Display/Table/CustomTable";
import ActionMenu from "../../../../../components/Display/Table/components/ActionMenu";
import { useNavigate } from 'react-router-dom';
import { ROUTE_JOBS_EDIT } from "../../../../../Router/routes";

const ListJobsTable = ({ data }) => {
  const navigate = useNavigate();

  const handleDelete = useCallback((id) => {
    console.log('Delete', id);
  }, []);

  const redirectToEditJob = useCallback((id) => {
    navigate(ROUTE_JOBS_EDIT({ id }));
  }, []);

  const columns = [
    {
      Header: 'Id',
      accessor: 'id',
      hide: true
    },
    {
      Header: 'Title',
      accessor: 'title',
      minWidth: 200,
    },
    {
      Header: 'Location',
      accessor: 'location',
      width: '10%',
      minWidth: 150
    },
    {
      Header: 'Company',
      accessor: 'company',
      minWidth: 150,
    },
    {
      Header: 'Min. Salary',
      accessor: 'salary_minimum',
      width: '5%',
      numeric: true
    },
    {
      Header: 'Max. Salary',
      accessor: 'salary_maximum',
      width: '5%',
      numeric: true
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => {
        return <ActionMenu id={row.original?.id} handleDelete={handleDelete} handleEdit={redirectToEditJob} />;
      },
      disableSortBy: true,
      width: '1%',
      minWidth: 50
    }
  ];

  return <CustomTable columns={columns} data={data} />
};

ListJobsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

ListJobsTable.defaultProps = {
  data: []
};

export default ListJobsTable;