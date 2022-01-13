import React, { Component } from 'react';

// components
import Button from "react-bootstrap/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';

// css
import '../layout/dialog.scss';
import '../layout/icon.scss';

// lib
import JSONPretty from 'react-json-pretty';
import AxiosInstance from "../../axios/AxiosInstance";

// resources
import downloadIcon from '../../resources/download_icon.png';

class CdmInfoDialog extends Component {
    constructor(props) {
        super(props);

        this.closeDialog = this.props.closeDialog;
        this.cdmJson = this.props.cdmJson;
        this.cdmDTO = this.props.cdmDTO;
        this.enableToModifyProposal = this.props.enableToModifyProposal;

        this.state = {
            indexTab: 0,
            price: this.props.cdmDTO.price,
            quantity: this.props.cdmDTO.quantity
        }

        this.closeDialog = this.props.closeDialog;

        this.modificationFunction = this.modificationFunction.bind(this);
    }

    downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([this.cdmJson], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "cdm.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    async modificationFunction() {
        let linearId, quantity, price;
        linearId = this.cdmDTO.linearId;
        quantity = this.state.quantity;
        price = this.state.price;

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

        this.closeDialog();
    }

    render() {
        return (
            <Dialog className="dialogClass"
                fullWidth
                maxWidth="100%"
                open={true}
                onClose={this.closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="dialogTitleId">
                    <div id="dialogTitleDivId">
                        <h2 className="dialogTitle">
                            CDM Info
                        </h2>
                    </div>
                </DialogTitle>

                <div id="dialogContent">
                    <div id="tabDiv" style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex'
                    }}>
                        <Tabs
                            value={this.state.indexTab}
                            variant="scrollable"
                            scrollButtons="auto"
                            onChange={(event, valueTab) => { this.setState({ indexTab: valueTab }) }}
                            TabIndicatorProps={{
                                style: {
                                    background: 'green'
                                }
                            }
                            }
                            style={{
                                margin: "0px 25px 0px 25px"
                            }}>
                            <Tab label="Product"
                                style={{
                                    color: "green"
                                }}
                            />
                            <Tab label="Party & Details"
                                style={{
                                    color: "green"
                                }}
                            />
                            <Tab label="CDM JSON"
                                style={{
                                    color: "green"
                                }}
                            />
                        </Tabs>
                    </div>

                    {this.state.indexTab === 0 &&
                        <div id="cdmDetailTab"
                            style={{
                                padding: "25px 25px 25px 25px",
                            }}
                        >
                            <TextField
                                style={{
                                    margin: "20px 0px 20px 0px",
                                }}
                                id="outlined-Instrument"
                                label="Instrument"
                                value={this.cdmDTO.instrument || ''}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="filled"
                                fullWidth
                            />
                            <TextField
                                style={{
                                    margin: "20px 0px 20px 0px",
                                }}
                                id="outlined-InstrumentType"
                                label="InstrumentType"
                                value={this.cdmDTO.instrumentType || ''}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="filled"
                                fullWidth
                            />
                            <TextField
                                style={{
                                    margin: "20px 0px 20px 0px",
                                }}
                                id="outlined-Price"
                                label="Price"
                                value={this.state.price}
                                onChange={(e) => this.setState({ price: e.target.value })}
                                InputProps={{
                                    readOnly: !this.enableToModifyProposal
                                }}
                                variant={!this.enableToModifyProposal ? "filled" : "standard"}
                                fullWidth
                            />
                            <TextField
                                style={{
                                    margin: "20px 0px 20px 0px",
                                }}
                                id="outlined-Quantity"
                                label="Quantity"
                                value={this.state.quantity}
                                onChange={(e) => this.setState({ quantity: e.target.value })}
                                InputProps={{
                                    readOnly: !this.enableToModifyProposal
                                }}
                                variant={!this.enableToModifyProposal ? "filled" : "standard"}
                                fullWidth
                            />
                            <TextField
                                style={{
                                    margin: "20px 0px 20px 0px",
                                }}
                                id="outlined-Currency"
                                label="Currency"
                                value={this.cdmDTO.currency || ''}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="filled"
                                fullWidth
                            />
                            <TextField
                                style={{
                                    margin: "20px 0px 20px 0px",
                                }}
                                id="outlined-Market"
                                label="Market"
                                value={this.cdmDTO.market || ''}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="filled"
                                fullWidth
                            />
                        </div>
                    }

                    {this.state.indexTab === 1 &&
                        <div id="cdmDetailTab"
                            style={{
                                padding: "25px 25px 25px 25px",
                            }}
                        >
                            <TextField
                                style={{
                                    margin: "20px 0px 20px 0px",
                                }}
                                id="outlined-PartyFrom"
                                label="From"
                                value={this.cdmDTO.proposer || ''}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="filled"
                                fullWidth
                            />
                            <TextField
                                style={{
                                    margin: "20px 0px 20px 0px",
                                }}
                                id="outlined-PartyTo"
                                label="PartyTo"
                                value={this.cdmDTO.proposee || ''}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="filled"
                                fullWidth
                            />
                            <TextField
                                style={{
                                    margin: "20px 0px 20px 0px",
                                }}
                                id="outlined-linearId"
                                label="linearId"
                                value={this.cdmDTO.linearId || ''}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="filled"
                                fullWidth
                            />
                            <TextField
                                style={{
                                    margin: "20px 0px 20px 0px",
                                }}
                                id="outlined-contractualDefinition"
                                label="Contractual definition"
                                value={this.cdmDTO.contractualDefinition || ''}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="filled"
                                fullWidth
                            />
                            <TextField
                                style={{
                                    margin: "20px 0px 20px 0px",
                                }}
                                id="outlined-masterAgreement"
                                label="Master Agreement"
                                value={this.cdmDTO.masterAgreement || ''}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="filled"
                                fullWidth
                            />
                        </div>
                    }

                    {this.state.indexTab === 2 &&
                        <div id="cdmJsonTab"
                            style={{
                                margin: "25px 25px 25px 25px",
                            }}>
                            <img
                                className="downloadIcon"
                                style={{
                                    margin: "0px 0px 25px 0px",
                                }}
                                src={downloadIcon}
                                alt="downloadIcon"
                                onClick={() => this.downloadTxtFile()}
                            />
                            &nbsp;
                            <div id="jsonContent"
                                style={{
                                    border: "1px solid",
                                    borderRadius: "25px"
                                }}>
                                <JSONPretty
                                    id="json-pretty"
                                    mainStyle="padding: 25px 25px 25px 25px"
                                    data={this.cdmJson}>
                                </JSONPretty>
                            </div>
                        </div>
                    }

                    <div id="bottomButton"
                        style={{
                            display: "flex",
                            alignItems: 'right',
                            justifyContent: 'right',
                            fontWeight: "bold",
                            margin: "0px 25px 25px 25px"
                        }}
                    >
                        <Button
                            variant="danger"
                            onClick={this.closeDialog}
                        >
                            Cancel
                        </Button >
                        &nbsp;
                        <Button
                            variant="success"
                            onClick={this.modificationFunction}
                            disabled={
                                this.cdmDTO.price == this.state.price &&
                                this.cdmDTO.quantity == this.state.quantity
                            }>
                            Update
                        </Button>
                    </div>

                </div>
            </Dialog>
        );
    }
}


export default CdmInfoDialog;