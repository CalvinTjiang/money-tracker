import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-listcategories',
  templateUrl: './listcategories.component.html',
  styleUrls: ['./listcategories.component.css']
})
export class ListcategoriesComponent implements OnInit {

  private categoriesDB:any[] = [];
  // Section = 0, list all
  // Section = 1, edit one
  private section:number = 0;
  private category:any = {
    _id: "",
    name: "",
    type: ""
  };
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.dbService.getCategories(true).subscribe((data:any[])=>{
      this.categoriesDB = data;
    });
  }
  editCategory(category){
    this.category = category;
    this.section = 1;
  }

  updateCategory(){
    this.dbService.updateCategory(this.category._id, this.category).subscribe((result)=>{
      this.getCategories();
      this.section = 0;
    })
  }

  deleteCategory(){
    this.dbService.deleteCategory(this.category._id).subscribe((result)=>{
      this.getCategories();
      this.section = 0;
    })
  }
}