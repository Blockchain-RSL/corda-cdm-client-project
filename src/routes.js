import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import NodeDashboard from "./pages/NodeDashboard";
import NotFound from "./pages/NotFound";
import LayoutMenu from "./components/layout/LayoutMenu";

function Routes() {

    return (
        <BrowserRouter basename='/'>
            <Route render={(props) => (
                <LayoutMenu {...props}>
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/PartyA" component={() => <NodeDashboard nodeName="PartyA"></NodeDashboard>} />
                        <Route path="/PartyB" component={() => <NodeDashboard nodeName="PartyB"></NodeDashboard>} />
                        <Route path="/PartyC" component={() => <NodeDashboard nodeName="PartyC"></NodeDashboard>} />
                        <Route path="/Notary" component={() => <NodeDashboard nodeName="Notary"></NodeDashboard>} />
                        <Route path="/Observer" component={() => <NodeDashboard nodeName="Observer"></NodeDashboard>} />
                        <Route component={NotFound} />
                    </Switch>
                </LayoutMenu>
            )} />
        </BrowserRouter>
    )
}

export default Routes;
