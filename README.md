react-d3-hotload-test-demo
=====================

A dev environment for live-editing React components, focused on d3 development and informed by tests.

Currently, the head of the master branch has been cleaned up and only dc.js examples exist in it.

You will note the use of Es2015 or Es6 with such syntactic sugar as:

[arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

And we even have ES7 features in the use of [mobx](https://github.com/mobxjs/mobx)

mobx is currently only there as a demo and is only used in the counter.

the dc.js should be self explanatory. Check the comments in the sinlgebar example.


### Usage


    $ npm install

Should install your packages. You will need a relatively current npm and Node.js.

Current npm version is 3.10.5 and current node is v6.2.2


     $ npm start

     open http://localhost:3000

Now edit `src/components/MyChart.js`.

Your changes will appear without reloading the browser

### Linting

React-friendly ESLint configuration.

```
npm run lint
```

### Test

Enzyme Jasmine testing

[enzyme](https://github.com/airbnb/enzyme)

currently Jasmine startup is extremely slowwwwww. I'll have to look at that.

```
npm run test
```


### Using `0.0.0.0` as Host

You may want to change the host in `server.js` and `webpack.config.js` from `localhost` to `0.0.0.0` to allow access from same WiFi network. This is not enabled by default because it is reported to cause problems on Windows. This may also be useful if you're using a VM.

#### Dependencies

* [d3act](https://github.com/AnSavvides/d3act)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)

### Resources

* [react-hot-loader on Github](https://github.com/gaearon/react-hot-loader)
