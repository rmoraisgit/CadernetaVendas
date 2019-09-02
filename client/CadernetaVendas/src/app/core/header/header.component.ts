import { Component, OnInit, Renderer } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { UserTokenService } from '../user-token/user-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$ = new Observable<User>();

  constructor(private router: Router,
              private userTokenService: UserTokenService) { }

  ngOnInit() {
    this.user$ = this.userTokenService.getUser();
  }

  logoff() {
    this.userTokenService.removeUserAccessToken();
    this.router.navigate(['login'])
  }
}
