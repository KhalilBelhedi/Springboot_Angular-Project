import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalstudentComponent } from './journalstudent.component';

describe('JournalstudentComponent', () => {
  let component: JournalstudentComponent;
  let fixture: ComponentFixture<JournalstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JournalstudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournalstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
