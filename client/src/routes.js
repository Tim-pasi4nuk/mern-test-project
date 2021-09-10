import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import { StartPage } from "./pages/StartPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { SearchPage } from "./pages/SearchPage"
import { CabinetPage } from "./pages/CabinetPage"
import { CargoPage } from "./pages/CargoPage"
import { VehilePage } from "./pages/VehilePage"
import { LoginCreate } from "./pages/LoginCreatepage"
import { SubscribePage }  from "./pages/SubscribePage"
export const useRoutes = IsAuthenticated => {
    if (IsAuthenticated){
        return (
            <Switch>
                <Route path="/links" >
                    <LinksPage />
                </Route>
                <Route path="/create">
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Route path="/search" >
                    <SearchPage />
                </Route>
                <Route path="/cabinet" >
                    <CabinetPage />
                </Route>
                <Route path="/vehile" >
                    <VehilePage />
                </Route>
                <Route path="/cargo" >
                    <CargoPage />
                </Route>
                <Route path="/start" exact>
                    <StartPage />
                </Route>
                <Route path="/SubscribePage" >
                    <SubscribePage />
                </Route>
                <Redirect to="/start" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login" >
                <LoginPage />
            </Route>
            <Route path="/loginCreate">
                <LoginCreate />
            </Route>
            <Route path="/register">
                <RegisterPage />
            </Route>
            <Route path="/search">
                    <SearchPage />
            </Route>
            <Redirect to="/start" />
        </Switch>
    )
}