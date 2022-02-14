import React, { useState } from 'react';

// components
import Button from "react-bootstrap/Button";
import CdmInfoDialog from "../dialog/CdmInfoDialog";

// css
import '../layout/dialog.scss';
import '../layout/icon.scss';

function BtnCdmInfo(props) {

    //console.log(cdmJson);
    const cdmJson = Buffer.from(props.cdmJsonBase64, "base64").toString(); 
    const cdmDTO = props.cdmDTO;
    const nodeName = props.nodeName;
    const tradeStatus = props.tradeStatus;

    const [showDialog, setShowDialog] = useState(false);
        
    const closeDialog = () => {
        setShowDialog(false);
    }

    return (
        <React.Fragment>
            <div className="btnDiv">
                <Button
                    variant="outline-primary"
                    onClick={() => { setShowDialog(true) }}
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
                showDialog &&
                    <CdmInfoDialog 
                        closeDialog = {closeDialog}
                        cdmJson = {cdmJson}
                        cdmDTO = {cdmDTO}
                        nodeName = {nodeName}
                        tradeStatus = {tradeStatus}/>
            }
        </React.Fragment>
    );
}

export default BtnCdmInfo;

