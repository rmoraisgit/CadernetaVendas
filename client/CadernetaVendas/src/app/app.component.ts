import { Component } from '@angular/core';
import { UserTokenService } from './core/user-token/user-token.service';

@Component({
  selector: 'cv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CadernetaVendas';

  constructor(private userTokenService: UserTokenService) { }

  ngOnInit() {
    !this.userTokenService.isTokenValid() &&
      this.userTokenService.removeUserAccessToken()
  }
}