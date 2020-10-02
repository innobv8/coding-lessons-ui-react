import React from "react";
import Planner from "./views/Planner"

import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

export default function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className="container mx-auto">
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/planner/no-student"/>
                    </Route>
                    <Route path="/planner/:alias" component={Planner}/>
                </Switch>
            </div>
        </Router>
    );
}