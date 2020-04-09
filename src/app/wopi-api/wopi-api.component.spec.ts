import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WopiApiComponent } from './wopi-api.component';

describe('WopiApiComponent', () => {
  let component: WopiApiComponent;
  let fixture: ComponentFixture<WopiApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WopiApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WopiApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
