import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListstoresComponent } from './liststores.component';

describe('ListstoreComponent', () => {
  let component: ListstoresComponent;
  let fixture: ComponentFixture<ListstoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListstoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListstoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
