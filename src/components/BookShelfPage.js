import React, { useState, useEffect } from "react";
import axios from "axios";

function BookShelfPage() {
  const [myShelves, setMyShelves] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/shelves/alldata", {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data.data);
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
          {item.books.map((el) => {
            return (
              <div
                style={{
                  width: "50%",
                  border: "1px solid black",
                  background: el.bookColor,
                }}
                key={el.bookId}
              >
                <h3>{el.title}</h3>
                <h4>{el.author}</h4>
                <p>{el.description}</p>
                <img src={el.image} alt={el.title} />
                <p>Page Count: {el.pageCount}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
export default BookShelfPage;
