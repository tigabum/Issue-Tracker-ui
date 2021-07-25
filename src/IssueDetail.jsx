import React from 'react'
import graphQLFetch from './graphQLfetch';
import Toast from './Toast.jsx'

class IssueDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            issue: {},
            toastVisible: false,
            toastMessage: ' ',
            toastType: 'info',  
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
    showError = (message) => {
            this.setState({
            toastVisible: true, toastMessage: message, toastType: 'danger',
            });
                     }
    dismissToast = () => {
            this.setState({ toastVisible: false });
                    }

    fetchData = async ()=>{
        const{match:{params:{id}}} = this.props
        const query = `
                    query issue($id:Int!){
                        issue(id:$id){
                            id description
                        }
                    }
        `
        const data = await graphQLFetch(query,{id}, this.showError);
        if(data){
            this.setState({issue: data.issue})
        }else {
            this.setState({issue:{}})
        }
    }

    render() { 
        const{issue:{description} } = this.state
        const { toastVisible, toastType, toastMessage } = this.state;

        return ( 

            <div>
                <h2>Description </h2>
                <pre>{description} </pre>
                <Toast
                    showing={toastVisible}
                    onDismiss={this.dismissToast}
                    bsStyle={toastType}
                    >
                    {toastMessage}
                </Toast>
            </div>
         );
    }
}
 
export default IssueDetail;
