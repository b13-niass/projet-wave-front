import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanqueCodeComponent } from './banque-code.component';

describe('BanqueCodeComponent', () => {
  let component: BanqueCodeComponent;
  let fixture: ComponentFixture<BanqueCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanqueCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanqueCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
