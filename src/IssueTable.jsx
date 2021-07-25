import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import {Button,
        Glyphicon, 
        Tooltip, 
        OverlayTrigger,
        Table,
    } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';


const IssueRow = withRouter(({issue, location:{search}, closeIssue,deleteIssue, index } )=> {
    //   const {issue} = props
            // let  searchLocation = {path:`/issue/${issue.id}`, search }
    const closeTooltip =(
                <Tooltip id="close-tooltip" placement="top" >Close</Tooltip>
            );

    const deleteTooltip = (
                <Tooltip id="delete-tooltip" placement="top">Delete</Tooltip>
                    );

    const editTooltip = (
                            <Tooltip id="close-tooltip" placement="top">Edit Issue</Tooltip>
                            );
    // const due  = issue.due ? issue.due.toDateString() :"" ;
    // const created = issue.created.toDateString() ;

    function onClose(e){
                    e.preventDefault();
                    closeIssue(index);
                    }

    function onDelete(e) {
                            e.preventDefault();
                            deleteIssue(index);
                            }

    const tablerow =(
            <tr>
                    <td >{issue.id} </td>
                     <td>{issue.status} </td>
                    <td>{issue.owner} </td>
                     <td>{issue.effort} </td>
                    <td>{issue.created.toDateString()} </td>
                     <td>{issue.due ? issue.due.toDateString() : '' } </td>
                     <td >{issue.title} </td>
                     <td>
                     <LinkContainer to={`/edit/${issue.id}`} >
                     <OverlayTrigger delayShow={1000} overlay={editTooltip}>
                                <Button bsSize="xsmall">
                                <Glyphicon glyph="edit" />
                                </Button>
                                </OverlayTrigger>
                     </LinkContainer>
                            <OverlayTrigger delayShow={1000} overlay={closeTooltip}>
                                         
                                             <Button bsSize="xsmall" onClick={onClose}>
                                                 <Glyphicon glyph="remove" />

                                             </Button>
                                        
                                        
                            </OverlayTrigger>
                            {"  "}
                            {/* <button type="button" onClick={()=>{deleteIssue(index)}}>Delete</button> */}
                            <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
                                     <Button bsSize="xsmall" onClick={onDelete}>
                                        <Glyphicon glyph="trash" />
                                        </Button>
                        </OverlayTrigger>
                      </td>
                     
                    
            </tr>

        );
    return(
          
        <LinkContainer to={`/issue/${issue.id}`} >
        {tablerow}
        </LinkContainer>

    )

}); 


export default class IssueTable extends React.Component{
    constructor(props){
        super(props);
       
    }
    render(){
    
        const issueRow = this.props.issues.map((item,index)=>
                                                        <IssueRow 
                                                        key={item.id} 
                                                        index={index} 
                                                        deleteIssue={this.props.deleteIssue} 
                                                        closeIssue ={this.props.closeIssue} 
                                                        issue={item}/> )
        return(
            <Table bordered condensed hover responsive className="container" >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Effort</th>
                        <th>Created</th>
                        <th>Due Date</th>
                        <th>Title</th>
                        <th>Action</th>
                       
                    </tr>
                </thead>
                <tbody>
                  {issueRow}
                </tbody>
            </Table>
        )
    }
}