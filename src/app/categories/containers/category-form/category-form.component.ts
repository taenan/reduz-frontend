import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { first, map, Observable } from 'rxjs';

import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Icon } from 'src/app/shared/models/icons.model';
import { FormUtilsService } from 'src/app/shared/services/form-utils.service';
import { Category } from '../../model/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  icons: Observable<Icon[]> | undefined;
  iconsCache: Icon[] = [];
  me: any

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private http: HttpClient,
    public formUtils: FormUtilsService
  ) { }

  ngOnInit(): void {
    const category: Category = this.route.snapshot.data['category'];
    const validateIcon = () => this.iconsCache.length > 0 && this.iconsCache.filter(icon => icon.label.toLowerCase().includes(this.form.get('icon')?.value.toLowerCase())).length == 0 ? { invalidIcon: true } : null

    this.form = this.formBuilder.group({
      id: [category.id],
      name: [
        category.name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      ],
      icon: [
        category.icon,
        [Validators.required, Validators.maxLength(30), validateIcon]
      ]
    });

    this.icons = this.form.get('icon')?.statusChanges.pipe(
      map(status => status === 'VALID' ? this._filterIcons(this.form.get('icon')?.value) : [])
    )
  }

  getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.form, fieldName);
  }

  onSubmit() {
    if (this.form.valid) {
      this.categoriesService.save(this.form.value as Category).subscribe({
        next: () => this.onSuccess(),
        error: e => this.onError(e)
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open(`Categoria ${this.form.value.id ? 'Atualizada' : 'Criada'}!`, '', { duration: 5000 });
    this.onCancel();
  }

  private onError(errorResponse: HttpErrorResponse) {
    const error = errorResponse.error['userMessage'] + errorResponse.error['objects']?.map( (e: any) => ` Campo ${e['name']}, ${e['userMessage']}.`)
    this.dialog.open(ErrorDialogComponent, {
      data: error
    });
  }

  private _filterIcons(search: String): Icon[] {
    const filterValue = search.toLowerCase();
    if (this.iconsCache.length == 0) {
      this.http.get<Icon[]>('assets/icons.json')
        .pipe(first())
        .subscribe(icons => this.iconsCache = icons)
    }
    return this.iconsCache.filter(icon => icon.label.toLowerCase().includes(filterValue)).slice(0, 5)
  }

}
