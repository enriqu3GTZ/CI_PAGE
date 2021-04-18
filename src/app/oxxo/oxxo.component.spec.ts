import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxxoComponent } from './oxxo.component';

describe('OxxoComponent', () => {
  let component: OxxoComponent;
  let fixture: ComponentFixture<OxxoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OxxoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OxxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
