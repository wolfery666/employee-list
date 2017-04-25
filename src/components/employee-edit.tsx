import * as React from 'react';
import {Link} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {EmployeeStore} from './employee-store';

interface IProps {
  employeeStore?: EmployeeStore;
  employeeGUID?: string;
  history?: any;
  new?: boolean
}
interface IState {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  email_error_text: string;
}

@inject('employeeStore')
@observer
export class EmployeeEdit extends React.Component<IProps, IState> {
  notFound:boolean = false;

  constructor(props) {
    super(props);
    if(this.props.new) {
      this.state = {
        firstname: "",
        lastname: "",
        age: 0,
        email: "",
        email_error_text: "",
      };
      return;
    };
    let current = this.props.employeeStore.find(this.props.employeeGUID);
    if(current == null) {
      this.notFound = true;
      return;
    };
    this.state = {
      firstname: current.name.first,
      lastname: current.name.last,
      age: current.age,
      email: current.email,
      email_error_text: "",
    };
  }
  change(event) {
    if(event.target.id == "firstname" || event.target.id == "lastname") {
      if(!event.target.value.match(/^[A-Za-z]*$/))
        return;
    }
    else if(event.target.id == "age") {
      if(!event.target.value.match(/^(\d){0,3}$/))
        return;
    }
    else if(event.target.id == "email" && this.state.email_error_text != "") {
      if(event.target.value.match(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/))
        this.setState({email_error_text: ""});
    }
    let newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }
  validate(event) {
    if(!event.target.value.match(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/))
      this.setState({email_error_text: "Invalid e-mail format"});
    else
      this.setState({email_error_text: ""});
  }
  save() {
    if(this.state.email_error_text != "")
      return;

    if(this.props.new)
      this.props.employeeStore.add(this.state.firstname, this.state.lastname, this.state.age, this.state.email);
    else
      this.props.employeeStore.edit(this.props.employeeGUID, this.state.firstname, this.state.lastname, this.state.age, this.state.email);
    this.props.history.push('/');
  }

  render() {
    let style = {
      width: 240,
      margin: 'auto',
      marginTop: 20,
      padding: 20,
      textAlign: 'center',
    };
    if(this.notFound) {
      return(
        <Paper style={style}>
          <p>404: Employee not found</p>
          <RaisedButton label="Back" primary={true} containerElement={<Link to='/' />} />
        </Paper>
      )
    };
    style.width = 300;
    return (
      <Paper style={style}>
        {this.props.new ? <p>New</p> : ""}
        <TextField id="firstname" floatingLabelText="First Name" floatingLabelFixed={true} onChange={this.change.bind(this)} value={this.state.firstname} />
        <TextField id="lastname" floatingLabelText="Last Name" floatingLabelFixed={true} onChange={this.change.bind(this)} value={this.state.lastname} />
        <TextField id="age" floatingLabelText="Age" floatingLabelFixed={true} onChange={this.change.bind(this)} value={this.state.age} />
        <TextField id="email" floatingLabelText="E-mail" floatingLabelFixed={true} errorText={this.state.email_error_text} onChange={this.change.bind(this)} onBlur={this.validate.bind(this)} value={this.state.email} />
        <RaisedButton label="Save" primary={true} style={{marginRight: 12,}} onTouchTap={this.save.bind(this)} />
        <RaisedButton label="Back" containerElement={<Link to='/' />} />
      </Paper>
    )}
}