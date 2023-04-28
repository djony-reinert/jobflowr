import { TableBody, TableRow, TableCell } from "@mui/material";
import React from "react";

const CustomTableBody = ({ rows, prepareRow }) => {
  return (
    <TableBody>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <TableRow key={row.original?.id} {...row.getRowProps()}>
            {row.cells.map((cell) => (
              <TableCell
                key={`${cell.column.id}-${cell.row.id}`}
                {...cell.getCellProps()}
                style={{ textAlign: cell.column.numeric ? 'right' : 'left' }}
              >
                {cell.render('Cell')}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default CustomTableBody;
