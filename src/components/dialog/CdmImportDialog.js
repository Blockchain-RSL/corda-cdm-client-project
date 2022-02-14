import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//lib
import AxiosInstance from '../../axios/AxiosInstance';
import { encode as base64_encode } from 'base-64';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../components/layout/dialog.scss';

class CdmImportDialog extends React.Component{

    constructor(props) {
        super(props);

        this.handleShowDialog = this.props.handleShowDialog;

        this.state = {
            nodeName: this.props.nodeName,
            dataUpload: "",
            dataValidation: {},
        };

        this.changeUploadedFile = this.changeUploadedFile.bind(this);
        this.startProposal = this.startProposal.bind(this);
        this.handleShowDialog = this.handleShowDialog.bind(this);
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
                console.log("validateCDMJson", this.state.dataValidation)
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
            dataUpload: "",
            dataValidation: {}
        })

        this.handleShowDialog();
    }

    render() {
        var thisVar = this;
        return (
            <Dialog className="dialogClass"
                open={true}
                onClose={(e) => {this.props.handleShowDialog()}}
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
                    <input className="dialogContentInput"
                        type="file"
                        name="file"
                        onChange={(e) => {thisVar.changeUploadedFile(e)}} 
                    />
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
        );
    }
}

export default CdmImportDialog;