# RICK-AND-MORTY-CHARACTER-BROWSING

A simple website using the [rick-and-morty API](https://rickandmortyapi.com/) that allows the user to browse through all the rick and morty characters and find out simple information about each character.

## Tech stack:

- React (https://react.dev/)
- React Testing Library (https://testing-library.com/docs/react-testing-library/intro/)
- Apollo Client (https://www.apollographql.com/docs/react) (for GraphQL interaction)
- GraphQL (https://graphql.org/)
- DaisyUI with Tailwind (https://daisyui.com/)
- Vercel (https://vercel.com/)

## Features addressed:

- Mobile friendliness
- Pagination and performance (lazy loading as required)
- Searching
- URL handling and routes
- GraphQL - only extracting the data I need from the API
- Loading and error states

## Further improvements:

- State management layer (useState is fine for a small application)
- Pagination limit how many characters we show on the page
- Translations using i18n
- Further WCAG improvements (introducing light mode etc...)
- Results are show as I type them on search
- I would also like to see some addition of some e2e tests

## How to run

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
