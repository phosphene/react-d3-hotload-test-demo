import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = { counter: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
          <div>
            <h2>My wonderful Counter: {this.state.counter}</h2>
            <h2>My arbitray number {this.store.numClicks}</h2>
            <h2>My arbitray string {this.store.mumble}</h2>


          </div>
   );
  }
}
