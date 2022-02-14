import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import NodeDashboard from "../pages/NodeDashboard";
import NotFound from "../pages/NotFound";
import LayoutMenu from "../components/layout/LayoutMenu";

function Routes() {

    return (
        <BrowserRouter basename='/'>
            <Route render={(props) => (
                <LayoutMenu {...props}>
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/PartyA" component={() => <NodeDashboard nodeName="PartyA"/>} />
                        <Route path="/PartyB" component={() => <NodeDashboard nodeName="PartyB"/>} />
                        <Route path="/PartyC" component={() => <NodeDashboard nodeName="PartyC"/>} />
                        <Route path="/Notary" component={() => <NodeDashboard nodeName="Notary"/>} />
                        <Route path="/Observer" component={() => <NodeDashboard nodeName="Observer"/>} />
                        <Route component={NotFound} />
                    </Switch>
                </LayoutMenu>
            )} />
        </BrowserRouter>
    )
}

export default Routes;
