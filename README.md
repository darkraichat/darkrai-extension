# Darkrai Browser Extension

Darkrai is a browser extension that will enable the user to chat with any other user visiting the same website as themselves. This extension has various advantages, some of which being meeting people with the same interest, and resolving the doubts for which the website is visited for.

The extension component for the Darkrai browser extension.

You can find the repository for the server [here.](https://github.com/smit2k14/darkrai-server)

> Darkrai is a browser extension which enables you to chat with anybody visiting the same website 🤩

## Development

- You need Node & Yarn to start the development environment. Download them here - [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com).

- Optionally you can setup a `.env` file in the root of the repository to set the server url (if you don't do this it will default to `http://localhost:4848`). The file should look like this:

```bash
REACT_APP_SERVER_URL=#Darkrai server url
```

- Run the development server using:

```bash
yarn dev
```

- Build the production level extension:

```bash
yarn build
```

### Other Scripts

- Lint the code using eslint:

```bash
yarn lint
```
