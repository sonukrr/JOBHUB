import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdialogComponent } from './jobdialog.component';

describe('JobdialogComponent', () => {
  let component: JobdialogComponent;
  let fixture: ComponentFixture<JobdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
