import React, { useMemo } from "react";
import { useTable, useExpanded } from "react-table";
import { Table, TableCell, TableHead, TableRow, TableBody, IconButton, Typography, Box } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

function JobOpeningsByDepartment({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Job Count",
        accessor: "job_count",
      },
      {
        Header: "Open Job Count",
        accessor: "open_job_count",
      },
      {
        Header: "Job applications Count",
        accessor: "job_applications_count",
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

  const jobsColumns = useMemo(
    () => [
      {
        Header: "Job Title",
        accessor: "job_title",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Job Applications Count",
        accessor: "job_applications_count",
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
          const { department, jobs } = row.original;
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
                        {department} Department
                      </Typography>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {jobsColumns.map((column) => (
                              <TableCell sx={{ backgroundColor: '#E1E9F9' }} key={column.Header}>{column.Header}</TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {jobs.map((job) => (
                            <TableRow key={job.title}>
                              <TableCell>{job.title}</TableCell>
                              <TableCell>{job.location}</TableCell>
                              <TableCell>{job.job_applications_count}</TableCell>
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

export default JobOpeningsByDepartment;
