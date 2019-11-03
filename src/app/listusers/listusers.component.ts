import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {

  usersDB:any[] = [];
  // Section = 0, list all
  // Section = 1, edit one
  section:number = 0;
  user:any = {
    _id: "",
    name: "",
    balance: 0
  };
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.dbService.getUsers().subscribe((data:any[])=>{
      this.usersDB = data;
    });
  }

  editUser(user){
    this.user = user;
    this.section = 1;
  }

  updateUser(){
    this.dbService.updateUser(this.user._id, this.user).subscribe((result)=>{
      this.getUsers();
      this.section = 0;
    })
  }

  deleteUser(){
    this.dbService.deleteUser(this.user._id).subscribe((result)=>{
      this.getUsers();
      this.section = 0;
    })
  }
}
