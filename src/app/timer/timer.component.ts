import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TimerService } from './timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init: number = 20;
  private countdownEndSubscription: Subscription = null;
  private countdownSubscription: Subscription = null;
  public countdown: number = 0;

  get progress() {
    return (this.init - this.countdown) / this.init * 100;
  }

  constructor(public timer: TimerService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.timer.restartCountdown(this.init);

    this.countdownSubscription = this.timer.countdown$.subscribe((data) => {
      this.countdown = data;
      this.cdRef.markForCheck();
    });

    this.countdownEndSubscription = this.timer.countdownEnd$.subscribe(() => {
      this.onComplete.emit();
    });
  }

  ngOnDestroy(): void {
    this.timer.destroy();
    this.countdownEndSubscription.unsubscribe();
  }
}
