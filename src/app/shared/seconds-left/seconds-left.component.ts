import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Observable,
  interval,
  map,
  scan,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { DeadlineService } from '../../http-services/deadline.service';
import { DeadlineModel } from '../../models/deadline.model';

@Component({
  selector: 'app-seconds-left',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seconds-left.component.html',
  styleUrl: './seconds-left.component.scss',
})
export class SecondsLeftComponent {
  // Refresh interval in milliseconds (1 second)
  REFRESH_INTERVAL: number = 1000;

  // Observable for the initial deadline data
  initialDeadline$: Observable<DeadlineModel> =
    this.deadlineService.getInitialDeadline();

  // Observable for the initial seconds left from the deadline
  initialSecondsLeft$: Observable<number> = this.initialDeadline$.pipe(
    // In the real world, I'd write better error handling here, but for now || 0 satisfies the transpiler
    map((initialDeadline) => initialDeadline.secondsLeft || 0)
  );

  // Observable for the seconds passed since the initial deadline, triggered to start when API call returned
  secondsSinceIntialDeadline$ = this.initialDeadline$.pipe(
    switchMap(() => interval(this.REFRESH_INTERVAL)),
    startWith(0),
    scan((acc) => acc + 1)
  );

  // Observable for the seconds left until the deadline
  secondsLeft$: Observable<number | undefined> =
    this.secondsSinceIntialDeadline$.pipe(
      withLatestFrom(
        this.initialSecondsLeft$,
        (secondsSinceIntialDeadline, initialSecondsLeft) => ({
          secondsSinceIntialDeadline,
          initialSecondsLeft,
        })
      ),
      map(
        ({ secondsSinceIntialDeadline, initialSecondsLeft }) =>
          initialSecondsLeft - secondsSinceIntialDeadline
      )
    );

  constructor(private deadlineService: DeadlineService) {}
}
