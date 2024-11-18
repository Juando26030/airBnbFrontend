import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService)
  if (await authService.isAuthenticated()) return true

  const router = inject(Router)
  router.navigate(['/login'])

  return false
};
