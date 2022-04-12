import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

import {editUserCheckbox, editUserAllCheckbox} from "../../actionsCreator"


const LinksList = ({users}) => {
    const [select, setSelect] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setSelect(users.length === users.filter((user) => user.checked === true).length)
    }, [users])

    const checkHandler = (id) => () => {
        dispatch(editUserCheckbox(id))
    }

    const checkAllHandler = () => {
        dispatch(editUserAllCheckbox())
        setSelect(sel => !sel)
    }

    const dateFormat = (dateNow) => {
        if (dateNow) {
            let usaTime = new Date(dateNow).toLocaleString("en-US", {timeZone: "Europe/Minsk"});
            usaTime = new Date(usaTime);
            return usaTime.toLocaleString()
        }
        return dateNow
    }

    return (
        <table className='responsive-table'>
            <thead>
            <tr>
                <td className="main-checkbox">
                    <label>
                        <input
                            type="checkbox"
                            className="filled-in checkbox-blue-grey"
                            checked={select}
                            onChange={checkAllHandler}/>
                        <span/>
                    </label>
                </td>
                <th>ID</th>
                <th>Name</th>
                <th>email</th>
                <th>Date of registration</th>
                <th>Date of last authorization</th>
                <th>Status</th>
            </tr>
            </thead>

            <tbody>
            {users.map((user) => {
                return (
                    <tr key={user.id}>
                        <td className="checkbox-table-row">
                            <label>
                                <input
                                    type="checkbox"
                                    className="filled-in checkbox-blue-grey"
                                    checked={user.checked}
                                    onChange={checkHandler(user.id)}/>
                                <span/>
                            </label>
                        </td>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{dateFormat(user.dateRegister)}</td>
                        <td>{dateFormat(user.dateLastAuthorization)}</td>
                        <td>{user.status}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default LinksList
