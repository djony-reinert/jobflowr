import React, { useMemo } from "react";
import { useTable, useExpanded } from "react-table";
import { Table, TableCell, TableHead, TableRow, TableBody, IconButton, Typography, Box } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const CandidateProgressByJob = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Job",
        accessor: "job",
      },
      {
        Header: "Candidates Count",
        accessor: "candidates_count",
      },
      {
        Header: "Hired Candidates Count",
        accessor: "hired_candidates_count",
      },
      {
        id: 'expander',
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <Box sx={{ textAlign: 'center' }} {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </Box>
        ),
        Cell: ({ row }) => (
          <Box sx={{ textAlign: 'center' }} >
            <IconButton aria-label={row.isExpanded ? "Collapse" : "Expand"} onClick={() => toggleRowExpanded(row.id)}>
              {row.isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Box>
        )
      }
    ],
    []
  );

  const candidatesColumns = useMemo(
    () => [
      {
        Header: "Candidate Name",
        accessor: "candidate_name",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
    toggleRowExpanded,
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded
  );

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, index) => (
          <TableRow key={index.toString()} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, indexHeader) => (
              <TableCell key={indexHeader.toString()} {...column.getHeaderProps()}>{column.render("Header")}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { job, candidates } = row.original;
          const isExpanded = expanded[row.id];

          return (
            <React.Fragment key={row.id}>
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <TableCell key={index.toString()} {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
                ))}
              </TableRow>
              {isExpanded && (
                <TableRow sx={{ backgroundColor: '#F1F6FE' }} >
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                        {job} Candidates
                      </Typography>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {candidatesColumns.map((column) => (
                              <TableCell sx={{ backgroundColor: '#E1E9F9' }} key={column.Header}>{column.Header}</TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {candidates.map((candidate) => (
                            <TableRow key={candidate.candidate_name}>
                              <TableCell>{candidate.candidate_name}</TableCell>
                              <TableCell>{candidate.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default CandidateProgressByJob;
