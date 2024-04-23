import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulatiionSujetComponent } from './postulatiion-sujet.component';

describe('PostulatiionSujetComponent', () => {
  let component: PostulatiionSujetComponent;
  let fixture: ComponentFixture<PostulatiionSujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostulatiionSujetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostulatiionSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
