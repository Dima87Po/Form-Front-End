import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndFormComponent } from './front-end-form.component';

describe('FrontEndFormComponent', () => {
  let component: FrontEndFormComponent;
  let fixture: ComponentFixture<FrontEndFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontEndFormComponent]
    });
    fixture = TestBed.createComponent(FrontEndFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
