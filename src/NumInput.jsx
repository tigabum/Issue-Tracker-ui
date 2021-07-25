
import React from 'react';

function format(val){
   return val != null ? val.toString() : "";
}

function unformat(str){
    const value = parseInt(str, 10);
    return Number.isNaN(value) ? null : value
}

export default class NumInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:format(props.value)
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleChange(e){
        if(e.target.value.match(/^\d*$/))
        this.setState({value:e.target.value})
        console.log(this.state.value)
    }
    handleBlur(e){
                const{inputchange} = this.props
                const {value} = this.state;
                console.log(value);
                inputchange(e, unformat(value) )
    }
render(){
    const{value} = this.state;
    return(
            <input
            type="text"
            {...this.props}
            value={value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            />

    )
}
}