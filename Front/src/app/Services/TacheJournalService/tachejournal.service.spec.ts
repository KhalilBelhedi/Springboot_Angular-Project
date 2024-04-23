import { TestBed } from '@angular/core/testing';

import { TacheJournalService } from './tachejournal.service';

describe('TachejournalService', () => {
  let service: TacheJournalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TacheJournalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
