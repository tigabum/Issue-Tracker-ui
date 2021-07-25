import React from 'react';
import {Link, withRouter } from 'react-router-dom'
import URLSearchParams from 'url-search-params';

import {
ButtonToolbar, Button, FormGroup, FormControl, ControlLabel, InputGroup,
Row, Col
} from 'react-bootstrap';

class IssueFilter extends React.Component{
    constructor({location:{search}} ){
        super();
        const params = new URLSearchParams(search);
        this.state = {
            status:params.get('status') || "",
            effortMin: params.get('effortMin')|| "",
            effortMax:params.get('effortMax') || "",
            changed:false
        }
        // this.handleSearchChange = this.handleSearchChange.bind(this);
        
    }
    componentDidUpdate(prevProps){
        const{location:{search :prevSearch }} = prevProps
        const{location:{search}} = this.props;
        if(prevSearch !== search){
            this.showOldFilter();
        }

    }

    showOldFilter = ()=>{
        const {location:{search}} = this.props
        const params = new URLSearchParams(search);
        this.setState({status:params.get('status')||"",
                       effortMin:params.get('effortMin')||"" ,
                       effortMax:params.get('effortMax') || "" ,
                       changed:false })
    }
    handleSearchChange = (e)=> {
        this.setState({status: e.target.value, changed: true})
        // const status = e.target.value;
        // const {history} = this.props;

        // history.push({
        //     pathname:'/issue',
        //     search: status ? `?status=${status}`: ""
        // })
     }

        handleFilterApply = () => {
            const {status, effortMin, effortMax} = this.state;
            const {history} = this.props;
            const params = new URLSearchParams();
            if(status) params.set('status', status);
            if(effortMin)params.set('effortMin', effortMin);
            if(effortMax)params.set('effortMax', effortMax);
            const search = params.toString() ? `?${params.toString()}`:"";
            history.push({
                pathname:'/issue',
                search
            })
                    
        }
        
        handleMinimum = (e)=>{
            const effortMinimum = e.target.value;
            if(effortMinimum.match(/^\d*$/)){
                this.setState({effortMin: effortMinimum, changed:true})
            }

        }
        handleMaximum = (e)=>{
                const effortMaximum= e.target.value
                if(effortMaximum.match(/^\d*$/) ){
                    this.setState({effortMax:effortMaximum, changed:true})
                }
        }
   
    render(){
            // const {location:{search} } = this.props;
            // const params = new URLSearchParams(search);
            const {status, effortMin, effortMax, changed} = this.state
        return(
            <Row>
                <Col xs={6} sm={4} md={3} lg={2} >
               
                <FormGroup>
                    <ControlLabel>Status:</ControlLabel>
                    <FormControl
                    componentClass="select"
                    value={status}
                    onChange={this.handleSearchChange}
                    >
                    <option value="">(All)</option>
                    <option value="New">New</option>
                                        <option value="Assigned">Assigned</option>
                                        <option value="Fixed">Fixed</option>
                                        <option value="Closed">Closed</option>
                    </FormControl>
                </FormGroup>
                 </Col>
                 <Col xs={6} sm={4} md={3} lg={2} >
                 
                <FormGroup>
                    <ControlLabel>Effort between:</ControlLabel>
                    <InputGroup>
                    <FormControl value={effortMin} onChange={this.handleMinimum} />
                    <InputGroup.Addon>-</InputGroup.Addon>
                    <FormControl value={effortMax} onChange={this.handleMaximum} />
                    </InputGroup>
                </FormGroup>
                </Col>
                <Col xs={6} sm={4} md={3} lg={2} >
                    <FormGroup>
                        <ControlLabel>&nbsp;</ControlLabel>
                   
                    <ButtonToolbar>
                        <Button bsStyle="primary" type="button" onClick={this.handleFilterApply} >Apply </Button>
                        <Button type="button" disabled={!changed} onClick={this.showOldFilter} >Reset</Button>
                    </ButtonToolbar>
                     </FormGroup>
                    </Col>

            </Row>
        )
    }
}

export default withRouter(IssueFilter);