import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInfoFormComponent } from './flight-info-form.component';

describe('FlightInfoFormComponent', () => {
  let component: FlightInfoFormComponent;
  let fixture: ComponentFixture<FlightInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightInfoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
