import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedBackComponent } from './view-feed-back.component';

describe('ViewFeedBackComponent', () => {
  let component: ViewFeedBackComponent;
  let fixture: ComponentFixture<ViewFeedBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFeedBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeedBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
