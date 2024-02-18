import React from 'react'
import { UserData } from './Auth'

export default function Profile() {
    return (
        <div>
            <h1>Hello {UserData().res.name}</h1>
        </div>
    )
}
