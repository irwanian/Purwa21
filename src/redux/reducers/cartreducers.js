const INITIAL_STATE =  {
    cart : 0
}

var cartReducer = (state = INITIAL_STATE, action) =>{
    if(action.type === 'TAMBAH'){
        return {...state, cart : state.cart + 1}
    }else{return state}
}

export default cartReducer