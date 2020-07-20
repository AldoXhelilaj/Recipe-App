
import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';
import loadingsvg from './loading.svg';
import { connect } from 'react-redux'
import orange from './img/oranges.jpg';
import WebFont from 'webfontloader';
import { Route, Switch, Link, NavLink, Router, Redirect } from 'react-router-dom';
import Auth from './components/Auth';
import Recipes from './Recipes'
import Logout from './components/Logout'
import * as actions from './store/actions/auth';


WebFont.load({
  google: {
    families: ['Open Sans:300,400,700', 'sans-serif']
  }
});






class App extends Component {
  componentDidMount() {

    this.props.onStart();

  }

  render() {

    const { isAuth } = this.props;

   


    
   
     

    

  return (
      <div>
        <div className="App" style={{ backgroundImage: `url(${orange})`, backgroundSize: "cover" }}>


          <div className="navigation">
         
            <NavLink className={isAuth ? "disable": null} to="/" >Login</NavLink>
            {isAuth ? <NavLink to="/home" >Home</NavLink> : null}
            {isAuth ? <NavLink to="/logout" >Logout</NavLink> : null}


          </div>


        
          <Switch>
          <Route exact path="/" component={Auth} />

          <Route path="/home" component={Recipes} />
          <Route path='/logout' component={Logout} />
         
        </Switch>
        


        </div>
      </div>
     



    )
  }
}


const mapStateToProps = state => {
  console.log(state + "Loader")
  return {

    isAuth: state.auth.token !== null


  }

}
const mapDispatchToProps = dispatch => {

  return {
    onStart: () => dispatch(actions.authCheckState())
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(App);


