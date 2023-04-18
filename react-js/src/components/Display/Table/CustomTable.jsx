import React from 'react';
import {Paper, Table, TableContainer, TablePagination} from '@mui/material';
import CustomTableHeader from "./CustomTableHeader";
import CustomTableBody from "./CustomTableBody";
import PropTypes from 'prop-types';
import {useTable} from "react-table";
import {useTableUtils} from "../../../hooks/useTableUtils";

const CustomTable = ({ columns, data }) => {
  const {
    visibleRows,
    order,
    orderBy,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
  } = useTableUtils({ columns, data });

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: visibleRows,
    initialState: { hiddenColumns: columns.filter(column => column.hide).map(column => column.accessor) }
  });

  return (
    <>
      <TableContainer component={Paper} sx={{ minWidth: 800 }}>
        <Table {...getTableProps()}>
          <CustomTableHeader
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headerGroups={headerGroups}
          />
          <CustomTableBody rows={rows} columns={columns} page={page} rowsPerPage={rowsPerPage} prepareRow={prepareRow} />
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

CustomTable.defaultProps = {
  columns: [],
  data: []
};

export default CustomTable;
