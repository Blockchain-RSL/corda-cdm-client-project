import React from 'react';

// components
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import BooleanStatusRenderer from "./cellRenderer/BooleanStatusRenderer"

// axios
import AxiosInstance from "../../axios/AxiosInstance";

// css
import "./tradeTable.scss";


class NodesStatusTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      jsonData: "",
      data: []
    };

    this.loadNodeInfo = this.loadNodeInfo.bind(this);

    this.loadNodeInfo();
  }

  async loadNodeInfo() {
    AxiosInstance({
      url: `allNodesInfo`
    }).then((response) => {
      //console.log("response: ", response.data)
      this.setState({ data: response.data })
    }).catch((error) => {
      console.log("Error into loadNodeInfo ", error)
      this.setState({ data: [] })
    })
  }

  render() {
    const gridOptions = {

      columnDefs: [
        {
          headerName: 'Name',
          field: 'name'
        },
        {
          headerName: 'City',
          field: 'city'
        },
        {
          headerName: 'Country',
          field: 'country'
        },
        {
          headerName: 'Status',
          field: 'status',
          cellRenderer: "BooleanStatusRenderer",
          cellRendererParams(params) {
            return {
              status: params.data.status
            }
          },
        }
      ],

      // a default column definition with properties that get applied to every column
      defaultColDef: {
        flex: 1,
        // make every column editable
        editable: false,
        // make every column use 'text' filter by default
        //filter: 'agTextColumnFilter',
        sortable: true,
        filter: true,
        resizable: true,
        sizeColumnsToFit: true
      },

      // if we had column groups, we could provide default group items here
      defaultColGroupDef: {},

      // define a column type (you can define as many as you like)
      columnTypes: {
        nonEditableColumn: { editable: false },
      },

      frameworkComponents: {
        BooleanStatusRenderer: BooleanStatusRenderer
      }

      // other grid options ...
    }

    return (
      <React.Fragment>
        <div className="tradeTable">
          <div>{this.state.message}</div>
          <h3 style={{
            textAlignVertical: "center",
            textAlign: "center",
            margin: "25px 0px 25px 0px"
          }}>Nodes Status</h3>
          <div className="ag-theme-alpine" style={{ height: "261px" }}>
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

export default NodesStatusTable;