import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { FormsModule} from '@angular/forms';
import { AlertViewComponent } from './alert-view/alert-view.component';
import { DisplayComponent } from './display/display.component';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    AlertViewComponent,
    DisplayComponent,
    SimpleAlertViewComponent,
    TabComponent,
    TabsComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
