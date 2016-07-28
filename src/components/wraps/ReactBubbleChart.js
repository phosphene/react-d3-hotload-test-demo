import ReactBubbleChartD3 from '../charts/ReactBubbleChartD3';
import React              from 'react';
import ReactDOM           from 'react-dom';

class ReactBubbleChart extends React.Component {
  constructor(props) {
    super(props);
    // define the method this way so that we have a clear reference to it
    // this is necessary so that window.removeEventListener will work properly
    this.handleResize = (e => this._handleResize(e));
  }

  /** Render town */
  render() {
    return <div className={"chart-container " + this.props.className}></div>;
  }

  /** When we mount, intialize resize handler and create the bubbleChart */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.bubbleChart = new ReactBubbleChartD3(this.getDOMNode(), this.getChartState());
  }

  /** When we update, update our friend, the bubble chart */
  componentDidUpdate() {
    this.bubbleChart.update(this.getDOMNode(), this.getChartState());
  }

  /** Define what props get passed down to the d3 chart */
  getChartState() {
    return {
      data: this.props.data,
      colorLegend: this.props.colorLegend,
      fixedDomain: this.props.fixedDomain,
      selectedColor: this.props.selectedColor,
      selectedTextColor: this.props.selectedTextColor,
      onClick: (this.props.onClick || (() => {})),
      smallDiameter: this.props.smallDiameter,
      mediumDiameter: this.props.mediumDiameter,
      legendSpacing: this.props.legendSpacing,
      legend: this.props.legend,
      tooltip: this.props.tooltip,
      tooltipProps: this.props.tooltipProps,
      tooltipFunc: this.props.tooltipFunc,
      fontSizeFactor: this.props.fontSizeFactor,
      duration: this.props.duration,
      delay: this.props.delay
    }
  }

  /** When we're piecing out, remove the handler and destroy the chart */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.bubbleChart.destroy(this.getDOMNode());
  }

  /** Helper method to reference this dom node */
  getDOMNode() {
    return ReactDOM.findDOMNode(this);
  }

  /** On a debounce, adjust the size of our graph area and then update the chart */
  _handleResize(e) {
    this.__resizeTimeout && clearTimeout(this.__resizeTimeout);
    this.__resizeTimeout = setTimeout(() => {
      this.bubbleChart.adjustSize(this.getDOMNode());
      this.bubbleChart.update(this.getDOMNode(), this.getChartState());
      delete this.__resizeTimeout;
    }, 200);
  }
}

export default ReactBubbleChart;
