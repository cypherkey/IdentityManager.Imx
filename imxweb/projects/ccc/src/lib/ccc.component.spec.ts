import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CccComponent } from './ccc.component';

describe('CccComponent', () => {
  let component: CccComponent;
  let fixture: ComponentFixture<CccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
