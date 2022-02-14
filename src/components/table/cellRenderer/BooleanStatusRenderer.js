import React, { useState } from 'react';

// css
import "./icon.scss"

// resource
import greenStatus from '../../../resources/greenStatus.png';
import redStatus from '../../../resources/redStatus.png';

function BooleanStatusRenderer(props) {
    
    const status = props.status;
    
    if (status) {
        return (
            <React.Fragment>
                <img
                    className="statusIcon"
                    src={greenStatus}
                    alt="greenStatus" />
            </React.Fragment>
        );
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

export default BooleanStatusRenderer;

