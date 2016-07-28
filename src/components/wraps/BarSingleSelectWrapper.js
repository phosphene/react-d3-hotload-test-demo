import BarSingleSelectDC from '../charts/BarSingleSelectDC';
import React, {PropTypes}              from 'react';
import ReactDOM           from 'react-dom';
import { observer } from 'mobx-react';


@observer
class BarSingleSelectWrapper extends React.Component {
    constructor(props) {
        super(props);
        console.log({props});

        this.store = this.props.store;
        this.data = this.props.store.experiments;

        // define the method this way so that we have a clear reference to it
        // this is necessary so that window.removeEventListener will work properly
        this.handleResize = (e => this._handleResize(e));
    }

    /** Render town */
    render() {
        return (
                <div className="chartname">
                <a className="reset" href="javascript:chart.filter(null).redrawGroup()"></a>
                </div>
        );

    }

    /** When we mount, intialize resize handler and create theChart */
    componentDidMount() {
        //window.addEventListener('resize', this.handleResize);
        this.chart = new BarSingleSelectDC(this.getDOMNode(), this.getChartState());
    }

    /** When we update, update our friend, the bubble chart */
    componentDidUpdate() {
        this.chart.update(this.getDOMNode(), this.getChartState());
    }

    /** Define what props get passed down to the d3 chart */
    getChartState(experiments) {
        return {
            data: this.data
        }
    }

    /** When we're piecing out, remove the handler and destroy the chart */
    componentWillUnmount() {
        //this.chart.destroy(this.getDOMNode());
    }

    /** Helper method to reference this dom node */
    getDOMNode() {
        return ReactDOM.findDOMNode(this);
    }

    /** On a debounce, adjust the size of our graph area and then update the chart */
    _handleResize(e) {
        this.__resizeTimeout && clearTimeout(this.__resizeTimeout);
        this.__resizeTimeout = setTimeout(() => {
            delete this.__resizeTimeout;
        }, 200);
    }
}

BarSingleSelectWrapper.propTypes = {
    store: PropTypes.object
}



export default BarSingleSelectWrapper;
