import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCentreComponent } from './video-centre.component';

describe('VideoCentreComponent', () => {
  let component: VideoCentreComponent;
  let fixture: ComponentFixture<VideoCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
