import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const visitGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  
  if (accountService.roles().includes('VIP')) {
    return true;
  } else {
    toastr.error('You cannot enter this erea')
    return false;
  }
};
