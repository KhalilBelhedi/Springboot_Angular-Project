import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichPostulationComponent } from './affich-postulation.component';

describe('AffichPostulationComponent', () => {
  let component: AffichPostulationComponent;
  let fixture: ComponentFixture<AffichPostulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AffichPostulationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichPostulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
