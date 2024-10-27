import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactTransfertComponent } from './new-contact-transfert.component';

describe('NewContactTransfertComponent', () => {
  let component: NewContactTransfertComponent;
  let fixture: ComponentFixture<NewContactTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewContactTransfertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewContactTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
