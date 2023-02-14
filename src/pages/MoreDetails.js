
import {useState} from 'react';

const Tad = () => {
  const [data, setData] = useState({data: []});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: 'GET',
        
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log('result is: ', JSON.stringify(data, null, 4));

      setData(data);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  return (
    <div>
      {err && <h2>{err}</h2>}

      <button onClick={handleClick}>Fetch data</button>

      {isLoading && <h2>Loading...</h2>}

      {data && data.map(data => {
        return (
          <div key={data.id}>
            <h2>{data.name}</h2>
            <h2>{data.username}</h2>
            
            <h2>{data.email}</h2>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Tad;
