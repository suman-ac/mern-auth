import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false); // modal visibility

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setShowModal(true)); // show modal instead of alert
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-start vh-100 bg-light pt-5">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Profile</h3>
        {user ? (
          <pre className="bg-light p-3 rounded">{JSON.stringify(user, null, 2)}</pre>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Unauthorized</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Please login to access this page.</p>
              </div>
              <div className="modal-footer">
                <a href="/" className="btn btn-primary">
                  Go to Login
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
