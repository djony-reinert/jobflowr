import React, { useMemo } from "react";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";

const CustomTableHeader = ({ onRequestSort, order, orderBy, headerGroups }) => {
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  const memoizedHeaderGroups = useMemo(() => headerGroups, [headerGroups]);

  return (
    <TableHead>
      {memoizedHeaderGroups.map((headerGroup, index) => (
        <TableRow key={`group-${index}`} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => {
            return (
              <TableCell
                key={column.id}
                padding='normal'
                style={{
                  width: column.width|| 'auto',
                  whiteSpace: 'nowrap',
                  minWidth: column.minWidth || 'auto'
                }}
                sortDirection={orderBy === column.id ? order : false}
                {...column.getHeaderProps()}
              >
                {!column.disableSortBy ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.render('Header')}
                  </TableSortLabel>
                ) : (
                  column.render('Header')
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableHead>
  );
}

export default CustomTableHeader;