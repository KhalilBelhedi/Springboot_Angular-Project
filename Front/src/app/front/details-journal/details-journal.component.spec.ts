import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsJournalComponent } from './details-journal.component';

describe('DetailsJournalComponent', () => {
  let component: DetailsJournalComponent;
  let fixture: ComponentFixture<DetailsJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsJournalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
