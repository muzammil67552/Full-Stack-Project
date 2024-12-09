import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { id } = useParams(); 

  // Function to fetch the user data by ID
  const getSingleUser = async () => {
    try {
      const response = await fetch(`https://full-stack-project-kappa-nine.vercel.app/?vercelToolbarCode=BRUBumMzP1myTuv/${id}`);
      const result = await response.json();

      if (!response.ok) {
        console.error(result.error);
        setError("Failed to fetch user data.");
      } else {
        setName(result.name || "");
        setEmail(result.email || "");
        setAge(result.age || 0);
        setError("");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("An error occurred while fetching user data.");
    }
  };

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await fetch(`https://full-stack-project-kappa-nine.vercel.app/?vercelToolbarCode=BRUBumMzP1myTuv/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, age }),
      });
      const result = await response.json();

      if (!response.ok) {
        console.error(result.error);
        setError("Failed to update user data.");
      } else {
        setError("User updated successfully.");
        setTimeout(() => {
          navigate("/all"); 
        }, 2000); 
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setError("An error occurred while updating user data.");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-2">
      <h2 className="text-center">Edit Data</h2>
      <form onSubmit={handleSubmit}>
        {/* Display error or success messages */}
        {error && (
          <div className={`alert ${error.includes("successfully") ? "alert-success" : "alert-danger"}`} role="alert">
            {error}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
