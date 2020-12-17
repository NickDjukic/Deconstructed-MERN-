import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/nav_bar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import TeamMembers from './team_members/team_members'
import MainPage from './main/main_page';

const App = () => (
        <div className="page_container">
                <NavBarContainer />
                <Switch>
                        <AuthRoute path="/login" component={LoginFormContainer} />
                        <AuthRoute path="/signup" component={SignupFormContainer} />
                        <Route path="/members" component={TeamMembers} />
                </Switch>
                <Route path="/" component={MainPage} />
        </div>
);

export default App;