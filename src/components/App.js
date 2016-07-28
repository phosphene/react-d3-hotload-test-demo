import React, { Component, PropTypes } from 'react';
import Layout from './Layout';
import Counter from './Counter';
import { observer } from 'mobx-react';
import MyChart from "./wraps/MyChart";
import MyCustomChartWrapper from "./wraps/MyCustomChartWrapper";
import AScatterPlotTourChartWrapper from "./wraps/AScatterPlotTourChartWrapper";
import ReactBubbleChart from "./wraps/ReactBubbleChart";
import BarSingleSelectWrapper from "./wraps/BarSingleSelectWrapper";

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
       <div id='test'>
            <BarSingleSelectWrapper store={this.props.appState}/>
       </div>
      </Layout>
    );
  }


}

App.propTypes = {
    store: PropTypes.object
}

export default App
