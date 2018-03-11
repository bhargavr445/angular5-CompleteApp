import { Component, OnInit } from '@angular/core';
import { AppService } from '../AppService';
import { Student } from '../student';
import { EmployeeService } from './employee-service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Employee } from '../employee';
import { error } from 'util';
declare var $;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  Employees: Employee[];
  employee: Employee;
  Students: Student[];
  signUpForm: FormGroup;
  employeeEditForm: FormGroup;
  showFormToAdd:boolean=false;
  hideButton:boolean=false;
  genders = ['male', 'female'];
  empTable: boolean= true;
  showEmployeeEditForm: boolean= false;
  addResult:number;

  constructor(private employeeService: EmployeeService) {
      this.getAllStudents();
      setTimeout( function(){
        $(function(){
          $('#dt').DataTable();
        });
      }, 2000);
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
  		'id': new FormControl(null, Validators.required),
  		'employee_name' : new FormControl(null, Validators.required),
  		'employee_sal' : new FormControl(null, Validators.required),
      'employee_age': new FormControl(null, Validators.required),
      'employee_profile_pic': new FormControl(null, Validators.required)
    });
    
    this.employeeEditForm = new FormGroup({
  		'id': new FormControl(null, Validators.required),
  		'name' : new FormControl(null, Validators.required),
  		'sal' : new FormControl(null, Validators.required),
      'age': new FormControl(null, Validators.required),
      'profile_pic': new FormControl(null, Validators.required)
  	});
  }

  getAllStudents(){
    this.employeeService.getAllStudents().subscribe(
      (data)=> 
          {
              this.Employees=data
           }
          );
      this.hideButton=true;
  }

  clearAllStudents(){
    this.Employees=null;
    this.hideButton=false;
    this.showFormToAdd=false;
  }

  AddForm(){
    this.showFormToAdd=true;
  }

  editEmployee(id){
    this.empTable=false;
    this.employeeService.getDataToEdit(id).subscribe(
      (eData:any)=>this.printEmpData(eData),
      (error)=> console.log(error)
    );
    this.showEmployeeEditForm=true;
  }

  printEmpData(emp: Employee){
    this.employee=emp;
    this.employeeEditForm.setValue({
      id:emp.id,
      name:emp.employee_name,
      age:emp.employee_age,
      sal:'12',//emp.employee_sal,
      profile_pic:'hello'
    });
  }

  onEdit(){
    this.showEmployeeEditForm=false;
    this.empTable=true;
    //console.log(this.employeeEditForm.value);
    this.employeeService.updateEmp(this.employeeEditForm.value).subscribe(
      (result:any)=>console.log("Update Response"),
      (error)=>console.log(error)
    );
    this.getAllStudents();
  }
  submitNewEmployee(){
    //console.log(this.signUpForm.value);
     this.employeeService.addNewStudent(this.signUpForm.value).subscribe(
      (addResponse:any)=>this.addResult=addResponse,
      (error)=>console.log(error)
    );
  }
}
