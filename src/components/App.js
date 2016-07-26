import React, { Component } from 'react';
import Layout from './Layout';
import Counter from './Counter';

import MyChart from "./wraps/MyChart";
import MyCustomChartWrapper from "./wraps/MyCustomChartWrapper";
import AScatterPlotTourChartWrapper from "./wraps/AScatterPlotTourChartWrapper";
import ReactBubbleChart from "./wraps/ReactBubbleChart";

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {
  render() {
    return (
      <Layout>
       <Counter/>
            <MyChart/>
            <ReactBubbleChart/>
      </Layout>
    );
  }
}
