import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyconventionsComponent } from './myconventions.component';

describe('MyconventionsComponent', () => {
  let component: MyconventionsComponent;
  let fixture: ComponentFixture<MyconventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyconventionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyconventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
