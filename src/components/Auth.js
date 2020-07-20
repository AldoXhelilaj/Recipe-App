import React, { Component } from 'react';
import { connect } from 'react-redux'
import classes from '../Auth/auth.module.css'
import Input from "./Input"
import stylesInput from '../components/input.module.css'
import Button from "./Button"
import * as actions from '../store/actions'
import Spinner from './Spinner'
import {Redirect} from 'react-router-dom'
import {FcInfo} from 'react-icons/fc'






class Auth extends Component {


   
  state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false,
        errorS:"",
           defaultUser:{

            email:"test@aldo.com",
           password:"123456"
           }  ,
           infoToggle:false
          
        
    }
         



    
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    inputChangedHandler = (event, controlName) => {
        const updadatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updadatedControls })
    }
    onSubmitHandler = (event,email) => {
        event.preventDefault();


        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignup)
          
    
    }
    showSignUp =(event)=>{
        event.preventDefault();
        this.setState((prevState)=>{
            return{
                isSignup:!prevState.isSignup
            }


        })
    }
  
  
    hoverInfo= ()=>{
        this.setState((prevState)=>{
            return{
                infoToggle:!prevState.infoToggle
            }


        })
         
      
  
            
            
        
       
      }
    render() {


     
        const {load,error,isAuth}=this.props;


     
        console.log(load+"Loadprops")

        let formValidation = [];
        for (const key in this.state.controls) {
            formValidation.push({
                id: key,
                config: this.state.controls[key]
            })
            console.log(formValidation);
        }


        let form = formValidation.map(formElement => (


            <Input className={stylesInput.Input}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />




        ));

        let errorMessage= null;

        if(error){
           errorMessage=<p>{error}</p>
  
        }

        let redirectHome=null;
    
        if(isAuth){
    redirectHome=<Redirect to="/home"/>
        }
   
      
        return (
            <div className={classes.Auth}>
            {redirectHome}
                <form onSubmit={this.onSubmitHandler}>
                    {errorMessage}
                <Spinner/>

                <FcInfo className="info" size={32}  onClick={()=>this.hoverInfo()}/>
             <div className="info-wrap">
                 {this.state.infoToggle ? Object.entries(this.state.defaultUser).map((el,i)=>{
                    return <div>{el[1]}</div>
                 }) : null }
             </div>
           
                    {form }
                    <Button btnType="Success">Submit</Button>
                    <Button clicked={this.showSignUp}
                        btnType="Danger">Show {this.state.isSignup ? "Sign In" : "Sign Up"}</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state=>{

    return{

    error:state.auth.error,
    isAuth:state.auth.token !==null


    }

}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
