import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkShowComponent } from './link-show.component';

describe('LinkShowComponent', () => {
  let component: LinkShowComponent;
  let fixture: ComponentFixture<LinkShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
