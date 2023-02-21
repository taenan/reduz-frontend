import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component'
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { LinksService } from 'src/app/links/services/links.service';
import { Link } from 'src/app/links/model/link'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  links$: Observable<Link[]> | null = null;

  constructor(
    private linksService: LinksService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.links$ = this.linksService.list().pipe(
      catchError((e) => {
        this.onError(e);
        return of([]);
      })
    );
  }

  onError(errorResponse: HttpErrorResponse) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorResponse.error['userMessage']
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(link: Link) {
    this.router.navigate(['edit', link.id], { relativeTo: this.route });
  }

  onRemove(link: Link) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover este link?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.linksService.remove(link.id).subscribe({
          next: () => {
            this.refresh();
            this.snackBar.open('Link removido!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error: (e) => this.onError(e)
        });
      }
    });
  }
}
