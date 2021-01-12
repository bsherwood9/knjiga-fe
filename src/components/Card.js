import React, { useEffect, useState } from "react";
import * as Vibrant from "node-vibrant";
export default function Card({ data }) {
  let [shade, setShade] = useState("");
  let [directory, setDirectory] = useState(false);

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
  });
  //https://stackoverflow.com/questions/48351978/node-vibrant-package-and-react

  function addtoBookClub() {
    let dataObject = {
      bookId: data.id,
      image: data.volumeInfo.imageLinks.smallThumbnail,
      title: data.volumeInfo.title,
      searchInfo: data.searchInfo?.textSnippet,
      description: data.volumeInfo.description,
      pageCount: data.volumeInfo.pageCount,
      publishDate: data.volumeInfo.publishedDate,
      categories: data.volumeInfo.categories,
      author: data.volumeInfo.authors,
      bookColor: shade,
    };
    return console.log(dataObject);
  }

  function addtoDB() {
    setDirectory(!directory);
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
        <button onClick={addtoDB}>Add</button>
        {directory && (
          <div>
            <h1>Favorites</h1>
            <h1>Current Reading</h1>
          </div>
        )}
        <button onClick={addtoBookClub}>Add to Bookclub</button>
      </div>
    </div>
  );
}
