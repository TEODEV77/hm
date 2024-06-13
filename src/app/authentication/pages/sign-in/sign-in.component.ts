import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidEmailRegex } from '../../validators/email.validator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  private formBuilder = inject( FormBuilder );
  private authService = inject( AuthService);
  private router = inject(Router);

  public signInForm : FormGroup = this.formBuilder.group ({
    email: ['', [Validators.required, Validators.pattern(ValidEmailRegex())]],
    password: ['', [Validators.required]]
  });

  signIn (){
    const { email, password } = this.signInForm.value;
    this.authService.login(email, password)
    .subscribe({ next: () => {
      this.router.navigate(['/admin']);
    }, error: () => {
       Swal.fire('Error', 'Invalid credentials', 'error');
    } });

  }

  navigateSignUp(){
    this.authService.navigateSignUp();
  }

}
