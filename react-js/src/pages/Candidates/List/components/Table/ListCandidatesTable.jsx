import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import CustomTable from "../../../../../components/Display/Table/CustomTable";
import ActionMenu from "../../../../../components/Display/Table/components/ActionMenu";
import GenderCell from "./components/GenderCell";
import { ROUTE_CANDIDATES_EDIT } from "../../../../../Router/routes";
import { useNavigate } from "react-router-dom";
import request from "@reactjs/utils/request";
import { API_CANDIDATES_DELETE } from "@reactjs/endpoints";
import CareerLevelCell from "@reactjs/pages/Candidates/List/components/Table/components/CareerLevelCell";

const ListCandidatesTable = ({ data, doRefresh }) => {
  const navigate = useNavigate();

  const redirectToEditCandidate = useCallback((id) => {
    navigate(ROUTE_CANDIDATES_EDIT({ id }));
  }, []);

  const doDelete = useCallback((id) => {
    request(
      API_CANDIDATES_DELETE({ id }),
      id,
      'DELETE',
      () => {
        doRefresh();
        alert('Deleted successfully!');
      }
    );
  }, []);

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
      minWidth: 150
    },
    {
      Header: 'Email',
      accessor: 'email',
      minWidth: 150
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      width: '10%',
      minWidth: 150
    },
    {
      Header: 'Gender',
      accessor: 'gender_id',
      Cell: ({ row }) => {
        const id = row.original?.gender_id
        return <GenderCell id={id} />
      },
      width: '5%'
    },
    {
      Header: 'Career Level',
      accessor: 'career_level_id',
      Cell: ({ row }) => {
        const id = row.original?.career_level_id
        return <CareerLevelCell id={id} />
      },
      minWidth: 150
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => {
        return <ActionMenu id={row.original?.id} handleDelete={doDelete} handleEdit={redirectToEditCandidate} />;
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