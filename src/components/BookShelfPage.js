import React, { useState, useEffect } from "react";
import axios from "axios";

function BookShelfPage() {
  const [myShelves, setMyShelves] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2700/api/shelves/", { withCredentials: true })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return <h1>My BookShelves</h1>;
}
export default BookShelfPage;
