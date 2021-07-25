import React from 'react';
import IssueFilter from './IssueFilter.jsx'
import IssueAdd from './IssueAdd.jsx'
import IssueTable from './IssueTable.jsx'
import graphQLfetch from './graphQLfetch.js';
import URLSearchParams from 'url-search-params';
import {Panel} from 'react-bootstrap';
import Toast from './Toast.jsx'
// import {Label} from 'react-bootstrap';
// import { Route } from 'react-router-dom';
// import IssueDetail from './IssueDetail.jsx';




export default class IssueList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            issue:[],
            toastVisible: false,
            toastMessage: ' ',
            toastType: 'info',
        }
    }
        componentDidMount(){
          this.loadData();
        }
        componentDidUpdate(prevProps){
            const{location:{search:prevSearch}} = prevProps;
            const{location:{search}} = this.props;
            if(prevSearch !== search) {
                 this.loadData();
            }
        }
loadData = async ()=>{
   
    const{location:{search}} = this.props;

    const params = new URLSearchParams(search);
     const vars ={}
     if(params.get('status'))vars.status = params.get('status');
     const effortMin = parseInt(params.get('effortMin'),10);
     if(!Number.isNaN(effortMin))vars.effortMin = effortMin;
     const effortMax = parseInt(params.get('effortMax'),10 );
      if(!Number.isNaN(effortMax))vars.effortMax = effortMax;

        const query = `
                        query issueList(
                                        $status:StatusType
                                        $effortMin:Int
                                        $effortMax:Int
                                        ){
                            issueList(
                                        status:$status
                                        effortMin:$effortMin
                                         effortMax:$effortMax
                                        ){
                                       
                                id title status owner
                                created effort due
                            }
                        }
        `
    
        const data = await graphQLfetch(query,vars, this.showError );
        if(data){
            this.setState({issue:data.issueList})
        }
        
    }
         
//   createData = async (issue) => {
                   
                    
//                     const query = `mutation issueAdd($issue: IssueInputs!){
//                         issueAdd(issue:$issue){
//                             id
//                         }
//                     } `;
                  
//                     const data = await graphQLfetch(query,{issue},this.showError );
//                     if(data){
//                          this.loadData();

//                     }
                   
               


//             }

    closeIssue = async (index)=>{
                const query = `
                                mutation issueClose($id:Int!){
                                    issueUpdate(id:$id, changes:{status:Closed} ){
                                        id title owner status
                                        effort created due description
                                    }
                                }`;
                                const {issue} = this.state;
                                const data = await graphQLfetch(query,{id: issue[index].id }, this.showError );
                                if(data){
                                    this.setState((prevState)=>{
                                            const newList = [...prevState.issue];
                                            newList[index] = data.issueUpdate;
                                            return {issue:newList};

                                    })
                                }
    }

    deleteIssue = async (index)=>{
        console.log(index);
        const query = `mutation issueDelete($id:Int!){
                        issueDelete(id:$id)}`
                    const{issue} = this.state;
                    const{location:{pathname, search}, history} = this.props;
                    const{id} = issue[index];
                    const data = await graphQLfetch(query, {id}, this.showError);
                    console.log('data', data);
                    if(data && data.issueDelete){
                        this.setState((prevState)=>{
                            const newIssue = [...prevState.issue];
                            if(pathname === `/issue/${id}`){
                                    history.push({pathname:'/issue', search })

                            }
                            newIssue.splice(index,1);
                            console.log('afterDelete', newIssue);
                            return {issue:newIssue}
                        })

                    }else{
                        this.loadData();
                    }
                    
                    }
    showSuccess = (message) =>{
                        this.setState({
                        toastVisible: true, toastMessage: message, toastType: 'success',
                        });
                        }
    showError = (message) => {
                    this.setState({
                    toastVisible: true, toastMessage: message, toastType: 'danger',
                    });
                    }
    dismissToast = () => {
                    this.setState({ toastVisible: false });
                    }

    render(){
        const { toastVisible, toastType, toastMessage } = this.state;
    //  const {match} = this.props
        return(
           <React.Fragment>
              <Panel >
                  <Panel.Heading >
                       <Panel.Title toggle >Issue Filter </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible >
                       <IssueFilter/>
                    </Panel.Body>

              </Panel>
                

                <IssueTable
                closeIssue={this.closeIssue} 
                issues={this.state.issue} 
                deleteIssue= {this.deleteIssue}
                />
{/*                 
               <IssueAdd  
               createData={this.createData} /> */}
               <Toast
                    showing={toastVisible}
                    onDismiss={this.dismissToast}
                    bsStyle={toastType}
                    >{toastMessage}
               </Toast>
          </React.Fragment>
        )
    }
}
           