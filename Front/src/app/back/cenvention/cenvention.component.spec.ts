import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenventionComponent } from './cenvention.component';

describe('CenventionComponent', () => {
  let component: CenventionComponent;
  let fixture: ComponentFixture<CenventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CenventionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CenventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
