import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhelhMangementComponent } from './whelh-mangement.component';

describe('WhelhMangementComponent', () => {
  let component: WhelhMangementComponent;
  let fixture: ComponentFixture<WhelhMangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhelhMangementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhelhMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
