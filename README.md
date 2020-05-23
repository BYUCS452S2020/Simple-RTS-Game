# Simple RTS

This project will be an over-simplified multiplayer Real Time Strategy game. Players will create structures and units to fight and conquer the other players on the map. This will be playable in the browser for easy interoperability across different operating systems

See the project pitch [here](https://github.com/BYUCS452S2020/Simple-RTS-Game/blob/master/Project%20Pitch%20CS%20452.pdf)

See our database schemas [here](https://github.com/BYUCS452S2020/Simple-RTS-Game/blob/master/DBSchemas.md)

## Getting Started

1. Clone the repository
2. Navigate to the root folder
3. Run `npm install`
4. Run `npm start`
  * This runs both the server and the client concurrently
  * To run separately use the commands `npm run server` and `npm run client`
  * By default server is on localhost:4000 and client is on localhost:3000

### Prerequisites

You will need node.js and npm installed on your machine.

Check if you have a version of node and npm installed

```
node -v
npm -v
```

#### Instructions for Installing Node.js

##### Linux
https://nodejs.org/en/download/package-manager/

##### MacOS or Windows
https://nodejs.org/en/download/


## Running the tests

Navigate to the root folder and run the following:
```
npm test
```

## Deployment

TODO (we don't have a host to deploy to yet)

## Built With

* [React](https://reactjs.org/) - The web framework used for the front end (client)
* [Express](https://expressjs.com/) - The web framework used for the back end (server)
* [Tiled](https://www.mapeditor.org/) - The map editor used for our game maps
* [Socket.io](https://socket.io) - The engine used for creating real time game updates between web frameworks
* [Picolabs](http://picolabs.io/) - The engine used for our NoSQL database and back end (server)

## Contributing

If you wish to contribute here are some simple things you can do

* Open an issue and report bugs or request features
* Contribute code by:
  1. Cloning or Forking the Repo
  2. Making a new branch
  3. Then submitting a pull request
  4. Please include descriptions and screenshots if you can (not required)
  5. If it passes our tests then we will merge it into master

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Norberto Martinez**
* **Michael Black**
* **Jacob Walker**

See also the list of [contributors](https://github.com/BYUCS452S2020/Simple-RTS-Game/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to [Keny.nl](https://www.kenney.nl/assets) for the free tilesets used to create our game maps
