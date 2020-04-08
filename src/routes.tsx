import React from 'react'
import { Route, Switch, BrowserRouter} from 'react-router-dom'
import HomePage from './pages/HomePage'
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={HomePage}/>
            </Switch>
        </BrowserRouter>
    )
}