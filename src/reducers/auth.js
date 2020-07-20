import * as actionTypes from '../store/actions/index'



const initialState = {
    token: null,
    userID: null,
    error: null,
    loading: false

}

const authStart = (state, action) => {

    return Object.assign({}, state, { error: null, loading: true })

}
const authSuccess = (state, action) => {

    return {
        ...state, token: action.IdToken,
        userID: action.userId,
        error: null,
        loading: false
    }

}

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    };
};
const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        userID: null
    }
}
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action)


        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)

        case actionTypes.AUTH_FAIL:
            return authFail(state, action)
        case actionTypes.AUTH_LOGOUT:

            return authLogout(state, action)

        default: console.log(state)

            return state;
    }

}


export default reducer




