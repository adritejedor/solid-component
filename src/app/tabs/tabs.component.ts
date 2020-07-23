import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, OnDestroy } from '@angular/core';
import { Tab } from '../tab/tab.interface';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

  @ContentChildren(TabComponent) public tabs: QueryList<TabComponent>;

  private tabClickSubscriptions: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.tabs.forEach(tab => {
      let subscription = tab.onClick.subscribe(()=>{
        console.log(`tab ${tab.title} content clicked`);
      });
      this.tabClickSubscriptions.push(subscription);
    });
    this.selectTab(this.tabs.first);
    // if (this.tab) {
    //   console.log(this.tab);
    //   this.addTab(this.tab);
    //   this.tabClickSubscription = this.tab.onClick.subscribe(() => {
    //     console.log("tab content click detected");
    //   })
    // }
  }

  selectTab(tab: Tab) {
    // for (let tab of this.tabs) {
    //   tab.isActive = false;
    // }
    // tab.isActive = true;

    this.tabs.forEach(tab => tab.isActive = false);
    tab.isActive = true;
  }

  ngOnDestroy() {
    if (this.tabClickSubscriptions) {
      this.tabClickSubscriptions.forEach( item => item.unsubscribe());
    }
  }

}
