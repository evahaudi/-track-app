import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Row(props) {
  const { id } = props;
  const [data, setData] = useState(null);

  const handleClick = async () => {
    try {
      const response = await axios.get(`https://your-api.com/user/${id}`);
      setData(response.data);
      Swal.fire({
        title: `User ${id}`,
        html: `<pre>${JSON.stringify(response.data, null, 2)}</pre>`,
        showConfirmButton: false,
        width: 600,
        padding: '3em',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          center left
          no-repeat
        `
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error'
      });
    }
  };

  return (
    <tr>
      <td>{id}</td>
      <td>
        <button onClick={handleClick}> Show User </button>
      </td>
    </tr>
  );
}

export default Row;
