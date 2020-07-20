import Axios from "axios";

export  const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_START = "AUTH_START";
export const AUTH_LOGOUT= "AUTH_LOGOUT";

export const authStart = () => {
    return {
        type: AUTH_START
    }



}
export const fail =(error)=>{

    return{
        type: AUTH_FAIL,
        error: error
    }
}
export const authFail = (error) => {
    return (dispatch,getState)=>{
 
       
        console.log(error+"getstate")
        dispatch(fail(error));

   
    }



}
export const authSucces = (idToken,userID) => {
    return {
        type: AUTH_SUCCESS,
        idToken:idToken,
        userID:userID
    }



}

export const authLogout= ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');

    return {
        type: AUTH_LOGOUT,
      

    }

}
export const checkAuthTimeout = (expTime)=>{
    return (dispatch, getState) =>{
        setTimeout(()=>{
          dispatch(authLogout())
         

        },expTime * 1000)

    }


}

export const authCheckState=()=>{
return dispatch =>{
    const token= localStorage.getItem('token');
    const userID= localStorage.getItem('userID');

    if(!token){
        dispatch(authLogout());
    }else{
        const expirationDate= new Date(localStorage.getItem('expirationDate'));
        if(expirationDate > new Date()){
            dispatch(authSucces(token,userID));
        }else{
            dispatch(authLogout());
            dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/ 100))
        }
    }
}

}

export const auth = (email,password,isSignup) => {
    return dispatch =>{
            dispatch(authStart());
            const authedData={
                email:email,
                password:password,
                returnSecureToken:true

            }

            let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSqYglF6YxinCgGChAf5UWfphfylBsUl0";
            if(!isSignup){
                url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSqYglF6YxinCgGChAf5UWfphfylBsUl0"
            }
            Axios.post(url,authedData)
            .then(response=>{
                const expirationDate= new Date(new Date().getTime() + response.data.expiresIn * 1000);

                    
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userID',response.data.localId)
                dispatch(authSucces(response.data.idToken, response.data.localId))
                console.log(response+"expires in")
                dispatch(checkAuthTimeout(response.data.expiresIn))

            })
            .catch(err=>{
                console.log(err.response.data.error.message+"error")
                dispatch(authFail(err.response.data.error.message))
            } )

    
        }



}
