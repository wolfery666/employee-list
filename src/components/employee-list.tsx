import * as React from 'react';
import {Link} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import {EmployeeStore} from './employee-store';

@inject('employeeStore')
@observer
export class EmployeeList extends React.Component<{employeeStore: EmployeeStore}, {}> {
  render() {
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>&#35;</TableHeaderColumn>
            <TableHeaderColumn>First Name</TableHeaderColumn>
            <TableHeaderColumn>Last Name</TableHeaderColumn>
            <TableHeaderColumn>Age</TableHeaderColumn>
            <TableHeaderColumn>E-mail</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows={true}>
          {this.props.employeeStore.items.map((employee, index) => {
            return(<TableRow key={employee.guid}>
              <TableRowColumn>{index+1}</TableRowColumn>
              <TableRowColumn>{employee.name.first}</TableRowColumn>
              <TableRowColumn>{employee.name.last}</TableRowColumn>
              <TableRowColumn>{employee.age}</TableRowColumn>
              <TableRowColumn>{employee.email}</TableRowColumn>
              <TableRowColumn>
                <RaisedButton label="Edit" primary={true} style={{marginRight: 12,}} containerElement={<Link to={'/edit/'+employee.guid} />} />
                <RaisedButton label="Delete" secondary={true} onTouchTap={() => this.props.employeeStore.delete(employee.guid)} />
              </TableRowColumn>
            </TableRow>)})}
        </TableBody>
        <TableFooter adjustForCheckbox={false}>
          <TableRow>
           <TableRowColumn colSpan="6">
             <RaisedButton label="Add" primary={true} containerElement={<Link to='/new' />} />
           </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}