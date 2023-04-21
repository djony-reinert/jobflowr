import React from 'react';
import PropTypes from 'prop-types';
import CustomTable from "../../../../../components/Display/Table/CustomTable";
import ActionMenu from "../../../../../components/Display/Table/components/ActionMenu";

const ListCandidatesTable = ({ data }) => {
  const columns = [
    {
      Header: 'Id',
      accessor: 'id',
      hide: true
    },
    {
      Header: 'Name',
      accessor: 'first_name',
      Cell: ({ row }) => {
        return <span>{row.original.first_name + " " + row.original.last_name}</span>;
      },
      minWidth: 200
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      width: '10%',
      minWidth: 150
    },
    {
      Header: 'E-mail',
      accessor: 'email',
      minWidth: 150
    },
    {
      Header: 'Gender',
      accessor: 'gender_id',
      width: '5%'
    },
    {
      Header: 'Country',
      accessor: 'country',
      width: '5%'
    },
    {
      Header: 'State',
      accessor: 'state',
      width: '5%'
    },
    {
      Header: 'City',
      accessor: 'city',
      width: '5%'
    },
    {
      Header: 'Street',
      accessor: 'street',
      width: '5%'
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

ListCandidatesTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

ListCandidatesTable.defaultProps = {
  data: []
};

export default ListCandidatesTable;