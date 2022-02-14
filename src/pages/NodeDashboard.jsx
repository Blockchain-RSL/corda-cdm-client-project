import React from 'react';

// components
import TradeTable from '../components/table/TradeTable';
import TradeTableHistory from '../components/table/TradeTableHistory';
import CdmImportDialog from '../components/dialog/CdmImportDialog';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './nodeDashboard.scss';

// lib
import AxiosInstance from '../axios/AxiosInstance';

class NodeDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nodeName: this.props.nodeName,
            info: {},
            showDialog: false,
            indexTab: 0,
        };

        this.loadNodeInfo = this.loadNodeInfo.bind(this);
        this.handleShowDialog = this.handleShowDialog.bind(this);

        this.loadNodeInfo();
    }

    a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            "aria-controls": `scrollable-auto-tabpanel-${index}`
        };
    }

    // handles the flag to show import CDM dialog
    handleShowDialog = () => {
        this.setState({showDialog: false});
        console.log("showDialog nodeDashboard " + this.state.showDialog);
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
                <div className="nodeDashboard">
                    <h2 className="titleStyle">{this.state.nodeName} Dashboard</h2>
                    &nbsp;
                    <h1 className="titleStyleNode">
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

                    <div className="nodeContent">
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

                        <div className="tabDiv" id="tabDiv">
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

                        {this.state.showDialog &&
                            <CdmImportDialog
                                handleShowDialog={this.handleShowDialog}
                                nodeName={this.state.nodeName}
                            />
                        }

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
