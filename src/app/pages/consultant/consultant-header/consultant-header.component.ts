import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-consultant-header',
  templateUrl: './consultant-header.component.html',
  styleUrls: ['./consultant-header.component.scss']
})
export class ConsultantHeaderComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  showCoursesTree = false;
  isCoursesTreeExpanded = false;

  toggleCoursesTree() {
    this.isCoursesTreeExpanded = !this.isCoursesTreeExpanded;
  }


}



