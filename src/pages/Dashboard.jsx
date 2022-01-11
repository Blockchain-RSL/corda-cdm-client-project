import React from 'react';

// libs
import AxiosInstance from '../axios/AxiosInstance';

// components
import NodesStatusTable from '../components/table/NodesStatusTable'

// css
import './dashboard.scss';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nodeInfo: []
        };

        this.loadNodeInfo = this.loadNodeInfo.bind(this);
        //this.loadNodeInfo();
    }

    async loadNodeInfo() {
        AxiosInstance({
            url: `peers?nodeName=Observer`
        }).then((response) => {
            console.log("response loadNodeInfo: ", response.data)
            this.setState({ nodeInfo: response.data })
        }).catch((error) => {
            console.log("Error into loadNodeInfo ", error)
        })
    }

    render() {
        return (
            <div className="app"
                style={{
                    margin: "25px 25px 0px 25px"
                }}>
                <h2 className="titleStyle"
                >Welcome to CDM Corda project
                </h2>
                <NodesStatusTable />
            </div>
        );
    }
}


export default Dashboard;
