import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import mockAxios from 'axios';

// beforeEach(() => {
// });

afterEach(() => {
  mockAxios.get.mockClear();
});

it('renders the h1 correctly', () => {
  const { getByText } = render(<App />);
  expect(
    getByText("Search for your favourite artist's top albums")
  ).toBeInTheDocument();
});

it('axios get is called once with correct url and Loading... is displayed', () => {
  // arrange

  //  mockAxios.get.mockImplementationOnce can be used to change api call for a specific test instead of using the imported function
  mockAxios.get.mockImplementationOnce(() => {
    Promise.resolve({
      data: { topalbums: { album: [] } }
    });
  });

  // act

  // const { getByText } = render(<App />);

  // look at calling act and get by text - maybe

  let fn;
  act(() => {
    fn = render(<App />).getByText;
  });

  // assert
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(
    'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=sonic youth&api_key=adf0f28675fbabee9c5c0fb4bede5e80&format=json'
  );

  expect(fn('Loading ...')).toBeInTheDocument();
});
