import React from 'react'
import { withRouter,Link } from 'react-router-dom';
import DateInput from './DateInput.jsx';
import graphQLfetch from './graphQLfetch';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';
import {Col, Panel, Form, FormGroup, FormControl, ControlLabel,
                    ButtonToolbar, Button,Alert
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Toast from './Toast.jsx'




class IssueEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            issue: {},
            invalidFields : {},
            showingValidation:false,
            toastVisible: false,
            toastMessage:'',
            toastType: 'success'
        }
                     }
    componentDidMount(){
        this.fetchData();
    }
    componentDidUpdate(prevProps){
        const{match:{params:{id:prevId}}} = prevProps;
        const{match:{params:{id}}} =  this.props;
        if(prevId !== id){
            this.fetchData();
        }
    }
    showValidation = ()=>{
        this.setState({showingValidation:true})

    }
    dismissValidation = ()=>{
        this.setState({showingValidation:false})

    }
    showSuccess = (message) => {
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


    fetchData = async ()=>{
      
        const query = `query issue($id:Int!){
                        issue(id:$id){
                            id description status
                            title effort owner created due
                        }
                    }`
        const{match:{params:{id}}} = this.props
        const data = await graphQLfetch(query,{id}, this.showError);
        if(data){
            // const {issue} = data;
            // issue.due = issue.due ? issue.due.toDateString():'';
            // issue.effort = issue.effort != null ? issue.effort.toString():'';
            // issue.owner = issue.owner != null ? issue.owner : '';
            // issue.description = issue.description != null ? issue.description: '';
            this.setState({issue: data ? data.issue:{} , invalidFields:{} })
        }else {
            this.setState({issue:{}, invalidFields:{} })
        }
    }

    handleChange = (e, naturalValue)=>{
        const{ name, value : textValue} = e.target;
        const value = naturalValue === undefined ? textValue : naturalValue;
        this.setState(prevState=>({
            issue:{...prevState.issue,[name]:value}
        }) )

    }
    handleSubmit = async (e)=>{
        e.preventDefault();
        this.showValidation();
        const{issue, invalidFields, } = this.state;
        if(Object.keys(invalidFields).length !== 0) return;
        const query = `
                            mutation issueUpdate($id:Int!
                                                  $changes:IssueUpdateInput!
                                                    ){
                                                        issueUpdate(
                                                            id:$id
                                                            changes:$changes
                                                        ){
                                                            id title owner status 
                                                            effort created due description
                                                        }
                                                    }`;
                                                    
                const {id, created, ...changes} = issue;
                const data = await graphQLfetch(query,{id, changes}, this.showError )
                if(data){
                    this.setState({issue:data.issueUpdate});
                    // alert('Updated issue succesfully');
                    this.showSuccess('Updated Issue Successfully')
                }
        // console.log(issue);
    }
    onValidityChange = (event, valid) => {
        const{name}= event.target
        this.setState((prevState)=>{
            const invalidFields = {...prevState.invalidFields, [name]: !valid };
            if(valid) delete invalidFields[name];
            return {invalidFields};
        })

    }

    render() {
        const { toastVisible, toastMessage, toastType } = this.state;
        const{invalidFields, showingValidation} = this.state;
        let validationMessage;
        if(Object.keys(invalidFields).length !== 0 && showingValidation ){
            validationMessage = (
                <Alert bsStyle="danger" onDismiss={this.dismissValidation} >
                    Please correct invalid fields before submitting.
                </Alert>
            )
        } 
        const{issue:{id}} = this.state;
        const{match:{params:{id: propsId}}} = this.props;
        console.log(id);
        if(id == null){
            if(propsId != null){
                return <h3>{ `Issue with this id${propsId} is not found! `} </h3>

            }
            return null;
        }
        const{issue:{description,title, owner, effort, due, created, status} } = this.state

        return ( 
            <Panel>
                    <Panel.Heading>
                            <Panel.Title>{`Editing issue: ${id}`}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Form horizontal onSubmit={this.handleSubmit}  >
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Created</Col>
                                <Col sm={9}>
                                <FormControl.Static>
                                {created.toDateString()}
                                </FormControl.Static>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Status</Col>
                                <Col sm={9}>
                                <FormControl
                                componentClass="select"
                                name="status"
                                value={status}
                                onChange={this.handleChange}
                                >
                                <option value="New">New</option>
                                <option value="Assigned">Assigned</option>
                                <option value="Fixed">Fixed</option>
                                <option value="Closed">Closed</option>
                                </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                    <Col componentClass={ControlLabel} sm={3}>Owner</Col>
                                    <Col sm={9}>
                                    <FormControl
                                    componentClass={TextInput}
                                    name="owner"
                                    value={owner}
                                    onChange={this.handleChange}
                                    key={id}
                                    />
                                    </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Effort</Col>
                                <Col sm={9}>
                                <FormControl
                                componentClass={NumInput}
                                name="effort"
                                value={effort}
                                inputchange={this.handleChange}
                                key={id}
                                />
                                </Col>
                            </FormGroup>
                            <FormGroup validationState={
                                    invalidFields.due ? 'error' : null
                                    }>
                                    <Col componentClass={ControlLabel} sm={3}>Due</Col>
                                    <Col sm={9}>
                                    <FormControl
                                    componentClass={DateInput}
                                    onValidityChange={this.onValidityChange}
                                    name="due"
                                    value={due}
                                    onChange={this.handleChange}
                                    key={id}
                                    />
                                    <FormControl.Feedback />
                                    </Col>
                            </FormGroup>
                            <FormGroup>
                                    <Col componentClass={ControlLabel} sm={3}>Title</Col>
                                    <Col sm={9}>
                                    <FormControl
                                    componentClass={TextInput}
                                    size={50}
                                    name="title"
                                    value={title}
                                    onChange={this.handleChange}
                                    key={id}
                                    />
                                    </Col>
                            </FormGroup>
                            <FormGroup>
                                    <Col componentClass={ControlLabel} sm={3}>Description</Col>
                                    <Col sm={9}>
                                    <FormControl
                                    componentClass={TextInput}
                                    tag="textarea"
                                    rows={4}
                                    cols={50}
                                    name="description"
                                    value={description}
                                    onChange={this.handleChange}
                                    key={id}
                                    />
                                    </Col>
                            </FormGroup>
                            <FormGroup>
                                    <Col smOffset={3} sm={6}>
                                    <ButtonToolbar>
                                    <Button bsStyle="primary" type="submit">Submit</Button>
                                    <LinkContainer to="/issue">
                                    <Button bsStyle="link">Back</Button>
                                    </LinkContainer>
                                    </ButtonToolbar>
                                    </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={3} sm={9}>{validationMessage}</Col>
                            </FormGroup>
                        </Form>
                         {/* {validationMessasge} */}
                    </Panel.Body>
                    <Panel.Footer>
                            <Link to={`/edit/${id - 1}`}>Prev</Link>
                            {' | '}
                            <Link to={`/edit/${id + 1}`}>Next</Link>
                    </Panel.Footer> 
                    <Toast
                            showing={toastVisible}
                            onDismiss={this.dismissToast}
                            bsStyle={toastType}
                            >
                            {toastMessage}
                    </Toast>
            </Panel>
         );
    }
}
 
export default IssueEdit;
