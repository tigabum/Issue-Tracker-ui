import {Redirect, Route, Switch} from 'react-router-dom';
import IssueList from './IssueList.jsx';
import ReportIssue from './ReportIssue.jsx';
import React from 'react';
import IssueEdit from './IssueEdit.jsx';
import IssueDetail from './IssueDetail.jsx';

const NotFound = ()=> <p>Page Not Found!</p>

export default function Contents(){

    return(
        <Switch>
            <Redirect exact from="/" to="/issue" />
            <Route exact path="/issue" component={IssueList}/>
            <Route exact path="/report" component={ReportIssue}/>
            <Route exact path="/edit/:id" component={IssueEdit}/>
              <Route exact path="/issue/:id" component={IssueDetail} />
            
            
            <Route component={NotFound} />

        </Switch>
    )
}