import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhelleAddNewComponent } from './whelle-add-new.component';

describe('WhelleAddNewComponent', () => {
  let component: WhelleAddNewComponent;
  let fixture: ComponentFixture<WhelleAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhelleAddNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhelleAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
