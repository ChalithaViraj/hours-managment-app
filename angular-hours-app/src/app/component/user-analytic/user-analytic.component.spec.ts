import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnalyticComponent } from './user-analytic.component';

describe('UserAnalyticComponent', () => {
  let component: UserAnalyticComponent;
  let fixture: ComponentFixture<UserAnalyticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAnalyticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
