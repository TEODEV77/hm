import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../authentication/services/auth.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent implements OnInit {

  private authService = inject(AuthService);

  public currentUser = computed(() => this.authService.currentUser());

  ngOnInit() {
   this.authService.checkToken();
  }


}
