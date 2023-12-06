import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    MatTableModule,
    MatPaginatorModule

  ],
  exports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
