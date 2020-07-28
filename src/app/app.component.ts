import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, ViewContainerRef, ComponentFactoryResolver, AfterContentInit, ComponentRef } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, AfterContentInit {
  
  public isAddTimerVisible: boolean = false;
  public time:number = 0;
  public timers:Array<number> = [];
  @ViewChild("timerInput") timeInput: ElementRef;
  @ViewChild("alert", {static: true, read: ViewContainerRef}) alertContainer: ViewContainerRef;
  public simpleAlert: ComponentRef<SimpleAlertViewComponent> = null;
  
  constructor(
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver
  ) { 
    this.timers = [5, 23, 172];
  }

  ngAfterViewInit(){
  }

  ngAfterContentInit() {
    const alertFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent);
    this.simpleAlert = this.alertContainer.createComponent(alertFactory);
  }

  logTimerComplete(){
    console.log('el timer ha terminado');
  }

  showAddTimer(){
    this.isAddTimerVisible = true;
    setTimeout(() => {
      this.renderer.selectRootElement(this.timeInput.nativeElement).focus();
    }, 100);
  }

  hideAddTimer(){
    this.isAddTimerVisible = false;
  }

  showEndTimerAlert(){
    this.renderer.setAttribute(this.timeInput.nativeElement, "placeholder", "enter secons");
    this.renderer.addClass(this.timeInput.nativeElement, "time-in");
    this.simpleAlert.instance.title = "Timer End";
    this.simpleAlert.instance.message = "Your countdown has finished";
    this.simpleAlert.instance.onDismiss.subscribe(()=>{
      this.simpleAlert.destroy();
    })
    this.simpleAlert.instance.show();
  }


  submitAddTimer(){
    this.timers.push(this.time);
    this.hideAddTimer();
  }
}
