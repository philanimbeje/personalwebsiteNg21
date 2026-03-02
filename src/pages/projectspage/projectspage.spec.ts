import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projectspage } from './projectspage';

describe('Projectspage', () => {
  let component: Projectspage;
  let fixture: ComponentFixture<Projectspage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projectspage],
    }).compileComponents();

    fixture = TestBed.createComponent(Projectspage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
