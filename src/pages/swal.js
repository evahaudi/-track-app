const handleButtonClick = async (rowData) => {
    try {
      // Make the API call
      const response = await axios.get(`your-api-endpoint/${rowData.id}`);
      const data = response.data;
  
      // Show the success message using Swal.fire
      Swal.fire({
        title: "Success!",
        text: "The data was fetched successfully",
        icon: "success"
      });
    } catch (error) {
      // Show the error message using Swal.fire
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error"
      });
    }
  };

  const TableRow = ({ rowData }) => (
    <tr>
      {/* ... */}
      <td>
        <button onClick={() => handleButtonClick(rowData)}>Fetch Data</button>
      </td>
    </tr>
  );
  