import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormUtilsService } from 'src/app/shared/services/form-utils.service';
import { LinksService } from '../../services/links.service';
import { Link } from '../../model/link'
import { catchError, debounceTime, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/categories/model/category';
import { CategoriesService } from 'src/app/categories/services/categories.service'
import { ValidatorUtilsService } from 'src/app/shared/services/validator-utils.service';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.scss']
})

export class LinkFormComponent implements OnInit {
  readonly DEFAULT_FAVICON_PATH = './assets/default-favicon.webp';

  @Output() refresh: EventEmitter<boolean> = new EventEmitter(false);

  form!: FormGroup;
  defaultFavicon: String = this.DEFAULT_FAVICON_PATH;
  showSpinner = false
  categories$: Observable<Category[]> | undefined;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private linksService: LinksService,
    private snackBar: MatSnackBar,
    public formUtils: FormUtilsService,
    private categoriesService: CategoriesService,
    private validatorUtils: ValidatorUtilsService
  ) { }

  ngOnInit(): void {
    let link = new Link()
    this.categories$ = this.categoriesService.list()

    this.form = this.formBuilder.group({
      title: [link.title, [Validators.maxLength(200)]],
      favicon: [link.favicon, []],
      original: [link.original, [Validators.required, this.validatorUtils.validateUrl]],
      category: [link.category, [Validators.required]],
    });

    this.form.get('original')?.statusChanges
      .pipe(
        tap(value => this.showSpinner = value === 'VALID'),
        debounceTime(2000),
        switchMap(status => status === 'VALID' ?
          this.linksService.loadURL(this.form.get('original')?.value)
            .pipe(
              tap({ error: e => this.onError(e) }),
              catchError(() => EMPTY)
            )
          : EMPTY
        )
      )
      .subscribe((data) => data ? this.populateForm(data) : {});
  }

  getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.form, fieldName);
  }

  onSubmit() {
    if (this.form.valid) {
      this.linksService.save(this.form.value as Link).subscribe({
        next: () => this.onSuccess(),
        error: e => this.onError(e)
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.resetForm();
  }

  private onSuccess() {
    this.snackBar.open('Link Criado!', '', { duration: 5000 });
    this.onCancel();
    this.refresh.emit(true)
  }

  private onError(errorResponse: HttpErrorResponse) {
    let error = errorResponse.error['userMessage'] ? errorResponse.error['userMessage'] : "Ocorreu um erro, tente novamente mais tarde";
    this.showSpinner = false
    if(errorResponse.error['objects']){
      error += errorResponse.error['objects']?.map( (e: any) => ` Campo ${e['name']}, ${e['userMessage']}.`);
    }

    this.snackBar.open(error, '', { duration: 5000 });
  }

  private populateForm(data: Link) {
    this.showSpinner = false
    this.form.patchValue({
      title: data.title,
      favicon: data.favicon,
    });
    this.defaultFavicon = data.favicon ? data.favicon : this.DEFAULT_FAVICON_PATH;
  }

  private resetForm() {
    this.form.patchValue({
      title: null,
      favicon: null,
      original: null
    });
    this.defaultFavicon = this.DEFAULT_FAVICON_PATH;
  }

}
