import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import CustomTable from "../../../../../components/Display/Table/CustomTable";
import ActionMenu from "../../../../../components/Display/Table/components/ActionMenu";
import { useNavigate } from 'react-router-dom';
import { ROUTE_USERS_EDIT } from "../../../../../Router/routes";
import AccessTypeCell from "./components/AccessTypeCell";
import request from "../../../../../utils/request";
import { API_USERS_DELETE } from "../../../../../endpoints";
import { toast } from "@reactjs/components/Feedback/toast";

const ListUsersTable = ({ data, doRefresh }) => {
  const navigate = useNavigate();

  const redirectToEditUser = useCallback((id) => {
    navigate(ROUTE_USERS_EDIT({ id }));
  }, []);

  const doDelete = useCallback((id) => {
    request(
      API_USERS_DELETE({ id }),
      id,
      'DELETE',
      () => {
        doRefresh();
        toast({ color: 'success', message: 'Deleted successfully!' });
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
      minWidth: 200
    },
    {
      Header: 'Email',
      accessor: 'email',
      minWidth: 200
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      minWidth: 150
    },
    {
      Header: 'Role',
      accessor: 'role_id',
      Cell: ({ row }) => {
        const id = row.original?.role_id;
        return <AccessTypeCell id={id} />
      },
      minWidth: 100
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => {
        return <ActionMenu id={row.original?.id} handleDelete={doDelete} handleEdit={redirectToEditUser} />;
      },
      disableSortBy: true,
      width: '1%',
      minWidth: 50
    }
  ];

  return <CustomTable columns={columns} data={data} />
};

ListUsersTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

ListUsersTable.defaultProps = {
  data: []
};

export default ListUsersTable;
