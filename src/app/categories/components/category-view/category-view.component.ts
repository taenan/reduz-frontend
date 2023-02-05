import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Category } from '../../model/category';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CategoryViewComponent implements OnInit {
  course: Category | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.course = this.route.snapshot.data['course'];
  }

}
