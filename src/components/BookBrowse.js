import { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import Card from "./Card";

function BookBrowser() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [words, setWords] = useState("");
  const [displayedData, setDisplayedData] = useState();
  let [beginning, setBeginning] = useState(0);
  let [offset, setOffset] = useState(10);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=10&key=AIzaSyBHxFwknXdd5EzjWn7dNS80jVOxzsxcrL0`
      )
      .then((res) => {
        console.log(res);
        setResults(res.data.items);
      })
      .catch((err) => console.log(err));
  }, [searchTerm]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setWords(e.target.value);
  };
  const submitSearch = () => {
    setSearchTerm(words);
  };
  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button onClick={submitSearch}>Search</button>
      <div className="card-grid">
        {results.length === 0 ? (
          <h1>Please search for a book...</h1>
        ) : (
          results.map((item) => {
            console.log(item);
            return <Card data={item} key={item.id} />;
          })
        )}
      </div>
    </div>
  );
}

export default BookBrowser;
