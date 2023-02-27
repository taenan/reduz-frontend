import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FormUtilsService } from '../../shared/services/form-utils.service';
import { User } from '../../users/model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    public formUtils: FormUtilsService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.removeTokens()
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value as User).subscribe({
        next: () => this.onSuccess(),
        error: e => this.onError(e)
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.form, fieldName);
  }

  private onSuccess() {
    this.snackBar.open("Usuário logado!", '', { duration: 5000 });
    this.router.navigate(['/']);
  }

  private onError(errorResponse: HttpErrorResponse) {
    let error = errorResponse.error['userMessage'] ? errorResponse.error['userMessage'] : "Ocorreu um erro, tente novamente mais tarde";
    this.snackBar.open(error, '', { duration: 5000 });
  }

}
