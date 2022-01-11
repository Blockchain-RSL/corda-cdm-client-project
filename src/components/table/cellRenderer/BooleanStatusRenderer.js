import React, { Component } from 'react';

// css
import "./icon.scss"

// resource
import greenStatus from '../../../resources/greenStatus.png';
import redStatus from '../../../resources/redStatus.png';

class BooleanStatusRenderer extends Component {
    constructor(props) {
        super(props);

        this.status = this.props.status;
    }

    render() {
        if (this.status) {
            return (
                <React.Fragment>
                    <img
                        className="statusIcon"
                        src={greenStatus}
                        alt="greenStatus" />
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <img
                        className="statusIcon"
                        src={redStatus}
                        alt="redStatus" />
                </React.Fragment>
            )
        }
    }
}

export default BooleanStatusRenderer;

