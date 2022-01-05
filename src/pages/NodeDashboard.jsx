import React from 'react';

// components
import TradeTable from '../components/table/TradeTable';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './nodeDashboard.scss';

// lib
import AxiosInstance from '../axios/AxiosInstance';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

class NodeDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nodeName: this.props.nodeName,
            info: [],
            showDialog: false,
            dataUpload: ""
        }; 

        this.changeUploadedFile = this.changeUploadedFile.bind(this);
        this.loadNodeInfo = this.loadNodeInfo.bind(this);
        this.startProposal = this.startProposal.bind(this);

        this.loadNodeInfo();
    }

    convertFileIntoBase64(cdmFile) {
        return base64_encode(cdmFile);;
    }
    convertFileIntoBase64andZip(cdmFile) {
        return new Promise((resolve, reject) => {    
            let encodedCdmFile = base64_encode(cdmFile);
            console.log("encodedCdmFile : ", encodedCdmFile);
            var JSZip = require("jszip");
            var zip = new JSZip();
            resolve(
                zip.file("cdmFile", encodedCdmFile, {binary:true})
            );
            /*zip.generateAsync({ type: 'blob' }).then(binaryData => {
                resolve(binaryData);
            });*/
        });
    }

    async changeUploadedFile (e) {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
          this.setState({dataUpload : text})
        };
        reader.readAsText(e.target.files[0])
    }

    async startProposal() {
        console.log("startProposal", this.state.dataUpload)
        let cdmFile = this.state.dataUpload;

        AxiosInstance({
            method:"post",
            url:`startFlowProposal/?nodeName=${this.state.nodeName}`,
            data: this.convertFileIntoBase64(cdmFile)
        }).then((response) => {
            alert("Imported trade sent with success")
            console.log("response startProposal: ", response)
        }).catch((error) => {
            alert("Imported trade sent with error")
            console.log("Error into startProposal ", error)
        })

        this.setState({showDialog : false})
    }
    /*
    async startProposal() {
        AxiosInstance({
            method:"post",
            url:`startFlowProposal/?nodeName=${this.state.nodeName}&proposee=PartyB&instrumentType=TestInstrumentType&instrument=TestInstrumetn&quantity=10&price=0&currency=EUR&market=EUROPA`
        }).then((response) => {
            console.log("response startProposal: ", response)
        }).catch((error) => {
            console.log("Error into startProposal ", error)
        })
    }
    */

    async loadNodeInfo() {
        AxiosInstance({
            url:`info?nodeName=${this.state.nodeName}`
        }).then((response) => {
            //console.log("response loadNodeInfo: ", response.data)
            this.setState({info: response.data})
        }).catch((error) => {
            console.log("Error into loadNodeInfo ", error)
        })
    }

    render() {
        var thisVar = this;
        return (
            <React.Fragment>
                <div className="nodeDashboard"
                    style={{height:"100%"}}>
                    <h2 className="titleStyle"
                        style={{fontSize: "5vh"}}
                        >Node {this.state.nodeName} Dashboard</h2>
                    &nbsp;
                    <h1 className="titleStyle"
                        style={{
                            fontSize: "3vh"}}>
                        {this.state.info}
                    </h1>
                    <div className="nodeContent"
                        style={{
                            margin : "75px 25px 0px 25px"
                        }}>
                        
                        {
                            (this.state.nodeName !== "Observer" && this.state.nodeName !== "Notary") && //then                                
                                <Button 
                                    variant= "outlined"
                                    color = "success"
                                    onClick={(e) => { this.setState({showDialog: true})}}
                                >
                                    Import Trade
                                </Button>
                                /*
                                <div style = {{display:"flex"}}>
                                <input type="file" name="file" onChange={this.startProposal} />
                                <Button 
                                    //as="input" type="button"
                                    variant="outline-dark" 
                                    size="lg"
                                    onClick={this.startProposal}
                                    >
                                    Import Trade
                                </Button>
                                </div>
                                */
                        }

                        <Dialog className="dialogClass"
                            open={this.state.showDialog}
                            onClose={(e) => { 
                                this.setState({showDialog: false, dataUpload: ""
                            }) }}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="dialogTitleId">
                                <div id = "dialogTitleDivId">
                                    <h2 className="dialogTitle"> 
                                        IMPORT TRADE {this.state.nodeName}
                                    </h2>
                                </div>
                            </DialogTitle>
                            <input 
                                type="file" 
                                name="file" 
                                style={{ 
                                    width: "400px",
                                    margin: "0px 25px 0px 25px"
                                }} 
                                onChange={(e) => {
                                    thisVar.changeUploadedFile(e)}} />
                            &nbsp;

                            <Button 
                                variant="contained"
                                color = "success"
                                onClick={(e) => { thisVar.startProposal()}}
                                disabled = {!this.state.dataUpload}style={{
                                    margin: "0px 25px 25px 25px"
                                }} 
                            >
                                Send
                            </Button>
                        </Dialog>
                        
                        <TradeTable nodeName={this.state.nodeName} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NodeDashboard;
