import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {AlienService} from "./services/alien.service";
import {Message} from "../types/message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nickname: string;

  data$: Observable<Message[]>;

  constructor(private alienService: AlienService) {
    this.nickname = environment.nickname;
    this.data$ = alienService.getData();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  sendMessage() {
    let msg = (<HTMLInputElement>document.getElementById("message")).value;
    const message = {
      sentAt: Date.now(),
      nickname: this.nickname,
      message: msg
    }
    this.alienService.sendData(message).subscribe(() => {
      this.data$ = this.alienService.getData();
    });
  }
}
