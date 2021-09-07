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
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Route path="/search" exact>
                    <SearchPage />
                </Route>
                <Route path="/cabinet" exact>
                    <CabinetPage />
                </Route>
                <Route path="/vehile" exact>
                    <VehilePage />
                </Route>
                <Route path="/cargo" exact>
                    <CargoPage />
                </Route>
                <Route path="/start" exact>
                    <StartPage />
                </Route>
                <Route path="/subscribe" exact>
                    <SubscribePage />
                </Route>
                <Redirect to="/search" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Route path="/loginCreate" exact>
                <LoginCreate />
            </Route>
            <Route path="/register" exact>
                <RegisterPage />
            </Route>
            <Route path="/search" exact>
                    <SearchPage />
            </Route>
            <Redirect to="/search" />
        </Switch>
    )
}