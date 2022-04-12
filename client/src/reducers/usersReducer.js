const initialState = {
    loading: false,
    error: null,
    users: []
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'FETCH_USERS_REQUEST': {

            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_USERS_SUCCESS': {

            const users = action.payload
                .map(user => ({...user, checked: false}))

            return {
                ...state,
                loading: false,
                users
            }
        }

        case 'FETCH_USERS_FAILURE': {

            return {
                ...state,
                error: action.payload
            }
        }

        case 'EDIT_USER_CHECKBOX': {

            const id = action.payload
            const {users} = state
            const idxEditedUser = users.findIndex((item) => item.id === id)

            return {
                ...state,
                users: [
                    ...users.slice(0, idxEditedUser),
                    {
                        ...users[idxEditedUser],
                        checked: !users[idxEditedUser].checked
                    },
                    ...users.slice(idxEditedUser + 1)
                ]
            }
        }

        case 'EDIT_USER_ALL_CHECKBOX': {

            const {users} = state

            let checkbox = true
            for (let i = 0; i < users.length; i++) {
                if (users[i].checked === false) {
                    checkbox = true
                    break
                }
                checkbox = false
            }

            const newUsers = state.users
                .map((user) => {
                    return {
                        ...user,
                        checked: checkbox
                    }
                })

            return {
                ...state,
                users: newUsers
            }
        }

        default:
            return state
    }
}

export default usersReducer
