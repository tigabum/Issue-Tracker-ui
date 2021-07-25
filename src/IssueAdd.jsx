import React from 'react';
import {
        Form, FormControl, FormGroup, ControlLabel, Button,
} from 'react-bootstrap';

export default class IssueAdd extends React.Component{
     constructor(props){
        super(props);
        // setTimeout(()=>this.props.createData(sampleIssue), 3000)
      

    }
    componentDidMount(){
          
        
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        const form = document.forms.addform;
        const issue={
            owner:form.owner.value,
            title:form.title.value,
            due: new Date(new Date().getTime() + 1000*60*60*24*10),
            // status:"New"
        }
        this.props.createData(issue);
        form.owner.value= "";
        form.title.value = "";

    }
    render(){
        return(
           <Form inline name="addform" onSubmit={this.handleSubmit} >
            <FormGroup>
                <ControlLabel>Owner:</ControlLabel>
                {' '}
                <FormControl type="text" name="owner" />
                </FormGroup>
                {' '}
                <FormGroup>
                <ControlLabel>Title:</ControlLabel>
                {' '}
                <FormControl type="text" name="title" />
            </FormGroup>
                {' '}
                <Button bsStyle="primary" type="submit">Add</Button>
           </Form>
        )
    }
}
