import React from 'react';

// libs
import AxiosInstance from '../axios/AxiosInstance';

// components
import NodesStatusTable from '../components/table/NodesStatusTable'

// css
import './dashboard.scss';

function Dashboard() {

    /*constructor(props) {
        super(props);

        this.state = {
            nodeInfo: []
        };

        //this.loadNodeInfo = this.loadNodeInfo.bind(this);
    }*/

    /*async loadNodeInfo() {
        AxiosInstance({
            url: `peers?nodeName=Observer`
        }).then((response) => {
            console.log("response loadNodeInfo: ", response.data)
            this.setState({ nodeInfo: response.data })
        }).catch((error) => {
            console.log("Error into loadNodeInfo ", error)
        })
    }*/

    return (
        <div className="app">
            <h2 className="titleStyle">
                Network Dashboard
            </h2>
            <NodesStatusTable />
        </div>
    );
}


export default Dashboard;
