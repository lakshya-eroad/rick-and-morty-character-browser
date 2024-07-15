# RICK-AND-MORTY-CHARACTER-BROWSING

https://github.com/user-attachments/assets/d5e43b07-86c8-43ba-bd12-46082c50db2e

[View Demo](https://rick-and-morty-character-browser-8cv4m29lw.vercel.app/?name=&page=1)

A simple website using the [rick-and-morty API](https://rickandmortyapi.com/) that allows the user to browse through all the rick and morty characters and find out simple information about each character.

## How to run locally

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test -- --watchAll=false`

Run's all the tests for the repo

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
- I would also like to see some addition of some e2e tests. Unit tests also need a bit more work using proper tools.
- If more components added, /components folder will need more organisation
