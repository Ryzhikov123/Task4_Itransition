import {create} from "../services"

const usersRequested = () => {
    return {
        type: 'FETCH_USERS_REQUEST'
    }
}

const usersLoaded = (newUsers) => {
    return {
        type: 'FETCH_USERS_SUCCESS',
        payload: newUsers
    }
}

const usersError = (error) => {
    return {
        type: 'FETCH_USERS_FAILURE',
        payload: error
    }
}

const editUserCheckbox = (userId) => {
    return {
        type: 'EDIT_USER_CHECKBOX',
        payload: userId
    }
}

const editUserAllCheckbox = () => {
    return {
        type: 'EDIT_USER_ALL_CHECKBOX'
    }
}

const fetchUsers = (token) => (dispatch) => {
    dispatch(usersRequested())
    create().getUsers(token)
        .then(({data}) => {
            dispatch(usersLoaded(data))
        })
        .catch((err) => {
                dispatch(usersError(err))
                throw err
            }
        )
}

export {
    usersRequested,
    usersLoaded,
    usersError,
    fetchUsers,
    editUserCheckbox,
    editUserAllCheckbox
}
