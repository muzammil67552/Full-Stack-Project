const Read = () => {
    return (
      <div className="container my-2">
        <h1 className="text-center">All Data</h1>
        <div className="row">
          <div className="col-3">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body text-center">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-muted">Email</h6>
                <p className="card-text">Age</p>
                <a href="#" className="card-link">
                  Delete
                </a>
                <a href="#" className="card-link">
                  Update
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Read;
  