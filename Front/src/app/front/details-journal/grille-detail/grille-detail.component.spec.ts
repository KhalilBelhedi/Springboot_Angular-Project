import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleDetailComponent } from './grille-detail.component';

describe('GrilleDetailComponent', () => {
  let component: GrilleDetailComponent;
  let fixture: ComponentFixture<GrilleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrilleDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrilleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
