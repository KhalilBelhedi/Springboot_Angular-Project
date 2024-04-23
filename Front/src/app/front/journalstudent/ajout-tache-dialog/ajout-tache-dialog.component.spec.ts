import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTacheDialogComponent } from './ajout-tache-dialog.component';

describe('AjoutTacheDialogComponent', () => {
  let component: AjoutTacheDialogComponent;
  let fixture: ComponentFixture<AjoutTacheDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutTacheDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutTacheDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
