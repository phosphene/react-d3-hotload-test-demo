import React, { Component, PropTypes } from 'react';
import Layout from './Layout';
import Counter from './Counter';
import { observer } from 'mobx-react';
import BarSingleSelectWrapper from "./wraps/BarSingleSelectWrapper";
import HeatMapFilteringWrapper from "./wraps/HeatMapFilteringWrapper";
import VcExampleWrapper from "./wraps/VcExampleWrapper";
//we are only using observer in the counter not in the charts currently
//observer is from the mobx library
//we can discuss it when we need it.
@observer
class App extends Component {
  render() {
    return (
      <Layout>
       <Counter store={this.props.appState}/>
        <VcExampleWrapper/>
      </Layout>
    );
  }


}
//this is a style that we will probably use, but is not important now
App.propTypes = {
    store: PropTypes.object
}

export default App
