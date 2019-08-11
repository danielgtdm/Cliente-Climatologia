import { AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NbLayoutComponent } from '@nebular/theme';

import { WindowModeBlockScrollService } from '../services/window-mode-block-scroll.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {

  @ViewChild(NbLayoutComponent, { static: false }) layout: NbLayoutComponent;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private windowModeBlockScrollService: WindowModeBlockScrollService,
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowModeBlockScrollService.register(this.layout);
    }
  }
}
