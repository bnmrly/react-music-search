import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { apiKey } from './config';
import 'normalize.css';
import './App.css';

import noImage from './images/no-image-available.png';

function App() {
  const [data, setData] = useState({ topAlbums: [] });
  const [query, setQuery] = useState('sonic youth');
  const [url, setUrl] = useState(
    `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${query}&api_key=${apiKey}&format=json`
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        const topAlbums = result.data.topalbums.album;
        setData(topAlbums);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <Fragment>
      <h1 className="top-albums__app-heading">
        Search for your favourite artist's top albums
      </h1>
      <div className="top-albums__search-container">
        <form
          className="top-albums__form"
          onSubmit={event => {
            setUrl(
              `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${query}&api_key=adf0f28675fbabee9c5c0fb4bede5e80&format=json`
            );
            event.preventDefault();
          }}
        >
          <input
            className="top-albums__input"
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <button className="top-albums__btn" type="submit">
            Search
          </button>
        </form>
      </div>

      {isLoading ? (
        <h3 className="top-albums__loading-message">Loading ...</h3>
      ) : isError ? (
        <h3 className="top-albums__error-message">
          Something went wrong, please search again...
        </h3>
      ) : (
        <Fragment>
          {data.length && (
            <h2 className="top-albums__header">
              Top albums by {data[0].artist.name}
            </h2>
          )}
          <div className="top-albums__search-results">
            {data.length &&
              data.map((el, index) => {
                return el.image.map(img => {
                  return img.size === 'large' ? (
                    <div className="top-albums__card" key={index}>
                      <img
                        className="top-albums__cover-image"
                        src={img['#text'].length ? img['#text'] : noImage}
                        alt="top album cover"
                      />
                      <h4 className="top-albums__title" key={index}>
                        {el.name}
                      </h4>
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
