import React, { useEffect } from 'react'
import { isLoggedIn } from './Auth'

export default function Home() {
    useEffect(() => {
        isLoggedIn();
    },[])
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}
