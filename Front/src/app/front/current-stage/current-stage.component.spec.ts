import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStageComponent } from './current-stage.component';

describe('CurrentStageComponent', () => {
  let component: CurrentStageComponent;
  let fixture: ComponentFixture<CurrentStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
