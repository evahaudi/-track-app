import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState ,useEffect} from 'react';
import Swal from 'sweetalert2';
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

const TABLE_HEAD = [
  { id: 'first_name', label: 'F.Name', alignRight: false },
  { id: 'last_name', label: 'L.name', alignRight: false },
  { id: 'department_name', label: 'Department', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: '' },
];
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.first_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('first_name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState([]);

  const successAlert = () => {
    
    Swal.fire({  
        title: 'MORE DETAILS!',  
        text1: 'first_name is:',
        text2: 'last_name is:',
        text3: 'department is:',
        text4: 'email is:',
        icon: 'success'
      }); 
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n) => n.first_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, first_name) => {
    const selectedIndex = selected.indexOf(first_name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, first_name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const filteredUsers = applySortFilter(tableData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  useEffect(() => {
    fetch("http://10.151.1.111:8000/employee_app/api/v1/Employee/")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, []);
  console.log(tableData);

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, first_name, last_name, department_name, email } = row;
                    const selectedUser = selected.indexOf(first_name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, first_name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={first_name} src="" />
                            <Typography variant="subtitle2" noWrap>
                              {first_name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{last_name}</TableCell>

                        <TableCell align="left">{department_name}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="right">
                        <Button onClick={successAlert} variant="contained">More details</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}




// import React, { useState, useEffect ,useId} from 'react'
// import { DataGrid,GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
// import {  UserListToolbar } from '../sections/@dashboard/user';



// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }


// const columns = [
//   { field: 'id', headerName: 'ID' },
//   { field: 'first_name', headerName: 'F.Name', width: 150 },
//   { field: 'last_name', headerName: 'L.Name', width: 150},
//   { field: 'department', headerName: 'Department', width: 150},
//   { field: 'email', headerName: 'Email', width: 250 }
// ]

// const Test = () => {
//     const id = useId();
//     const [tableData, setTableData] = useState([])

    
//     const [deletedRows, setDeletedRows] = useState([]);

//     useEffect(() => {
//         fetch("http://10.151.1.111:8000/employee_app/api/v1/Employee/")
//           .then((data) => data.json())
//           .then((data) => setTableData(data))
    
//       }, [])
    
//       console.log(tableData);
//   return (
//     <>
//        <UserListToolbar/>
       
//        <DataGrid
//       sx={{
//         boxShadow: 1,
//         border: 1,
//         search:"true",
//         width: '800px',
//         borderColor: 'primary.light',
//         '& .MuiDataGrid-cell:hover': {
//           color: 'primary.main',
//         },
//       }}
//       rows={tableData}
//       columns={columns}
//       key={id}
//       // pageSize={12}
//       checkboxSelection
//       onSelectionModelChange={({ selectionModel }) => {
//         const rowIds = selectionModel.map(rowId => parseInt(String(rowId), 10));
//         const rowsToDelete = tableData.filter(row => rowIds.includes(row.id));
//         setDeletedRows(rowsToDelete);
//         console.log(deletedRows);
//       }}
//       getRowClassName={(params) => `super-app-theme--${params.row.status}`}
//       components={{
//         Toolbar: CustomToolbar,
//       }}
//       pageSize={15}
//       rowsPerPageOptions={[15]}
//     />
    
  
  
//   </>
//   )
// }

// export default Test