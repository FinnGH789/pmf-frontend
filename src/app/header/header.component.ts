import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentWindowWidth?: number;
  collapsed: boolean = false;


  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentWindowWidth = window.innerWidth;
    }
  }
}
