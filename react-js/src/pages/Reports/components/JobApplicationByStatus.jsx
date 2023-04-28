import React, { useMemo } from "react";
import { useTable, useExpanded } from "react-table";
import { Table, TableCell, TableHead, TableRow, TableBody, IconButton, Typography, Box } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const JobApplicationByStatus = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Job applications Count",
        accessor: "count",
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

  const jobApplicationsColumns = useMemo(
    () => [
      {
        Header: "Job Title",
        accessor: "job_title",
      },
      {
        Header: "Candidate Name",
        accessor: "candidate_name",
      },
      {
        Header: "Applied at",
        accessor: "applied_at",
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
            {headerGroup.headers.map((column, headerIndex) => (
              <TableCell key={headerIndex.toString()} {...column.getHeaderProps()}>{column.render("Header")}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { status, job_applications: jobApplications } = row.original;
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
                        {status} Status
                      </Typography>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {jobApplicationsColumns.map((column) => (
                              <TableCell sx={{ backgroundColor: '#E1E9F9' }} key={column.Header}>{column.Header}</TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {jobApplications.map((jobApp) => (
                            <TableRow key={jobApp.status}>
                              <TableCell>{jobApp.job_title}</TableCell>
                              <TableCell>{jobApp.candidate_name}</TableCell>
                              <TableCell>{jobApp.applied_at}</TableCell>
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

export default JobApplicationByStatus;
