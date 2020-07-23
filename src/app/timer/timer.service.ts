import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private countdownTimerRef: any = null;
  //public countdown: number = 0;
  public paused: boolean = true;
  private init: number = 0;
  private countdownEndSource = new Subject<void>();
  private countdownSource = new BehaviorSubject<number>(0);
  public countdownEnd$ = this.countdownEndSource.asObservable();
  public countdown$ = this.countdownSource.asObservable();

  constructor() { }

  destroy(): void {
    this.clearTimeout();
  }

  restartCountdown(init?) {
    if (init)
      this.init = init;

    if (this.init && this.init > 0) {
      this.paused = true;
      this.clearTimeout();
      //this.countdown = this.init;
      this.countdownSource.next(this.init);
    }
  }

  toogleCountdown() {
    this.paused = !this.paused;
    if (this.paused == false) {
      this.doCountdown();
    } else {
      this.clearTimeout();
    }
  }

  private doCountdown() {
    if (this.countdownSource.getValue() != 0) {
      this.countdownTimerRef = setTimeout(() => {
        //this.countdown = this.countdown - 1;
        this.countdownSource.next(this.countdownSource.getValue() - 1)
        this.processCountdown();
      }, 1000);
    } else {
      console.log('countdown has finished, so restart timer');
    }
  }

  private processCountdown() {
    if (this.countdownSource.getValue() == 0) {
      // this.onComplete.emit();
      this.countdownEndSource.next();
    }
    else {
      this.doCountdown();
    }
  }

  private clearTimeout() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

}
