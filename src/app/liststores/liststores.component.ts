import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-liststores',
  templateUrl: './liststores.component.html',
  styleUrls: ['./liststores.component.css']
})
export class ListstoresComponent implements OnInit {

  private storesDB:any[] = [];
  // Section = 0, list all
  // Section = 1, edit one
  private section:number = 0;
  private store:any = {
    _id: "",
    name: "",
    type: ""
  };
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.getStores();
  }

  getStores(){
    this.dbService.getStores().subscribe((data:any[])=>{
      this.storesDB = data;
    });
  }
  editStore(store){
    this.store = store;
    this.section = 1;
  }

  updateStore(){
    this.dbService.updateStore(this.store._id, this.store).subscribe((result)=>{
      this.getStores();
      this.section = 0;
    })
  }

  deleteStore(){
    this.dbService.deleteStore(this.store._id).subscribe((result)=>{
      this.getStores();
      this.section = 0;
    })
  }
}
