import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mp4FormComponent } from './mp4-form.component';

describe('Mp4FormComponent', () => {
  let component: Mp4FormComponent;
  let fixture: ComponentFixture<Mp4FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mp4FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mp4FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
