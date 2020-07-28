import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAnalyticComponent } from './project-analytic.component';

describe('ProjectAnalyticComponent', () => {
  let component: ProjectAnalyticComponent;
  let fixture: ComponentFixture<ProjectAnalyticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAnalyticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
