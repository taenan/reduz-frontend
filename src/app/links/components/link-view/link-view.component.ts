import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, EMPTY, first, switchMap, tap } from 'rxjs';
import { Link } from '../../model/link';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-link-view',
  templateUrl: './link-view.component.html',
  styleUrls: ['./link-view.component.scss']
})
export class LinkViewComponent implements OnInit {

  showSpinner = true
  msgCb = "Aguarde, redirecionando..."

  constructor(
    private route: ActivatedRoute,
    private service: LinksService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      first(),
      switchMap(data => data['slug'] ?
        this.service.loadBySlug(data['slug'])
          .pipe(
            tap({ error: e => this.onError() }),
            catchError(() => EMPTY)
          )
        : EMPTY
      )
    ).subscribe((link: Link) => link ? window.location.href = link.original : this.onError())

    // if (this.route.params && this.route.params['slug']) {
    //   this.service.loadBySlug(this.route.params['slug'])
    //     .pipe(
    //       tap({ error: e => this.onError() }),
    //       catchError(() => EMPTY)
    //     ).subscribe((link: Link) => link ? window.location.href = link.original : this.onError());
    // } else {
    //   this.onError()
    // }
  }

  onError() {
    this.showSpinner = false
    this.msgCb = "Não foi possível localizar o link ou está desativado!"
  }
}
