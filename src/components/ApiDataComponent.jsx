import { useState, useEffect } from 'react';

const ApiDataComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        const randomCount = Math.floor(Math.random() * 9) + 2; // Random between 2-10
        setData(result.slice(0, randomCount));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>API Data (Posts)</h2>
      <div style={{ 
        maxHeight: '400px', 
        overflowY: 'auto', 
        display: 'grid', 
        gap: '15px' 
      }}>
        {data.map(post => (
          <div key={post.id} style={{ 
            border: '1px solid #ccc', 
            padding: '15px', 
            borderRadius: '5px' 
          }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>Post ID: {post.id}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiDataComponent;