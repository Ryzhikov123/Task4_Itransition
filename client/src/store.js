import {createStore} from 'redux'
import reducer from "./reducers/index"
import thunk from "redux-thunk"
import {applyMiddleware} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store
