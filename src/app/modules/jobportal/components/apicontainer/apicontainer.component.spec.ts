import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApicontainerComponent } from './apicontainer.component';

describe('ApicontainerComponent', () => {
  let component: ApicontainerComponent;
  let fixture: ComponentFixture<ApicontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApicontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApicontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
