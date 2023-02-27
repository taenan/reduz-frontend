import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { FormUtilsService } from 'src/app/shared/services/form-utils.service';
import { UserService } from 'src/app/users/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['../auth.scss']
})
export class PasswordChangeComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    public formUtils: FormUtilsService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$' //must have at least one uppercase letter, one lowercase letter and one number
    const validateConfirmPassword = () => this.form?.get('newPassword')?.value !== this.form?.get('confirmPassword')?.value ? { invalidPasswordConfirmation: true } : null

    this.form = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(pattern)]],
      confirmPassword: ['', [Validators.required, validateConfirmPassword]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService.changePassword(this.authService.userLogged.id,this.form.value).subscribe({
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
    this.snackBar.open("Senha Alterada!", '', { duration: 5000 });
    this.router.navigate(['/']);
  }

  private onError(errorResponse: any) {
    let error = errorResponse.error['userMessage'] ? errorResponse.error['userMessage'] : "Ocorreu um erro, tente novamente mais tarde";

    this.dialog.open(ErrorDialogComponent, {
      data: error
    });
  }

}