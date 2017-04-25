///<reference path="./typings.d.ts" />
import {EmployeeStore} from '../components/employee-store';
import * as db from './mates.json';

export const employeeStore = new EmployeeStore(db);