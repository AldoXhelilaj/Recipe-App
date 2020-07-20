import React, { Component } from 'react';
import{ connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import * as action from '../store/actions/index'

class Logout extends Component {

componentDidMount(){
    this.props.onLogout()
}



    render() {
        return (
            <div>
                <Redirect to='/' />
            </div>
        );
    }
}


const mapsStateToDispatch =(dispatch)=>{
return{
    onLogout: ()=>dispatch(action.authLogout())
}

}
export default connect(null, mapsStateToDispatch)(Logout);
