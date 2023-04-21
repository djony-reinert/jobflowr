import React from 'react';
import PropTypes from 'prop-types';
import CustomTable from "../../../../../components/Display/Table/CustomTable";
import ActionMenu from "../../../../../components/Display/Table/components/ActionMenu";

const ListJobsTable = ({ data }) => {
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
      Cell: () => {
        return <ActionMenu />;
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