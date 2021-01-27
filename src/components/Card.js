import React, { useEffect, useState } from "react";
import * as Vibrant from "node-vibrant";
import axios from "axios";
export default function Card({ data, clubs, shelves }) {
  let [shade, setShade] = useState("");
  let [showClubs, setShowClubs] = useState(false);
  let [showShelves, setShowShelves] = useState(false);

  let dataObject = {
    bookId: data.id,
    image: data.volumeInfo.imageLinks?.smallThumbnail,
    title: data.volumeInfo.title,
    searchInfo: data.searchInfo?.textSnippet,
    description: data.volumeInfo.description,
    pageCount: data.volumeInfo.pageCount,
    publishDate: data.volumeInfo.publishedDate,
    categories: data.volumeInfo.categories,
    author: data.volumeInfo.authors,
    bookColor: shade,
  };
  useEffect(() => {
    let setUpPalette = () => {
      if (data.volumeInfo.imageLinks) {
        let image = data.volumeInfo.imageLinks.smallThumbnail;
        Vibrant.from("https://cors-anywhere.herokuapp.com/" + image)
          .getPalette()
          .then((palette) => {
            // console.log(palette)
            // console.log(palette.Vibrant.getHex())
            //LightVibrant, LightMuted, Muted are good alternatives.
            setShade(palette.Vibrant.getHex());
          })
          .catch((error) => {
            // handle errors
            console.log(error);
          });
      }
    };
    setUpPalette();
  }, []);
  //https://stackoverflow.com/questions/48351978/node-vibrant-package-and-react

  function addtoBookClub() {
    setShowClubs(true);
    console.log("club data on card,", clubs);
  }

  function addToShelves(id) {
    dataObject.shelfId = id;
    axios
      .post(`http://localhost:4000/api/books/add`, dataObject, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function addBookToClub(id) {
    console.log(id);
    console.log(data.id);
    let update = { bookSelection: data.id };
    axios
      .put(`http://localhost:4000/api/clubs/edit/${id}`, update, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  let publishDate = data.volumeInfo.publishedDate;
  let categories = data.volumeInfo.categories;
  let searchInfo = data.searchInfo?.textSnippet || false;
  let authors = data.volumeInfo.authors;
  return (
    <div className="card" style={{ backgroundColor: shade }}>
      <h1>{data.volumeInfo.title}</h1>
      {searchInfo ? (
        <p dangerouslySetInnerHTML={{ __html: searchInfo }} />
      ) : (
        <span>nothing here</span>
      )}
      {authors && authors.map((item) => <p>{item}</p>)}
      <div>
        {data.volumeInfo.imageLinks ? (
          <img src={data.volumeInfo.imageLinks.thumbnail} />
        ) : (
          <h2>No image available</h2>
        )}
        <p>{data.volumeInfo.description}</p>
        <p>Pages: {data.volumeInfo.pageCount}</p>
        <p>Published {publishDate ? publishDate.slice(0, 4) : "N/A"}</p>
        <div>
          Tags:{" "}
          {categories ? categories.map((item) => <p>{item}</p>) : <span></span>}
        </div>
      </div>
      <div>
        {shelves.length > 0 && (
          <button
            onClick={() => {
              setShowShelves(!showShelves);
              console.log(showShelves);
            }}
          >
            Add
          </button>
        )}
        {showShelves && (
          <div>
            {shelves.map((item) => {
              return (
                <p onClick={() => addToShelves(item.id)} key={item.id}>
                  {item.title}
                </p>
              );
            })}
          </div>
        )}
        {clubs.length > 0 && (
          <button onClick={addtoBookClub}>Add to Bookclub</button>
        )}
        {showClubs && (
          <div>
            {clubs.map((item) => {
              return (
                <h1 onClick={() => addBookToClub(item.id)} key={item.id}>
                  {item.clubName}
                </h1>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
