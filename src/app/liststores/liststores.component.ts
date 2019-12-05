import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-liststores',
  templateUrl: './liststores.component.html',
  styleUrls: ['./liststores.component.css']
})
export class ListstoresComponent implements OnInit {

  storesDB:any[] = [];
  // Section = 0, list all
  // Section = 1, edit one
  section:number = 0;
  store:any = {
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

  addStore(){
    this.store = {
      _id: "",
      name: "",
      type: ""
    };
    this.section = 2;
  }

  defaultStore(){
    let store:any;
    console.log(this.storesDB);
    for (store of this.storesDB){
      if (store.isDefault){
        return store;
      }
    }
  }

  updateStore(){
    this.dbService.updateStore(this.store._id, this.store).subscribe((result)=>{
      this.getStores();
      this.section = 0;
    })
  }

  deleteStore(){
    this.dbService.deleteStore(this.store._id).subscribe((result)=>{
      let update = {
        id: this.defaultStore()._id
      };
      this.dbService.updatePurchaseStore(this.store._id, update).subscribe((result)=>{
        this.getStores();
        this.section = 0;
      });
    })
  }

  createStore(){
    let newStore = {
      name: this.store.name,
      type: this.store.type
    }
    this.dbService.createStore(newStore).subscribe((result)=>{
      this.getStores();
      this.section = 0;
    })
  }
}
