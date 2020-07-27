import { Component, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  public isAddTimerVisible: boolean = false;
  public time:number = 0;
  public timers:Array<number> = [];
  @ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;
  @ViewChild("timerInput") timeInput: ElementRef;
  
  constructor(
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2
  ) { 
    this.timers = [5, 23, 172];
  }

  ngAfterViewInit(){
    console.log(this.timeInput);
    // this.timeInput.nativeElement.setAttribute("placeholder", "enter seconds");
    // this.timeInput.nativeElement.classList.add("time-in");
    this.renderer.setAttribute(this.timeInput.nativeElement, "placeholder", "enter secons");
    this.renderer.addClass(this.timeInput.nativeElement, "time-in");
    this.alerts.forEach(item => {
      if (!item.title) {
        item.title = 'Hi';
        item.message = 'Hello World!!'
      }
    });
    this.cdRef.detectChanges();
  }

  logTimerComplete(){
    console.log('el timer ha terminado');
  }

  showAddTimer(){
    this.isAddTimerVisible = true;
    setTimeout(() => {
      // this.timeInput.nativeElement.focus();
      this.renderer.selectRootElement(this.timeInput.nativeElement).focus();
    }, 100);
  }

  hideAddTimer(){
    this.isAddTimerVisible = false;
  }

  showEndTimerAlert(){
    this.alerts.first.show();
  }


  submitAddTimer(){
    this.timers.push(this.time);
    this.hideAddTimer();
  }
}
