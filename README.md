# Draw Something!
Collaborative graffiti application for wall-sized displays

Try out the demo here:
1. Open the [Palette](https://draw-sg.herokuapp.com/palette) with a phone.
2. Open the [Canvas](https://draw-sg.herokuapp.com/canvas) on a tablet or desktop. 

## Install
`yarn install`

`npm install`

## Running the development environment
### With creating a localtunnel to access the local server both on desktop and a smartphone
`SERVER_PORT=<your chosen port> SUBDOMAIN=<your chosen subdomain> yarn devlt`

`SERVER_PORT=<your chosen port> SUBDOMAIN=<your chosen subdomain> npm run devlt`

### WITHOUT creating a localtunnel (only on localhost)
`SERVER_PORT=<your chosen port> SUBDOMAIN=<your chosen subdomain> yarn dev`

`SERVER_PORT=<your chosen port> SUBDOMAIN=<your chosen subdomain> npm run dev`

In both cases Nodemon will let you edit the files and reload the application. (Hot-reload)
