import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdacteComponent } from './prodacte.component';

describe('ProdacteComponent', () => {
  let component: ProdacteComponent;
  let fixture: ComponentFixture<ProdacteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdacteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdacteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
