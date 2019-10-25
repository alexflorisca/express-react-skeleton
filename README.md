# Express React Skeleton

A minimal server side rendered app skeleton using express, react and simple, sensibe tools. The motivation for this project is to provide a real simple solution to developing React apps. The bare bone essentials, minimal config, sensible defaults, production ready and documented code. 

# Who is it for
- Me, mainly.
- You, if you want to spin up a very simple app and maybe deploy to heroku
- You, if you're fairly new to React and want to understand what's going on...quickly, without getting lost in the config, setup, transpiling hell of the modern js world.

## Features

- **Simple express server** with logging, compression & sensible defaults
- **Server side rendered (SSR) React app** without code duplication
- React router
- **Super simple build process** using [parcel.js](https://parceljs.org/) (no complex webpack setup, no crazy plugins, 2 line babel config)
- **Production ready** (uses [pm2](https://pm2.keymetrics.io/) to run multiple processes and restart itself)
- **Easy dev workflow** with hot module reloading (HMR) for both client and server assets
- **Minimal Jest setup** for testing (configure or swap your own lib in)
- **Documented code** in simple language for anyone to know what's what

# Use

#### Build - `npm run build`
The build process uses [parcel.js](https://parceljs.org/), a zero config bundler. It builds all client side assets for production to the `/dist` folder.

#### Start - `npm start`
Start the server in production with [pm2](https://pm2.keymetrics.io/). This will automatically detect the number of CPU cores and spin up multiple processes. It will also auto restart the app (node server) when it crashes.

#### Dev
To develop locally, there are two steps:

`npm run dev:client` - watches the `./client` directory and refreshes the browser on any changes to your client side js, css or html

`npm run dev: server` - watches both `./client` and `./server`, and restarts the node server when changes to .js files are detected. This means if you hit refresh in the browser your changes will be server rendered and kept up to date with the client side app

#### Clean - `npm run clean`
Utility to cleaning parcel.js cache, node_modules and the ./dist folders.

#### Test - `npm test`
Run the tests with Jest

## Docs
Read the code, there's not much of it. And a lot of comments

## Contributing

If you find this useful, have any suggestions, corrections, or want to help with any of the TODO list, please raise an issue or a PR. I welcome all help and constructive feedback :)

## TODO
 
 - [ ] State management
 - [ ] Code splitting
 - [ ] Sensible CSS defaults
 - [ ] Better caching and server optimisation
 - [ ] Optimise deploy to heroku
