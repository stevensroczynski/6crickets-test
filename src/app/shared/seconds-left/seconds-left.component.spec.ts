import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';

import { HttpClientModule } from '@angular/common/http';
import { DeadlineService } from '../../http-services/deadline.service';
import { SecondsLeftComponent } from './seconds-left.component';

describe('SecondsLeftComponent', () => {
  let component: SecondsLeftComponent;
  let fixture: ComponentFixture<SecondsLeftComponent>;
  let deadlineService: jasmine.SpyObj<DeadlineService>;

  beforeEach(async () => {
    const deadlineServiceSpy = jasmine.createSpyObj('DeadlineService', [
      'getInitialDeadline',
    ]);
    deadlineServiceSpy.getInitialDeadline.and.returnValue(
      of({ secondsLeft: 120 })
    );

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SecondsLeftComponent],
      providers: [{ provide: DeadlineService, useValue: deadlineServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondsLeftComponent);
    component = fixture.componentInstance;
    deadlineService = TestBed.inject(
      DeadlineService
    ) as jasmine.SpyObj<DeadlineService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct seconds left', (done) => {
    let sub = component.secondsLeft$.subscribe((secondsLeft) => {
      expect(secondsLeft).toBe(120);
      done();
    });
    sub.unsubscribe();
  });

  it('should display the correct seconds left after 10 seconds', fakeAsync(() => {
    let secondsLeft: number = 0; // Initialize with a default value
    let sub = component.secondsLeft$.subscribe((value) => {
      secondsLeft = value || 0;
    });
    tick(10000); // Simulate 10 seconds passing
    fixture.detectChanges();

    expect(secondsLeft).toBe(110); // Assuming the countdown decreases by 1 every second
    sub.unsubscribe();
  }));
});
