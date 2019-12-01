import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ popularAlbums: [] });
  const [query, setQuery] = useState('miles davis');
  const [url, setUrl] = useState(
    `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${query}&api_key=adf0f28675fbabee9c5c0fb4bede5e80&format=json`
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        const popularAlbums = result.data.topalbums.album;
        console.log(popularAlbums);
        setData(popularAlbums);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <Fragment>
      <h1>Search for your favourite artist's top albums</h1>
      <form
        onSubmit={event => {
          setUrl(
            `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${query}&api_key=adf0f28675fbabee9c5c0fb4bede5e80&format=json`
          );
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        // refactor this check
        <Fragment>
          <div>
            {data.length && <h1>Top albums by {data[0].artist.name}</h1>}
            {data.length > 0 &&
              data.map((el, index) => {
                return el.image.map(img => {
                  return img.size === 'large' ? (
                    <div className="topAlbum-info" key={index}>
                      <img src={img['#text']} alt="" />
                      <h4 key={index}>{el.name}</h4>
                    </div>
                  ) : null;
                });
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default App;
