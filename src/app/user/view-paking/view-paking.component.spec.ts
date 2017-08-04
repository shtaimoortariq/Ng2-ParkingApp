import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPakingComponent } from './view-paking.component';

describe('ViewPakingComponent', () => {
  let component: ViewPakingComponent;
  let fixture: ComponentFixture<ViewPakingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPakingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
