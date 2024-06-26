import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackAddComponent } from './pack-add.component';

describe('PackAddComponent', () => {
  let component: PackAddComponent;
  let fixture: ComponentFixture<PackAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
