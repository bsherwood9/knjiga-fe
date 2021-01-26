import React, { useState, useEffect } from "react";
import axios from "axios";

function BookShelfPage() {
  const [myShelves, setMyShelves] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2800/api/shelves/", { withCredentials: true })
      .then((data) => {
        console.log(data);
        setMyShelves(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>These are your bookshelves.</h1>
      {myShelves.map((item) => (
        <div>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
export default BookShelfPage;
