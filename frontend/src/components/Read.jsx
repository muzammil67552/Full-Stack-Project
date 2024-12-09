import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  async function getData() {
    try {
      const response = await fetch("http://localhost:4000"); // Fetch data from the server
      const result = await response.json();

      if (!response.ok) {
        if (result.error?.includes("duplicate")) {
          setError("A user with the same name or email already exists.");
        } else {
          setError(result.error || "An error occurred.");
        }
      } else {
        setData(result); // Update state with fetched data
        navigate("/all")
      }
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      <h1 className="text-center">All Data</h1>

      {/* Show error message if there's an error */}
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div className="col-3" key={index._id}>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body text-center">
                  <h5 className="card-title">{item.name || "No Name"}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {item.email || "No Email"}
                  </h6>
                  <p className="card-text">{item.age || "Age not specified"}</p>
                  <a href="#" className="card-link">
                    Delete
                  </a>
                  <a href="#" className="card-link">
                    Update
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Loading data...</p> // Loading message if no data
        )}
      </div>
    </div>
  );
};

export default Read;
