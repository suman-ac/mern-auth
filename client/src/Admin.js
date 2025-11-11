import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        // Make request directly with axios
        const { data } = await axios.get(
          `${
            process.env.REACT_APP_API_URL || "http://localhost:5000"
          }/api/auth/admin`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        setData(data);
      } catch (err) {
        setMsg(err.response?.data?.message || "Failed to load admin data");
      }
    }

    load();
  }, []);

  const renderData = () => {
    if (!data) return null;

    // If data is an array
    if (Array.isArray(data)) {
      if (data.length === 0)
        return <div className="text-center text-muted">No data available.</div>;
      return (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  {Object.values(item).map((val, i) => (
                    <td key={i}>{val?.toString()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // If data is an object
    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <tbody>
            {Object.entries(data).map(([key, val]) => (
              <tr key={key}>
                <th>{key}</th>
                <td>{val?.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container my-4">
      <h3 className="text-center text-primary mb-4">Admin Panel</h3>

      {msg && (
        <div className="alert alert-danger text-center" role="alert">
          {msg}
        </div>
      )}

      {!data && !msg && (
        <div className="text-center text-muted">Loading admin data...</div>
      )}

      {data && renderData()}
    </div>
  );
}
