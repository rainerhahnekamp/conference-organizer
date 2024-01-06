import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  isAvailable = isPlatformBrowser(inject(PLATFORM_ID));

  save(key: string, obj: unknown) {
    if (!this.isAvailable) {
      return;
    }
    const serialized = JSON.stringify(obj);
    window.localStorage.setItem(key, serialized);
  }

  get<T>(key: string): T | undefined {
    if (!this.isAvailable) {
      return;
    }

    const value = window.localStorage.getItem(key);
    if (!value) {
      return undefined;
    }

    return JSON.parse(value);
  }
}
