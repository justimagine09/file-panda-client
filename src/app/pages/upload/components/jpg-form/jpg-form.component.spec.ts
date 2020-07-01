import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JpgFormComponent } from './jpg-form.component';

describe('JpgFormComponent', () => {
  let component: JpgFormComponent;
  let fixture: ComponentFixture<JpgFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JpgFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JpgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
