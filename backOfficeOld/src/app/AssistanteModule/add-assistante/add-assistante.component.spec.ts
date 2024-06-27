import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssistanteComponent } from './add-assistante.component';

describe('AddAssistanteComponent', () => {
  let component: AddAssistanteComponent;
  let fixture: ComponentFixture<AddAssistanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAssistanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAssistanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
