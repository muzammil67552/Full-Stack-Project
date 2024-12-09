import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]); // State for storing fetched data
  const [error, setError] = useState(""); // State for storing errors

  // Function to fetch data from the server
  async function getData() {
    try {
      const response = await fetch("https://full-stack-project-kappa-nine.vercel.app/");
      const result = await response.json();

      if (!response.ok) {
        if (result.error?.includes("duplicate")) {
          setError("A user with the same name or email already exists.");
        } else {
          setError(result.error || "An error occurred.");
        }
      } else {
        setData(result); // Update state with fetched data
      }
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
    }
  }

  // Function to delete a user
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://full-stack-project-kappa-nine.vercel.app/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError("Delete failed.");
      } else {
        setError("Deleted successfully.");
        setTimeout(() => {
          setError("");
          getData(); // Refresh data after deletion
        }, 1000);
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("An error occurred while deleting.");
    }
  };

 

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      <h1 className="text-center">All Data</h1>

      {/* Show error or success message */}
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {data.length > 0 ? (
          data.map((item) => (
            <div className="col-3" key={item._id}>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body text-center">
                  <h5 className="card-title">{item.name || "No Name"}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {item.email || "No Email"}
                  </h6>
                  <p className="card-text">{item.age || "Age not specified"}</p>
                  <a
                    className="card-link"
                    onClick={() => handleDelete(item._id)}
                    style={{ cursor: "pointer" }}
                  >
                    Delete
                  </a>
                  <Link to = {`/${item._id}`} className="card-link"  style={{ cursor: "pointer" }} >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default Read;
