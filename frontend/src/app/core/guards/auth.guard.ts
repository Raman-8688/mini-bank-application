import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService, User } from 'src/app/core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser: User | null = this.authService.currentUserValue;
        if (currentUser) {
            const expectedRoles = route.data['roles'] as Array<string>;
            if (expectedRoles) {
                const hasRole = expectedRoles.some(role => this.authService.hasRole(role));
                if (!hasRole) {
                    this.router.navigate(['/dashboard']);
                    return false;
                }
            }
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
