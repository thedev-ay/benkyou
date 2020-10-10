import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChromeService {

  constructor() { }

  get(key: string): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (result) => {
        let err = chrome.runtime.lastError;
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
      })
    })
  }

  set(data: Record<string, any>): Promise<any> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(data, () => {
        let err = chrome.runtime.lastError;
        if (err) {
            reject(err);
        } else {
            resolve();
        }
      });
    })
  }
}
