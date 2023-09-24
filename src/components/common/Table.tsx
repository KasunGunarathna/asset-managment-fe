import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Avatar,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";

interface Column {
  id: string;
  label: string;
  photo?: boolean;
  url?: string;
  location?: boolean;
}

interface ReusableTableProps {
  columns: Column[];
  data: any[];
  handleDelete: any;
  handleEdit: any;
  handleView: any;
  handleOpenModal?: any;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  handleDelete,
  handleEdit,
  handleView,
  handleOpenModal,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openGoogleMaps = (event: any) => {
    event.preventDefault(); // Prevent the default behavior of the anchor element
    console.log(event.target.textContent)
    const location = event.target.textContent;
    const latitude = location.split(",")[0]; // Replace with the actual latitude from your data
    const longitude = location.split(",")[1];  // Replace with the actual longitude from your data
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Open Google Maps in a new tab or window
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <TableContainer sx={{ maxHeight: 380 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      backgroundColor: "#9bcbea",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  key="actions"
                  sx={{
                    backgroundColor: "#9bcbea",
                    fontWeight: "bold",
                    textAlign: "right",
                    paddingRight: "50px",
                    paddingLeft: "50px",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow key={row.id}>
                    {columns.map((column) => (
                      <TableCell onClick={column.location ? openGoogleMaps : undefined} key={column.id}>
                        {" "}
                        {column.photo && row[column.id] ? (
                          // Render the photo as an Avatar if 'photo' column is present
                          <Avatar
                            alt={column.label}
                            src={row[column.url || column.id]}
                            sx={{ width: 50, height: 50, cursor: "pointer" }}
                            onClick={() =>
                              handleOpenModal(row[column.url || column.id])
                            }
                          />
                        ) : // Otherwise, render regular text
                        column.location && row[column.id] ? (
                          // eslint-disable-next-line jsx-a11y/anchor-is-valid
                          <a href="#" onClick={openGoogleMaps}>{row[column.id]}</a>
                        ) : (
                          row[column.id]
                        )}
                      </TableCell>
                    ))}
                    <TableCell
                      key={`actions-${rowIndex}`}
                      sx={{
                        textAlign: "right",
                      }}
                    >
                      <IconButton
                        sx={{ color: "#df4444" }}
                        aria-label="Delete"
                        onClick={() => handleDelete(row.id)} // Implement a delete handler function.
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        sx={{ color: "#00bec4" }}
                        aria-label="Edit"
                        onClick={() => handleEdit(row.id)} // Implement an edit handler function.
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        sx={{ color: "#2fce3b" }}
                        aria-label="View"
                        onClick={() => handleView(row.id)} // Implement a view handler function.
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default ReusableTable;
