import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-listpurchases',
  templateUrl: './listpurchases.component.html',
  styleUrls: ['./listpurchases.component.css']
})
export class ListpurchasesComponent implements OnInit {

  purchasesDB:any[] = [];

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.dbService.getPurchases().subscribe((data:any[])=>{
      this.purchasesDB = data;
    });
  }
}
