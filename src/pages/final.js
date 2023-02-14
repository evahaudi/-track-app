function handleRowClick(data) {
    swal.fire({
      title: `More details  for ${data.first_name}`,
      text: `F.NAME: ${data.first_name} L.NAME: ${data.last_name},Department: ${data.department},Email: ${data.email}`,
    });
  }
  
  
  
  <TableBody>
    {applySortFilter(tableData, getComparator(order, orderBy), filterName).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
      const isItemSelected = selected.indexOf(row.first_name) !== -1;
      const labelId = `table-checkbox-${index}`;
      return (
        <TableRow
          hover
          onClick={(event) => handleClick(event, row.first_name)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.first_name}
          selected={isItemSelected}
        >
          <TableCell padding="checkbox">
            <Checkbox
              checked={isItemSelected}
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </TableCell>
          <TableCell component="th" id={labelId} scope="row">
            {row.first_name}
          </TableCell>
          <TableCell>{row.last_name}</TableCell>
          <TableCell>{row.department_name}</TableCell>
          <TableCell>{row.email}</TableCell>
         
          <TableCell>
            <Button variant="contained" onClick={() => handleRowClick(row)}>view details</Button>
          </TableCell>
        </TableRow>
      );
    })}
  </TableBody>