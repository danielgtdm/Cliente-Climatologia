import { Component, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService} from '@nebular/theme';

import { LayoutService } from '../../../core/utils/layout.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentTheme = 'default';

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService
    ) { }

  ngOnInit() {  
    const { xl } = this.breakpointService.getBreakpointsMap();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

}
