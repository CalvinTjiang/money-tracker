import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-listcategories',
  templateUrl: './listcategories.component.html',
  styleUrls: ['./listcategories.component.css']
})
export class ListcategoriesComponent implements OnInit {

  categoriesDB:any[] = [];
  // Section = 0, list all
  // Section = 1, edit one
  section:number = 0;
  category:any = {
    _id: "",
    name: "",
    supercategory: {
      _id: "",
      name: ""
    }
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

  addCategory(){
    this.category = {
      _id: "",
      name: "",
      supercategory: {
        _id: undefined,
        name: ""
      }
    };
    this.section = 2;
  }

  defaultCategory(){
    let category:any;
    console.log(this.categoriesDB);
    for (category of this.categoriesDB){
      if (category.isDefault){
        return category;
      }
    }
  }
  updateCategory(){
    this.dbService.updateCategory(this.category._id, this.category).subscribe((result)=>{
      this.getCategories();
      this.section = 0;
    })
  }

  deleteCategory(){
    this.dbService.deleteCategory(this.category._id).subscribe((result)=>{
      let update = {
        id: this.defaultCategory()._id
      };
      this.dbService.updatePurchaseCategory(this.category._id, update).subscribe((result)=>{
        this.getCategories();
        this.section = 0;
      })
    })
  }

  createCategory(){
    let newCategory = {
      name: this.category.name,
      supercategory: this.category.supercategory._id
    }
    this.dbService.createCategory(newCategory).subscribe((result)=>{
      this.getCategories();
      this.section = 0;
    })
  }
}