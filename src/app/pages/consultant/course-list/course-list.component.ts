import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from 'src/app/core/services/Course.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  user: any;
  courses: any[] = [];
  displayedColumns: string[] = ['title', 'subtitle', 'category', 'level', 'language', 'price', 'target', 'status'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getUser();
  }

  constructor(
    private userService: UserProfileService,
    private tokenService: TokenService,
    private courseService: CourseService) { }

  getUserCourses(id: number) {
    this.courseService.getAllByUserId(id).subscribe((data: any) => {
      this.courses = data;
      console.log(this.courses);
      this.dataSource = new MatTableDataSource<any>(this.courses);
      this.dataSource.paginator = this.paginator;
    });
  }

  getUser() {
    this.userService.getByEmail(this.tokenService.extractUsername()).subscribe((res: any) => {
      this.user = res;
      this.getUserCourses(this.user.id_user);
    });
  }

  getStatusClasses(status: number): string[] {
    switch (status) {
      case 0:
        return ['badge', 'bg-danger']; // Not Complete
      case 1:
        return ['badge', 'bg-warning']; // Under Review
      case 2:
        return ['badge', 'bg-success']; // Active
      case 3:
        return ['badge', 'bg-danger']; // Rejected
      case 4:
        return ['badge', 'bg-secondary']; // Deleted
      default:
        return ['badge', 'bg-secondary']; // Default class if status is not recognized
    }
  }

  getStatusText(status: number): string {
    switch (status) {
      case 0:
        return 'Not Complete';
      case 1:
        return 'Under Review';
      case 2:
        return 'Active';
      case 3:
        return 'Rejected';
      case 4:
        return 'Deleted';
      default:
        return 'Unknown Status';
    }
  }

}
