import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { PlatformLocation } from '@angular/common';

import { Link } from '../../model/link';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-links-list',
  templateUrl: './links-list.component.html',
  styleUrls: ['./links-list.component.scss']
})
export class LinksListComponent {
  @Input() links: Link[] = [];
  @Output() remove: EventEmitter<Link> = new EventEmitter(false);

  innerWidth: any;
  cols!: number
  host: string

  constructor(
    private platformLocation: PlatformLocation,
    private snackBar: MatSnackBar,
    ) {
    this.host = platformLocation.href;
  }

  ngOnInit() {
    this.onResize(null)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.cols = this.getCol()
  }

  onRemove(record: Link) {
    this.remove.emit(record);
  }

  onCopied(){
    this.snackBar.open("Link copiado!", '', { duration: 5000 });
  }

  private getCol() {
    if(this.innerWidth > 1410){
      return 3
    }

    if(this.innerWidth > 950){
      return 2
    }
    return 1
  }
}
