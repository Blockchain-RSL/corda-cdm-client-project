import React from 'react';

// components
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import BtnAction from '../buttons/BtnAction.js';
import SockJsClient from 'react-stomp';

// axios
import AxiosInstance from "../../axios/AxiosInstance";

// css
import "./tradeTable.scss";
import TradeStatesConstants from '../constants/TradeStatesConstants.js';

// constants
const SOCKET_URL = 'http://localhost:8080/ws-message';

class TradeTable extends React.Component {

  constructor (props){
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
      url:`statesDetail?nodeName=${this.state.nodeName}`
    }).then((response) => {
      //console.log("response: ", response.data)
      this.setState({data: response.data})
    }).catch((error) => {
      console.log("Error into loadTradeData ", error)
      this.setState({data: []})
    })
  }

  async acceptFunction(linearId) {
    AxiosInstance({
      method: 'post',
      url:`startFlowAcceptProposal?nodeName=${this.state.nodeName}&proposalId=${linearId}`
    }).then((response) => {
      console.log("Response of acceptFunction ", response )
    }).catch((error) => {
      console.log("Error into acceptFunction ", error)
    })
  }

  async rejectFunction(linearId) {
    AxiosInstance({
      method: 'post',
      url:`startFlowRejectProposal?nodeName=${this.state.nodeName}&proposalId=${linearId}`
    }).then((response) => {
      console.log("Response of rejectFunction ", response )
    }).catch((error) => {
      console.log("Error into rejectFunction ", error)
    })
  }

  render() {
    var thisVar = this;
    const gridOptions = {
      columnDefs: [
          { 
            headerName: 'InstrumentType', 
            field: 'instrumentType'
          },
          { 
            headerName: 'Instrument', 
            field: 'instrument'
          },
          { 
            headerName: 'Quantity', 
            field: 'quantity'
          },
          { 
            headerName: 'Price', 
            field: 'price'
          },
          { 
            headerName: 'Currency', 
            field: 'currency'
          },
          { 
            headerName: 'Market', 
            field: 'market'
          },
          { 
            headerName: 'From', 
            field: 'proposer'
          },
          { 
            headerName: 'To', 
            field: 'proposee'
          },
          { 
            headerName: 'Id', 
            field: 'linearId',
            hide: true
          },
          { 
            headerName: 'Status', 
            field: 'tradeStatus',
            cellStyle: params => {
              
              if (params.value === TradeStatesConstants.ACCEPTED.name) {
                return {color: TradeStatesConstants.ACCEPTED.color,
                  fontWeight: "bold"};
              } else if (params.value === TradeStatesConstants.REJECTED.name) {
                return {color: TradeStatesConstants.REJECTED.color,
                  fontWeight: "bold"};
              } else if (params.value === TradeStatesConstants.PROPOSED.name) {
                return {color: TradeStatesConstants.PROPOSED.color,
                  fontWeight: "bold"};
              } else if (params.value === TradeStatesConstants.INCOMING.name) {
                return {color: TradeStatesConstants.INCOMING.color,
                  fontWeight: "bold"};
              }
              return null;
            },
            flex:0,
          },
          { 
            headerName: 'Action', 
            field: 'action',
            cellRenderer: "BtnAction",  
            cellRendererParams(params) {
              return {
                acceptFunction : thisVar.acceptFunction,
                rejectFunction : thisVar.rejectFunction,
                tradeStatus : params.data.tradeStatus,
                linearId : params.data.linearId
              }
            },
            flex:0,
          }
      ],
  
      // a default column definition with properties that get applied to every column
      defaultColDef: {
          flex:1,
          // make every column editable
          editable: false,
          // make every column use 'text' filter by default
          //filter: 'agTextColumnFilter',
          sortable:true,
          filter:true
      },
  
      // if we had column groups, we could provide default group items here
      defaultColGroupDef: {},
  
      // define a column type (you can define as many as you like)
      columnTypes: {
          nonEditableColumn: { editable: false },
      },
      
      frameworkComponents : {
        BtnAction : BtnAction
      }
      // other grid options ...
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
          <h3 style={{textAlignVertical: "center",textAlign: "center",}}>Trades</h3>
            <div className="ag-theme-alpine" style={{height: 250}}>
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