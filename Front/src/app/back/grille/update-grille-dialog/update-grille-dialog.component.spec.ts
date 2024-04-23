import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGrilleDialogComponent } from './update-grille-dialog.component';

describe('UpdateGrilleDialogComponent', () => {
  let component: UpdateGrilleDialogComponent;
  let fixture: ComponentFixture<UpdateGrilleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateGrilleDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateGrilleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
