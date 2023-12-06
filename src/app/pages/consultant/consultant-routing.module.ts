import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultantComponent } from './consultant.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ConsultantHeaderComponent } from './consultant-header/consultant-header.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultantHeaderComponent,
    children: [
      { path: 'add-course', component: AddCourseComponent },
      { path: 'course-list', component: CourseListComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultantRoutingModule { }
