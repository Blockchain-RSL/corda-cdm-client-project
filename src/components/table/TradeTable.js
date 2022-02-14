import React from 'react';

// components
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import BtnCdmAction from '../buttons/BtnCdmAction.js';
import BtnCdmInfo from '../buttons/BtnCdmInfo.js';
import SockJsClient from 'react-stomp';

// axios
import AxiosInstance from "../../axios/AxiosInstance";

// css
import "./tradeTable.scss";

// constants
import TradeStatesConstants from '../constants/TradeStatesConstants.js';

//const SOCKET_URL = 'http://188.11.100.59:50001/ws-message';
const SOCKET_URL = 'http://localhost:8080/ws-message';

class TradeTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nodeName: props.nodeName,
      nodeOrganisation: "",
      country: "",
      region: "",
      jsonData: "",
      data: []
    };

    this.acceptFunction = this.acceptFunction.bind(this);
    this.rejectFunction = this.rejectFunction.bind(this);
    this.loadTradeData = this.loadTradeData.bind(this);

    this.loadTradeData();
  }

  async loadTradeData() {
    AxiosInstance({
      url: `statesDetail?nodeName=${this.state.nodeName}`
    }).then((response) => {
      //console.log("response: ", response.data)
      this.setState({ data: response.data })
    }).catch((error) => {
      console.log("Error into loadTradeData ", error)
      this.setState({ data: [] })
    })
  }

  // http call that starts the acceptFlow on corda node
  async acceptFunction(linearId) {
    AxiosInstance({
      method: 'post',
      url: `startFlowAcceptProposal?nodeName=${this.state.nodeName}&proposalId=${linearId}`
    }).then((response) => {
      //console.log("Response of acceptFunction ", response )
      //alert("Accepted trade event sent with success")
    }).catch((error) => {
      console.log("Error into acceptFunction ", error)
    })
  }

  // http call that starts the rejectFlow on corda node
  async rejectFunction(linearId) {
    AxiosInstance({
      method: 'post',
      url: `startFlowRejectProposal?nodeName=${this.state.nodeName}&proposalId=${linearId}`
    }).then((response) => {
      //console.log("Response of rejectFunction ", response )
      //alert("Rejected trade event sent with success")
    }).catch((error) => {
      console.log("Error into rejectFunction ", error)
    })
  }

  isObserverOrNotary = () => (this.state.nodeName === "Observer" || this.state.nodeName === "Notary")

  render() {
    var thisVar = this;

    const gridOptions = {

      columnDefs: [
        {
          headerName: 'InstrumentType',
          field: 'instrumentType',
          width: 200,
          minWidth: 200,
          suppressSizeToFit: false
        },
        {
          headerName: 'Instrument',
          field: 'instrument',
          width: 150,
          minWidth: 150,
          suppressSizeToFit: false
        },
        {
          headerName: 'Quantity',
          field: 'quantity',
          width: 150,
          minWidth: 150,
          suppressSizeToFit: false
        },
        {
          headerName: 'Price',
          field: 'price',
          width: 100,
          minWidth: 100,
          suppressSizeToFit: false
        },
        {
          headerName: 'CCY',
          field: 'currency',
          width: 100,
          minWidth: 100,
          suppressSizeToFit: false
        },
        {
          headerName: 'Market',
          field: 'market',
          hide: true,
          width: 100,
          minWidth: 100,
          suppressSizeToFit: false
        },
        {
          headerName: 'From',
          field: 'proposer',
          hide: !this.isObserverOrNotary(),
          width: 100,
          minWidth: 100,
          suppressSizeToFit: false
        },
        {
          headerName: 'To',
          field: 'proposee',
          hide: !this.isObserverOrNotary(),
          width: 100,
          minWidth: 100,
          suppressSizeToFit: false
        },
        {
          headerName: 'Timestamp',
          field: 'timestamp',
          valueFormatter: (params) => {
            let date = new Date(params.value)
            return date.toLocaleDateString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            //return formatDate(params.value);
          },
          //flex: 0,
          width: 200,
          minWidth: 200,
          suppressSizeToFit: false
        },
        {
          headerName: 'Id',
          field: 'linearId',
          hide: true
        },
        {
          headerName: 'Info',
          field: 'cdmJsonBase64',
          cellRenderer: "BtnCdmInfo",
          cellRendererParams(params) {
            return {
              cdmJsonBase64: params.data.cdmJsonBase64,
              cdmDTO : {
                instrument : params.data.instrument,
                instrumentType : params.data.instrumentType,
                price : params.data.price,
                quantity: params.data.quantity,
                currency: params.data.currency,
                market: params.data.market,
                proposer: params.data.proposer,
                proposerId: params.data.proposerId,
                proposee: params.data.proposee,
                proposeeId: params.data.proposeeId,
                contractualDefinition: params.data.contractualDefinition,
                masterAgreement: params.data.masterAgreement,
                linearId: params.data.linearId
              },
              nodeName: thisVar.state.nodeName,
              tradeStatus: params.data.tradeStatus,
            }
          },
          width: 100,
          minWidth: 100,
          suppressSizeToFit: false
        },
        {
          headerName: 'Status',
          field: 'tradeStatus',
          cellStyle: params => {

            if (params.value === TradeStatesConstants.ACCEPTED.name) {
              return {
                color: TradeStatesConstants.ACCEPTED.color,
                fontWeight: "bold"
              };
            } else if (params.value === TradeStatesConstants.REJECTED.name) {
              return {
                color: TradeStatesConstants.REJECTED.color,
                fontWeight: "bold"
              };
            } else if (params.value === TradeStatesConstants.PROPOSED.name) {
              return {
                color: TradeStatesConstants.PROPOSED.color,
                fontWeight: "bold"
              };
            } else if (params.value === TradeStatesConstants.COUNTERPROPOSED.name) {
               return {
                 color: TradeStatesConstants.COUNTERPROPOSED.color,
                 fontWeight: "bold"
               };
            } else if (params.value === TradeStatesConstants.INCOMING.name) {
              return {
                color: TradeStatesConstants.INCOMING.color,
                fontWeight: "bold"
              };
            } else if (params.value === TradeStatesConstants.INCOMING_COUNTERPROPOSAL.name) {
               return {
                 color: TradeStatesConstants.INCOMING_COUNTERPROPOSAL.color,
                 fontWeight: "bold"
               };
            }
            return null;
          },
          //flex: 0,
          width: 280,
          minWidth: 280,
          suppressSizeToFit: false
        },
        {
          headerName: 'Action',
          field: 'action',
          cellRenderer: "BtnCdmAction",
          cellRendererParams(params) {
            return {
              acceptFunction: thisVar.acceptFunction,
              rejectFunction: thisVar.rejectFunction,
              tradeStatus: params.data.tradeStatus,
              cdmDTO : {
                instrument : params.data.instrument,
                instrumentType : params.data.instrumentType,
                price : params.data.price,
                quantity: params.data.quantity,
                currency: params.data.currency,
                market: params.data.market,
                proposer: params.data.proposer,
                proposerId: params.data.proposerId,
                proposee: params.data.proposee,
                proposeeId: params.data.proposeeId,
                contractualDefinition: params.data.contractualDefinition,
                masterAgreement: params.data.masterAgreement,
                linearId: params.data.linearId
              },
            }
          },
          //flex: 0,
          hide: this.isObserverOrNotary(),
          width: 200,
          minWidth: 200,
          suppressSizeToFit: false
        }
      ],

      // a default column definition with properties that get applied to every column
      defaultColDef: {
        //flex: 1,
        // make every column editable
        editable: false,
        // make every column use 'text' filter by default
        //filter: 'agTextColumnFilter',
        sortable: true,
        filter: true,
        resizable: true,
      },

      // if we had column groups, we could provide default group items here
      defaultColGroupDef: {},

      // define a column type (you can define as many as you like)
      columnTypes: {
        nonEditableColumn: { editable: false },
      },

      frameworkComponents: {
        BtnCdmAction: BtnCdmAction,
        BtnCdmInfo: BtnCdmInfo
      },


      // other grid options ...
      onGridColumnsChanged(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
        window.onresize = () => {
            this.gridApi.sizeColumnsToFit();
        } 
      },

      onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
        window.onresize = () => {
            this.gridApi.sizeColumnsToFit();
        } 
      }
    }

    let onConnected = () => {
      console.log(this.props.nodeName, "Connected!!")
    }

    let onMessageReceived = (msg) => {
      //let actualData = this.state.data;
      //actualData.push(JSON.parse(msg.message));
      //console.log(actualData)
      //console.log(this.state.data)
      this.loadTradeData();
    }

    return (
      <React.Fragment>
        <div className="tradeTable">
          <SockJsClient
            url={SOCKET_URL}
            topics={['/topic/message']}
            onConnect={onConnected}
            onDisconnect={() => console.log(this.props.nodeName, "Disconnected!")}
            onMessage={msg => onMessageReceived(msg)}
            debug={false}
          />
          <div>{this.state.message}</div>
          <h3 className="tradeTableTitle"></h3> 
          <div className="ag-theme-alpine" style={{ height: "50vh"}}>
            <AgGridReact class="tradeTableGrid"
              gridOptions={gridOptions}
              rowData={this.state.data}>
            </AgGridReact>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default TradeTable;