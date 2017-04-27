import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
//import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; // for server variant
import {HashRouter as Router, Route, Link} from 'react-router-dom'; // for local variant
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {EmployeeList} from './components/employee-list';
import {EmployeeEdit} from './components/employee-edit';
import {employeeStore} from './stores/employee-store';

//for material-ui onTouchTap
injectTapEventPlugin();

const muiTheme = getMuiTheme();

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider employeeStore={employeeStore}>
      <Router>
        <div>
          <Route exact path="/" component={EmployeeList} />
          <Route path="/edit/:employeeGUID" component={(props) => (<EmployeeEdit employeeGUID={props.match.params.employeeGUID} history={props.history} />)} />
          <Route path="/new" component={(props) => (<EmployeeEdit new={true} history={props.history} />)} />
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app-container'));