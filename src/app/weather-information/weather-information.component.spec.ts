import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherInformationComponent } from './weather-information.component';

describe('WeatherInformationComponent', () => {
  let component: WeatherInformationComponent;
  let fixture: ComponentFixture<WeatherInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
