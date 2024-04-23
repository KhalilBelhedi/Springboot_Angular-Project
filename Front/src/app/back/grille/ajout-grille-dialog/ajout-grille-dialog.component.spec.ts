import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutGrilleDialogComponent } from './ajout-grille-dialog.component';

describe('AjoutGrilleDialogComponent', () => {
  let component: AjoutGrilleDialogComponent;
  let fixture: ComponentFixture<AjoutGrilleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutGrilleDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutGrilleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
