import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import mockAxios from 'axios';
import renderer from 'react-test-renderer';

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

  //  mockAxios.get.mockImplementationOnce can be used to change the call for a specific test instead of using the generic imported mockAxios

  mockAxios.get.mockImplementationOnce(() => {
    Promise.resolve({
      data: { topalbums: { album: [] } }
    });
  });

  // act

  const { getByText } = render(<App />);

  // assert

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(
    'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=sonic youth&api_key=adf0f28675fbabee9c5c0fb4bede5e80&format=json'
  );
  expect(getByText('Loading ...')).toBeInTheDocument();
});

it('renders correctly', () => {
  const tree = renderer.create(<App />);
  expect(tree).toMatchSnapshot();
});
