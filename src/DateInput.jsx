import React from 'react';

function displayFormat(date){
    return (date != null)? date.toDateString() : '';
}
function editFormat(date){
    return (date != null) ? date.toISOString().substr(0, 10) : '';
}

function unformat(str){
    const val = new Date(str);
    return Number.isNaN(val.getTime()) ? null : val;
}
export default class DateInput extends  React.Component{
            constructor(props){
                super(props);
                this.state = {
                    value:editFormat(props.value),
                    focused:false,
                    valid:true,
                }
            }
            onFocus = () =>{
                this.setState({focused: true})
            }
            onBlur = (e) =>{
                const{value, valid:oldValid } = this.state;
                const {onValidityChange, onChange} = this.props;
                const dateValue = unformat(value);
                const valid = value === "" || dateValue != null;
                if(valid !== oldValid && onValidityChange ){
                    onValidityChange(e, valid);
                }
                this.setState({focused: false, valid});
                if(valid) onChange(e,dateValue);

            }

               onChange= (e)=> {
                        if (e.target.value.match(/^[\d-]*$/)) {
                            this.setState({ value: e.target.value });
                        }   
                            }
            render(){
                const{valid, focused, value} = this.state;
                const { value: orgValue, onValidityChange, ...props } = this.props;
                // const{value: orgValue, name} = this.props;
                // const className = (!valid && !focused) ? 'invalid' : null;
                const displayValue = (focused || !valid ) ? value : displayFormat(orgValue)
                
                return(
                    <input {...props}
                            value={displayValue}
                            placeholder = {focused ? 'yyyy-mm-dd' : null }
                            onFocus = {this.onFocus}
                            onBlur = {this.onBlur}
                            onChange ={this.onChange}
                    />
                )
            }
}