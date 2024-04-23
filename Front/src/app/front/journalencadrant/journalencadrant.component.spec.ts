import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalencadrantComponent } from './journalencadrant.component';

describe('JournalencadrantComponent', () => {
  let component: JournalencadrantComponent;
  let fixture: ComponentFixture<JournalencadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JournalencadrantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournalencadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
