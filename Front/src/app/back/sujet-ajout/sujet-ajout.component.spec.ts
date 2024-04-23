import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetAjoutComponent } from './sujet-ajout.component';

describe('SujetAjoutComponent', () => {
  let component: SujetAjoutComponent;
  let fixture: ComponentFixture<SujetAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SujetAjoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SujetAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
