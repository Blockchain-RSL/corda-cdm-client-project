import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import TradeStatesConstants from '../constants/TradeStatesConstants';

import AxiosInstance from "../../axios/AxiosInstance";

//css
import "./btnCdmAction.scss"

class BtnCdmAction extends Component {
    constructor(props) {
        super(props);

        this.acceptFunction = this.props.acceptFunction;
        this.rejectFunction = this.props.rejectFunction;
        this.tradeStatus = this.props.tradeStatus;
        this.cdmDTO = this.props.cdmDTO;
        

        this.state = {
            showActionButton: true
        }

        this.acceptFunction = this.acceptFunction.bind(this);
        this.rejectFunction = this.rejectFunction.bind(this);
        this.modificationFunction = this.modificationFunction.bind(this);
    }

    async modificationFunction() {
        let linearId, quantity, price;
        linearId = this.cdmDTO.linearId;
        quantity = this.cdmDTO.quantity;
        price = this.cdmDTO.price;

        AxiosInstance({
            method: 'post',
            url: `startFlowModificationProposal?nodeName=${this.cdmDTO.proposer}&quantity=${quantity}&price=${price}&proposalId=${linearId}`
        }).then((response) => {
            //console.log("Response of acceptFunction ", response )
            //alert("Modification trade event sent with success")
        }).catch((error) => {
            console.log("Error into modificationFunction ", error)
            alert("Modification trade event sent with error ", error)
        })
    }

    render() {
        if ((this.tradeStatus === TradeStatesConstants.INCOMING.name 
            || this.tradeStatus === TradeStatesConstants.INCOMING_COUNTERPROPOSAL.name)
            && this.state.showActionButton) {
            return (
                <React.Fragment>
                    <div className="btnDiv">
                        <Button
                            variant="success"
                            onClick={() => {
                                this.setState({ showActionButton: false })
                                if(this.tradeStatus === TradeStatesConstants.INCOMING.name) {
                                    this.acceptFunction(this.cdmDTO.linearId);
                                } else if(this.tradeStatus === TradeStatesConstants.INCOMING_COUNTERPROPOSAL.name) {
                                    this.modificationFunction();
                                }
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
                        <Button className="actionButton"
                            variant="danger"
                            onClick={() => {
                                this.setState({ showActionButton: false })
                                this.rejectFunction(this.cdmDTO.linearId)
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

