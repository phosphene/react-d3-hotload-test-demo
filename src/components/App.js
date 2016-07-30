import React, { Component, PropTypes } from 'react';
import Layout from './Layout';
import Counter from './Counter';
import { observer } from 'mobx-react';
import BarSingleSelectWrapper from "./wraps/BarSingleSelectWrapper";
import HeatMapFilteringWrapper from "./wraps/HeatMapFilteringWrapper";
import BarSingleinOne from "./charts/BarSingleinOne";
// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
@observer
class App extends Component {
  render() {
    return (
      <Layout>
       <Counter store={this.props.appState}/>
       //<HeatMapFilteringWrapper/>
          <BarSingleinOne/>
      </Layout>
    );
  }


}

App.propTypes = {
    store: PropTypes.object
}

export default App
