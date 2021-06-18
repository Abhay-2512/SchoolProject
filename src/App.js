import React from 'react';
import LoginAccountPage from './Components/LoginAccountPage/LoginAccountPage';
import CreateAccountPage from './Components/CreateAccountPage/CreateAccountPage';
import CommonPage from './Components/CommonPage/CommonPage';
import { Redirect, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div>
    <Switch>
    <Route exact path="/loginAccountPage" render={()=> <LoginAccountPage text="LoginAccountPage" />} ></Route>

    <Route exact path="/createAccountPage"  render={()=> <CreateAccountPage text="CreateAccountPage" />} ></Route>

    <Route exact path="/commonPage/addStudent" render={()=><CommonPage text="addStudent" />} ></Route>

    <Route exact path="/commonPage/editStudentData/:id" render={()=><CommonPage text="editStudentData" />} ></Route>

    <Route exact path="/commonPage" render={()=><CommonPage text="viewStudent" />} ></Route>
    
    <Redirect to="/loginAccountPage"></Redirect>
    </Switch>
    </div>
  );
}

export default App;
