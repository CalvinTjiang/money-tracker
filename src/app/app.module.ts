import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from "@angular/router";
// Service
import { DatabaseService } from './database.service'

// Component
import { AppComponent } from './app.component';
import { ListpurchasesComponent } from './listpurchases/listpurchases.component';
import { ListusersComponent } from './listusers/listusers.component';
import { ListstoresComponent } from './liststores/liststores.component';
import { ListcategoriesComponent } from './listcategories/listcategories.component';

const appRoutes: Routes = [
  { path: "purchases", component: ListpurchasesComponent },
  { path: "users", component: ListusersComponent },
  { path: "stores", component: ListstoresComponent },
  { path: "categories", component: ListcategoriesComponent },
  { path: "", redirectTo: "/purchases", pathMatch: "full" },
];

@NgModule({
  declarations: [
    AppComponent,
    ListpurchasesComponent,
    ListusersComponent,
    ListstoresComponent,
    ListcategoriesComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
