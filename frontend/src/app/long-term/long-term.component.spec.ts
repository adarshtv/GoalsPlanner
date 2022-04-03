import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermComponent } from './long-term.component';

describe('LongTermComponent', () => {
  let component: LongTermComponent;
  let fixture: ComponentFixture<LongTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongTermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
