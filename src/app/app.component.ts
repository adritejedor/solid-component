import { Component, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
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
  
  constructor(
    private cdRef: ChangeDetectorRef
  ) { 
    this.timers = [5, 23, 172];
  }

  ngAfterViewInit(){
    console.log(this.alerts);
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
