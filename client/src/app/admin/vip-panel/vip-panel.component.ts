import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserManagementComponent } from "../user-management/user-management.component";
import { PhotoManagementComponent } from "../photo-management/photo-management.component";
import { HasRoleDirective } from '../../_directives/has-role.directive';

@Component({
    selector: 'app-vip-panel',
    standalone: true,
    templateUrl: './vip-panel.component.html',
    styleUrl: './vip-panel.component.css',
    imports: [TabsModule, UserManagementComponent, PhotoManagementComponent, HasRoleDirective]
})
export class VipPanelComponent {

}
