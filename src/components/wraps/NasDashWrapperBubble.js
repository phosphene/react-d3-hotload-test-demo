import NasDashDC from '../charts/NasDashDC';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';


class NasDashWrapper extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const aStyle = { display: 'none', cursor: 'pointer'};
    const pStyle = { marginRight: "15px"};

    const clickReset = (x) => {
      console.log(x);
      this.dashboard.resetChart(x);
    }


    return (
      <div>
        <h2>Nasdaq 100 Index 1985/11/01-2012/06/29</h2>
        <div className="row">
          <div id="yearly-bubble-chart" className="dc-chart">
            <strong>Yearly Performance</strong> (radius: fluctuation/index ratio, color: gain/loss)
            <a className="reset" onClick={()=>clickReset("yearly-bubble-chart")} style={aStyle}>reset</a>
            <div className="clearfix"></div>
          </div>
        </div>
     </div>
    );

  }


  componentDidMount() {
    this.dashboard = new NasDashDC();
    this.dashboard.render();

  }

  componentDidUpdate() {
    //   this.chart.update();
  }

  componentWillUnmount() {
    // this.dashboard.destroy();
  }

}

export default NasDashWrapper;
