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
      .get("http://localhost:2500/api/clubs/clubList")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  const changeHandler = (e) => {
    setBookclub({ ...bookclub, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bookclub);
  };
  return (
    <div>
      <h1>BookClub is here</h1>
      <div>
        <h2>My Clubs</h2>
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
