import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component'
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { Category } from 'src/app/categories/model/category'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]> | null = null;

  constructor(
    private categoriesService: CategoriesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.categories$ = this.categoriesService.list().pipe(
      catchError(() => {
        this.onError('Erro ao carregar categorias.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(category: Category) {
    this.router.navigate(['edit', category.id], { relativeTo: this.route });
  }

  onRemove(category: Category) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja apagar esta categoria?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.categoriesService.remove(category.id).subscribe({
          next: () => {
            this.refresh();
            this.snackBar.open('Categoria removida!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error: () => this.onError('Erro ao remover uma categoria.')
        });
      }
    });
  }
}
