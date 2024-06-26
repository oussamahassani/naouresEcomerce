import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdactePayedComponent } from './prodactePayed.component';

describe('ProdacteComponent', () => {
  let component: ProdactePayedComponent;
  let fixture: ComponentFixture<ProdactePayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdactePayedComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProdactePayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
