import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpurchasesComponent } from './listpurchases.component';

describe('ListpurchasesComponent', () => {
  let component: ListpurchasesComponent;
  let fixture: ComponentFixture<ListpurchasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpurchasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
