import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultantRoutingModule } from './consultant-routing.module';
import { ConsultantComponent } from './consultant.component';
import { ConsultantHeaderComponent } from './consultant-header/consultant-header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditorModule } from 'primeng/editor';
import { CourseListComponent } from './course-list/course-list.component';



@NgModule({
  declarations: [
    ConsultantComponent, 
    ConsultantHeaderComponent,
    AddCourseComponent,
    CourseListComponent
  ],
  imports: [
    CommonModule,
    ConsultantRoutingModule,
    SharedModule,
    EditorModule,
  ]
})
export class ConsultantModule { }
