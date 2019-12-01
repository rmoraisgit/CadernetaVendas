import { Injectable } from '@angular/core';
import { UserTokenService } from '../user-token/user-token.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProdutosGuard implements CanActivate {

    constructor(private router: Router,
        private userTokenService: UserTokenService) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.userTokenService.hasAccessToken()) {
            this.router.navigate(['produtos']);
            return false;
        }

        return true;
    }
}