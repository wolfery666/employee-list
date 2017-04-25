import * as uuid from 'uuid';
import {observable, computed, action, useStrict} from 'mobx';

useStrict(true);

class Name {
  first: string;
  last: string;
}

class Employee {
  guid: string;
  name: Name;
  age: number;
  email: string;
  constructor() {
    this.name = new Name();
  }
}

export class EmployeeStore {
  @observable items: Employee[] = [];
  constructor(initialState: any) {
    while(initialState.length > 0)
      this.items.push(Object.assign(new Employee(), initialState.shift()));
  }
  
  find = (guid: string) => {
    return this.items.find(value => value.guid === guid);
  }
  assign = (employee: Employee, firstname: string, lastname: string, age: number, email: string) => {
    employee.name.first = firstname;
    employee.name.last = lastname;
    employee.age = age;
    employee.email = email
  }
  @action
  add = (firstname: string, lastname: string, age: number, email: string) => {
    let employee = new Employee();
    employee.guid = uuid.v4();
    this.assign(employee, firstname, lastname, age, email);
    this.items.push(employee);
  }
  @action
  edit = (guid: string, firstname: string, lastname: string, age: number, email: string) => {
    let current = this.find(guid);
    if(current == null) return;

    this.assign(current, firstname, lastname, age, email);
  }
  @action
  delete = (guid: string) => {
    this.items = this.items.filter(value => value.guid !== guid);
  }
}