import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidEmailRegex } from '../../validators/email.validator';
import { CreateUserDto } from '../../interfaces/create-user.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  public signInForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: [
      '',
      [Validators.required, Validators.pattern(ValidEmailRegex())],
    ],
    password: ['', [Validators.required]],
  });

  signUp() {
    const body: CreateUserDto = {
      name: this.signInForm.value.name,
      lastname: this.signInForm.value.lastname,
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
    };
    this.authService.register(body).subscribe({
      next: (result) => {
        if (result) {
          Swal.fire('User created', 'User created successfully', 'success');
        } else {
          Swal.fire('Error', 'Error creating the user', 'error');
        }
      },
    });
  }
}
