import React from 'react';

// components
import TradeTable from '../components/table/TradeTable';
import TradeTableHistory from '../components/table/TradeTableHistory';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './nodeDashboard.scss';
import '../components/layout/dialog.scss';

// lib
import AxiosInstance from '../axios/AxiosInstance';
import { encode as base64_encode } from 'base-64';


class NodeDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nodeName: this.props.nodeName,
            info: {},
            showDialog: false,
            dataUpload: "",
            dataValidation: {},
            indexTab: 0,
        };

        this.changeUploadedFile = this.changeUploadedFile.bind(this);
        this.loadNodeInfo = this.loadNodeInfo.bind(this);
        this.startProposal = this.startProposal.bind(this);

        this.loadNodeInfo();
    }

    a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            "aria-controls": `scrollable-auto-tabpanel-${index}`
        };
    }

    convertFileIntoBase64(text) {
        return base64_encode(text);;
    }

    convertFileIntoBase64andZip(text) {
        return new Promise((resolve, reject) => {
            let encodedFile = base64_encode(text);
            var JSZip = require("jszip");
            var zip = new JSZip();
            resolve(
                zip.file("ile", encodedFile, { binary: true })
            );
        });
    }

    async changeUploadedFile(e) {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {

            const text = (e.target.result)
            AxiosInstance({
                method: "post",
                url: `validateCDMJson`,
                data: this.convertFileIntoBase64(text)
            }).then((response) => {
                this.setState({ dataUpload: text })
                this.setState({ dataValidation: response.data })
                //console.log("validateCDMJson", response.data)
            }).catch((error) => {
                alert("Imported trade sent with error")
                console.log("Error into validateCDMJson ", error)
            })
        };
        reader.readAsText(e.target.files[0])
    }

    async startProposal() {
        //console.log("startProposal", this.state.dataUpload)
        let cdmFile = this.state.dataUpload;

        AxiosInstance({
            method: "post",
            url: `startFlowProposal/?nodeName=${this.state.nodeName}`,
            data: this.convertFileIntoBase64(cdmFile)
        }).then((response) => {
            //alert("Imported trade sent with success")
            //console.log("response startProposal: ", response)
        }).catch((error) => {
            alert("Imported trade sent with error")
            console.log("Error into startProposal ", error)
        })

        this.setState({
            showDialog: false,
            dataUpload: "",
            dataValidation: {}
        })
    }

    async loadNodeInfo() {
        AxiosInstance({
            url: `info?nodeName=${this.state.nodeName}`
        }).then((response) => {
            //console.log("response loadNodeInfo: ", response.data)
            this.setState({ info: response.data })
        }).catch((error) => {
            console.log("Error into loadNodeInfo ", error)
        })
    }

    render() {
        var thisVar = this;
        return (
            <React.Fragment>
                <div className="nodeDashboard"
                    style={{ height: "100%" }}>
                    <h2 className="titleStyle"
                        style={{ fontSize: "5vh" }}
                    >{this.state.nodeName} Dashboard</h2>
                    &nbsp;
                    <h1 className="titleStyle"
                        style={{
                            fontSize: "3vh",
                            margin: "10px 0px 50px 0px"
                        }}>
                        Name: <b>{this.state.info.name}</b>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                         City: <b>{this.state.info.city}</b>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                         Country: <b>{this.state.info.country}</b>
                    </h1>

                    <div className="nodeContent"
                        style={{
                            margin: "25px 25px 0px 25px"
                        }}>


                        {
                            (this.state.nodeName !== "Observer" && this.state.nodeName !== "Notary") && //then                                
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={(e) => { this.setState({ showDialog: true }) }}
                            >
                                Import CDM
                            </Button>
                        }

                        <div id="tabDiv"
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}>
                            <Tabs
                                value={this.state.indexTab}
                                variant="scrollable"
                                onChange={(event, valueTab) => { this.setState({ indexTab: valueTab }) }}
                                TabIndicatorProps={{
                                    style: {
                                        background: 'green'
                                    }
                                }}>
                                <Tab label="Trades"
                                    style={{
                                        color: "green"
                                    }}
                                />
                                <Tab label="Event History"
                                    style={{
                                        color: "green"
                                    }}
                                />
                            </Tabs>
                        </div>

                        <Dialog className="dialogClass"
                            open={this.state.showDialog}
                            onClose={(e) => {
                                this.setState({
                                    showDialog: false,
                                    dataUpload: "",
                                    dataValidation: {}
                                })
                            }}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="dialogTitleId">
                                <div id="dialogTitleDivId">
                                    <h2 className="dialogTitle">
                                        Import CDM - {this.state.nodeName}
                                    </h2>
                                </div>
                            </DialogTitle>

                            <div className="dialogContent">
                                <input
                                    type="file"
                                    name="file"
                                    style={{
                                        width: "400px"
                                    }}
                                    onChange={(e) => {
                                        thisVar.changeUploadedFile(e)
                                    }} />
                                &nbsp;
                                <TextField
                                    id="outlined-number"
                                    label="CounterParty"
                                    value={this.state.dataValidation.optionalInfo || ''}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    variant="filled"
                                />
                                <label style={{
                                    color: this.state.dataValidation.jsonValidated ? "green" : "red"
                                }}>
                                    {this.state.dataValidation.jsonValidationMessage}
                                </label>
                                &nbsp;
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={(e) => { thisVar.startProposal() }}
                                    disabled={!this.state.dataUpload || !this.state.dataValidation.jsonValidated}
                                >
                                    Send
                                </Button>
                            </div>
                        </Dialog>

                        {thisVar.state.indexTab === 0 &&
                            <div id="tradeContent">
                                <TradeTable nodeName={this.state.nodeName} />
                            </div>
                        }
                        {thisVar.state.indexTab === 1 &&
                            <div id="tradeHistory">
                                <TradeTableHistory nodeName={this.state.nodeName} />
                            </div>}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NodeDashboard;
