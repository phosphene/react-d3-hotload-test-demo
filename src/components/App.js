import React, { Component, PropTypes } from 'react';
import Layout from './Layout';
import ThrashWrapper from "./wraps/ThrashWrapper";
class App extends Component {
  render() {
    return (
      <Layout>
        <ThrashWrapper/>
      </Layout>
    );
  }


}
//this is a style that we will probably use, but is not important now
App.propTypes = {
    store: PropTypes.object
}

export default App
