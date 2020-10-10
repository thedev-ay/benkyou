import { Component, OnInit } from '@angular/core';
import ghostWriter from 'ghost-writer';
import { AppService } from './app.service';
import { ChromeService } from './service/chrome.service';

const CACHE_KEY_PHOTO = 'photo_data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  today = new Date().toDateString();
  hImg = window.screen.height - (window.screen.height * .20);
  wImg = window.screen.width - (window.screen.width * .20);

  photo: Record<string, any> = {};  
  japaneseWord: string;
  englishWord: string;
  choices: string[];
  result: string;

  constructor(private appService: AppService, private chromeService: ChromeService) { }

  async ngOnInit() {
    const cache: Record<string, any> = await this.chromeService.get(CACHE_KEY_PHOTO);
    const photo = cache?.photo_data;

    if (photo?.cachedDate === this.today) {
      this.photo = photo;
    } else {
      this.requestPhoto();
    }

    this.requestWord();
  }

  requestPhoto() {
    this.appService.getRandomPhoto().subscribe((result: any) => {
      this.photo = {
        url: result.photo.urls.full.concat(`&h=${this.hImg}&w=${this.wImg}`),
        title: result.photo.location.title,
        owner: result.photo.user.name,
        ownerURL: result.photo.user.links.html,
        cachedDate: this.today,
      };

      this.chromeService.set({ CACHE_KEY_PHOTO: this.photo });
    });
  }

  requestWord() {
    this.appService.getRandomWord().subscribe((result: any) => {
      const speed1 = 350;
      const writer1 = ghostWriter(result.word);
      writer1(t => this.japaneseWord = t, speed1);
      
      setTimeout(() => {
        this.choices = result.choices;
      }, result.word.length * speed1 + 100);
    });
  }

  check(event: any) {
    const e = event.target;
    var choice = e.choice;

    this.appService.checkAnswer(this.japaneseWord, choice).subscribe(({ result } : any) => {
      if (result) {
        const writer2 = ghostWriter(choice);
        writer2(t => this.englishWord = t, 100);
      } else {
        e.classList.add('incorrect');
        e.disabled = true;
      }
    });    
  }

  isPhotoLoaded() {
    return this.photo.url ? '' : 'default'
  }
}