react-d3-hotload-test-demo
=====================

A dev environment for live-editing React components, focused on d3 development and informed by tests.

### Usage


    $ npm install

should install your packages. You will need a relative current npm and node
current npm version is 3.10.5 and current node is v6.2.2



     $ npm start
     open http://localhost:3000

Now edit `src/MyChart.js`.

Your changes will appear without reloading the browser

### Linting

React-friendly ESLint configuration.

```
npm run lint
```


### Test

Karma runner runs Jasmine tests using PhantomJS

```
npm run test
```


### Using `0.0.0.0` as Host

You may want to change the host in `server.js` and `webpack.config.js` from `localhost` to `0.0.0.0` to allow access from same WiFi network. This is not enabled by default because it is reported to cause problems on Windows. This may also be useful if you're using a VM.

#### Dependencies


* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)

### Resources

* [react-hot-loader on Github](https://github.com/gaearon/react-hot-loader)
