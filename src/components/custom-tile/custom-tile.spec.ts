import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTile } from './custom-tile';

describe('CustomTile', () => {
  let component: CustomTile;
  let fixture: ComponentFixture<CustomTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTile],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomTile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
