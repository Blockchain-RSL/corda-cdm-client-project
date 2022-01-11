import React, { Component } from 'react';

// components
import Button from "react-bootstrap/Button";
import CdmInfoDialog from "../dialog/CdmInfoDialog";

// css
import '../layout/dialog.scss';
import '../layout/icon.scss';

class BtnCdmInfo extends Component {

    constructor(props) {
        super(props);
        //console.log(cdmJson);
        this.cdmJson = Buffer.from(this.props.cdmJsonBase64, "base64").toString(); 
        this.cdmDTO = this.props.cdmDTO;
        this.enableToModifyProposal = this.props.enableToModifyProposal;

        this.state = {
            showDialog: false
        }
    }

    closeDialog = () => {
        this.setState({showDialog : false})
    }

    render() {
        return (
            <React.Fragment>
                <div className="btnDiv">
                    <Button
                        variant="outline-primary"
                        onClick={() => this.setState({
                            showDialog: true
                        })}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: "bold",
                            margin: "0px 0px 4px 0px"
                        }}>
                        Info
                    </Button>
                </div>
                {
                    this.state.showDialog &&
                        <CdmInfoDialog 
                            closeDialog = {this.closeDialog}
                            cdmJson = {this.cdmJson}
                            cdmDTO = {this.cdmDTO}
                            enableToModifyProposal = {this.enableToModifyProposal}/>
                }
            </React.Fragment>
        )
    }
}

export default BtnCdmInfo;

