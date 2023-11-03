import { AppConfig } from '../../interface/app-config';
import { Injectable } from '@angular/core';
import { LayoutState } from '../../interface/layout';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public config: AppConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14,
  };

  public state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  };

  private configUpdate = new Subject<AppConfig>();

  private overlayOpen = new Subject<any>();

  public readonly configUpdate$ = this.configUpdate.asObservable();

  public readonly overlayOpen$ = this.overlayOpen.asObservable();

  public onMenuToggle(): void {
    if (this.isOverlay()) {
      this.state.overlayMenuActive = !this.state.overlayMenuActive;
      if (this.state.overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }

    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

      if (this.state.staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  public showProfileSidebar(): void {
    this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
    if (this.state.profileSidebarVisible) {
      this.overlayOpen.next(null);
    }
  }

  public showConfigSidebar(): void {
    this.state.configSidebarVisible = true;
  }

  public isOverlay(): boolean {
    return this.config.menuMode === 'overlay';
  }

  public isDesktop(): boolean {
    return window.innerWidth > 991;
  }

  public isMobile(): boolean {
    return !this.isDesktop();
  }

  public onConfigUpdate(): void {
    this.configUpdate.next(this.config);
  }
}
