import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveconventionComponent } from './archiveconvention.component';

describe('ArchiveconventionComponent', () => {
  let component: ArchiveconventionComponent;
  let fixture: ComponentFixture<ArchiveconventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchiveconventionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchiveconventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
