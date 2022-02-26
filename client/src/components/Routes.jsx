import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Cree from '../pages/cree-une-sence'
import Etudiant from '../pages/etudiant'
import Profile from '../pages/profile'
import Presedente from '../pages/seance-precedente'
import Qrcode from '../pages/qrcode'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/cree-une-seance' component={Cree}/>
            <Route path='/etudiant' component={Etudiant}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/seance-precedente' component={Presedente}/>
            <Route path='/generate-qr-code' component={Qrcode}/>
        </Switch>
    )
}

export default Routes
