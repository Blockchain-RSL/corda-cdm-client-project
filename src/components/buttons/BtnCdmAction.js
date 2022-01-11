import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import TradeStatesConstants from '../constants/TradeStatesConstants';

class BtnCdmAction extends Component {
    constructor(props) {
        super(props);

        this.acceptFunction = this.props.acceptFunction;
        this.rejectFunction = this.props.rejectFunction;
        this.tradeStatus = this.props.tradeStatus;
        this.linearId = this.props.linearId;

        this.state = {
            showActionButton: true
        }

        this.acceptFunction = this.acceptFunction.bind(this);
        this.rejectFunction = this.rejectFunction.bind(this);
    }

    render() {
        if (this.props.tradeStatus === TradeStatesConstants.INCOMING.name
            && this.state.showActionButton) {
            return (
                <React.Fragment>
                    <div className="btnDiv">
                        <Button
                            variant="success"
                            onClick={() => {
                                this.setState({ showActionButton: false })
                                this.acceptFunction(this.props.linearId)
                            }
                            }
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                colorBackground: "green",
                                fontWeight: "bold",
                                margin: "0px 0px 4px 0px"
                            }}>
                            Accept
                        </Button>
                        &nbsp;
                        <Button
                            variant="danger"
                            onClick={() => {
                                this.setState({ showActionButton: false })
                                this.rejectFunction(this.props.linearId)
                            }
                            }
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                colorBackground: "red",
                                fontWeight: "bold",
                                margin: "0px 0px 4px 0px"
                            }}>
                            Reject
                        </Button>
                        &nbsp;
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment />
            )
        }
    }
}

export default BtnCdmAction;

