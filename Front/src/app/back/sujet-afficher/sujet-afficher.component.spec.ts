import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetAfficherComponent } from './sujet-afficher.component';

describe('SujetAfficherComponent', () => {
  let component: SujetAfficherComponent;
  let fixture: ComponentFixture<SujetAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SujetAfficherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SujetAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
