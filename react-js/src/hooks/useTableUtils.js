import {useEffect, useState, useCallback} from "react";

const DEFAULT_ORDER = 'asc';
const DEFAULT_ROWS_PER_PAGE = 5;

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


const stableSort = (array, comparator) => {
  if (!array) return;

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const getInitialVisibleRows = (data, orderBy) => {
  let rowsOnMount = stableSort(data, getComparator(DEFAULT_ORDER, orderBy));

  rowsOnMount = rowsOnMount?.slice(
    0 * DEFAULT_ROWS_PER_PAGE,
    0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
  );

  return rowsOnMount;
}
export const useTableUtils = ({ columns, data }) => {
  const [visibleRows, setVisibleRows] = useState([]);
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(columns[0].accessor);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  useEffect(() => {
    const initialVisibleRows = getInitialVisibleRows(data, orderBy);
    setVisibleRows(initialVisibleRows);
  }, [data]);

  const handleRequestSort = useCallback((event, newOrderBy) => {
    const isAsc = orderBy === newOrderBy && order === 'asc';
    const toggledOrder = isAsc ? 'desc' : 'asc';
    setOrder(toggledOrder);
    setOrderBy(newOrderBy);

    const sortedRows = stableSort(data, getComparator(toggledOrder, newOrderBy));
    const updatedRows = sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    setVisibleRows(updatedRows);
  }, [orderBy, order, data, page, rowsPerPage]);

  const handleChangePage = useCallback((_, newPage) => {
    setPage(newPage);

    const sortedRows = stableSort(data, getComparator(order, orderBy));
    const updatedRows = sortedRows.slice(
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage
    );

    setVisibleRows(updatedRows);
  }, [data, order, orderBy, rowsPerPage]);

  const handleChangeRowsPerPage = useCallback((event) => {
    const updatedRowsPerPage = event.target.value;
    setRowsPerPage(updatedRowsPerPage);
    setPage(0);

    const sortedRows = stableSort(data, getComparator(order, orderBy));
    const updatedRows = sortedRows.slice(
      0 * updatedRowsPerPage,
      0 * updatedRowsPerPage + updatedRowsPerPage
    );

    setVisibleRows(updatedRows);
  }, [data, order, orderBy]);

  return {
    visibleRows,
    order,
    orderBy,
    page,
    rowsPerPage,
    setOrder,
    setOrderBy,
    setPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort
  };
};
