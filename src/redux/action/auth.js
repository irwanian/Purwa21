export const registrationSuccess= (data) => {
    return{
        type : 'LOGIN_SUCCESS',
        payload : data
    }
}

export const onLogout = () => {
    return{
        type : 'LOG_OUT',       
    }
}

export const addCart = () => {
    return{
        type : 'TAMBAH'
    }
}