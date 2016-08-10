import React, { Component, PropTypes } from 'react';
import Layout from './Layout';
import NasDashWrapper from "./wraps/NasDashWrapper";
//we are only using observer in the counter not in the charts currently
//observer is from the mobx library
//we can discuss it when we need it.
class App extends Component {
  render() {
    return (
      <Layout>
        <NasDashWrapper/>
      </Layout>
    );
  }


}
//this is a style that we will probably use, but is not important now
App.propTypes = {
    store: PropTypes.object
}

export default App
