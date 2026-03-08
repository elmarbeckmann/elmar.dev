import { Component, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';

type Theme = 'original' | 'neumorphism' | 'brutalism' | 'maximalism' | 'chaos';

interface ThemeOption {
  key: Theme;
  label: string;
  description: string;
}

@Component({
  selector: 'elmardotdev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgClass],
})
export class AppComponent {
  title = 'elmardotdev';
  dropdownOpen = false;

  readonly crtEnabled = true;
  crtState: 'boot' | 'off' | 'on' | null;
  private pendingTheme: Theme | null = null;

  readonly themes: ThemeOption[] = [
    { key: 'original', label: 'The Classic', description: 'Dark, clean, and timeless' },
    { key: 'neumorphism', label: 'Soft Touch', description: 'Pillowy shadows, gentle vibes' },
    { key: 'brutalism', label: 'I Am The Brute', description: 'Raw, bold, unapologetic' },
    { key: 'maximalism', label: 'More Is More', description: 'Neon dreams, maximum impact' },
    { key: 'chaos', label: 'Fever Dream', description: 'Your screen called. It wants therapy.' },
  ];

  currentTheme: Theme;

  constructor() {
    const keys = this.themes.map((t) => t.key);
    this.currentTheme = keys[Math.floor(Math.random() * keys.length)];
    this.crtState = this.crtEnabled ? 'boot' : null;
  }

  setTheme(theme: Theme): void {
    if (theme === this.currentTheme || this.crtState) {
      this.dropdownOpen = false;
      return;
    }
    this.dropdownOpen = false;

    if (this.crtEnabled) {
      this.pendingTheme = theme;
      this.crtState = 'off';
    } else {
      this.currentTheme = theme;
    }
  }

  onCrtAnimationEnd(event: AnimationEvent): void {
    if (event.pseudoElement) return;

    switch (this.crtState) {
      case 'boot':
        this.crtState = null;
        break;
      case 'off':
        if (this.pendingTheme) {
          this.currentTheme = this.pendingTheme;
          this.pendingTheme = null;
        }
        this.crtState = 'on';
        break;
      case 'on':
        this.crtState = null;
        break;
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.style-picker-wrapper')) {
      this.dropdownOpen = false;
    }
  }
}
