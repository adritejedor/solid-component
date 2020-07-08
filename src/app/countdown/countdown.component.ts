import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {

  @Input() init: number = null;
  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<number>();
  public counter: number = 0;
  private countdownTimerRef: any = null;


  constructor() { }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnChanges(changes){
    console.log('init value updated to', changes.init.currentValue);
    this.startCountdown();
  }

  startCountdown() {
    if (this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown() {
    this.countdownTimerRef = setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountdown();
    }, 1000);
  }

  processCountdown() {
    this.onDecrease.emit(this.counter)
    console.log('cuenta actual: ', this.counter);
    if (this.counter == 0) {
      this.onComplete.emit();
      console.log('counter end');
    } else {
      this.doCountdown();
    }
  }

  private clearTimeout() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  ngOnDestroy() {
    this.clearTimeout();
  }
}
