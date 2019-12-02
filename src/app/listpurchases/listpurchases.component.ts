import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-listpurchases',
  templateUrl: './listpurchases.component.html',
  styleUrls: ['./listpurchases.component.css']
})
export class ListpurchasesComponent implements OnInit {

  purchasesDB:any[] = [];
  usersDB:any[] = [];
  storesDB:any[] = [];
  categoriesDB:any[] = [];

  purchase:any = {
    _id: "",
    date: new Date(),
    user: {
      _id: "",
      name: "",
    },
    store: {
      _id: "",
      name: "",
    },
    paymentType: "",
    outcome: 0,
    income: 0,
    category: {
      _id: "",
      name: "",
    },
    memo: ""
  };

  section = 0;
  
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.getPurchases();
  }

  getPurchases(){
    this.dbService.getPurchases().subscribe((data:any[])=>{
      this.purchasesDB = data;
    });
  }

  getUsers() {
    this.dbService.getUsers().subscribe((data:any[])=>{
      this.usersDB = data;
    });
  }

  getCategories(){
    this.dbService.getCategories(true).subscribe((data:any[])=>{
      this.categoriesDB = data;
    });
  }
  
  getStores(){
    this.dbService.getStores().subscribe((data:any[])=>{
      this.storesDB = data;
    });
  }

  editPurchase(purchase){
    this.getUsers();
    this.getCategories();
    this.getStores();
    this.purchase = purchase;
    this.section = 1;
  }

  addPurchase(){
    this.getUsers();
    this.getCategories();
    this.getStores();
    this.purchase = {
      _id: "",
      date: new Date(),
      user: {
        _id: "",
        name: "",
      },
      store: {
        _id: "",
        name: "",
      },
      paymentType: "",
      outcome: 0,
      income: 0,
      category: {
        _id: "",
        name: "",
      },
      memo: ""
    };
    this.section = 2;
  }

  updatePurchase(){
    this.dbService.updatePurchase(this.purchase._id, this.purchase).subscribe((result)=>{
      this.getPurchases();
      this.section = 0;
    })
  }

  deletePurchase(){
    this.dbService.deletePurchase(this.purchase._id).subscribe((result)=>{
      this.getPurchases();
      this.section = 0;
    })
  }

  createPurchase(){
    let newPurchase = {
      date: this.purchase.date,
      user: this.purchase.user._id,
      store: this.purchase.store._id,
      paymentType: this.purchase.paymentType,
      outcome: this.purchase.outcome,
      income: this.purchase.income,
      category: this.purchase.category._id,
      memo: this.purchase.memo
    };
    this.dbService.createPurchase(newPurchase).subscribe((result)=>{
      this.getPurchases();
      this.section = 0;
    })
  }
}
