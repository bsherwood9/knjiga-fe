import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookClub() {
  let [bookclub, setBookclub] = useState({
    clubName: "",
  });
  let [clubList, setClubList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2600/api/clubs/clubList", {
        withCredentials: true,
      })
      .then((res) => {
        setClubList(res.data.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  //showing my clubs
  // const ShowClubs = () => {
  //   if (clubList.length > 0) {
  //     clubList.map((item) => {
  //       return (
  //         <div>
  //           <h1>{item.clubName}</h1>
  //         </div>
  //       );
  //     });
  //   }
  //   return <h1>You have no clubs</h1>;
  // };

  //helper functions
  const changeHandler = (e) => {
    setBookclub({ ...bookclub, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bookclub);
    axios
      .post("http://localhost:2600/api/clubs/add", bookclub, {
        withCredentials: true,
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>BookClub is here</h1>
      <div>
        <h2>My Clubs</h2>
        {clubList.length > 0 ? (
          clubList.map((item) => {
            return (
              <div key={item.id}>
                <h1>{item.clubName}</h1>
              </div>
            );
          })
        ) : (
          <h1>You have no clubs</h1>
        )}
      </div>
      <div>
        <label>Club Name</label>
        <input
          onChange={changeHandler}
          name="clubName"
          value={bookclub.clubName}
          type="text"
        />
        <button onClick={handleSubmit}>+</button>
      </div>
    </div>
  );
}
export default BookClub;
