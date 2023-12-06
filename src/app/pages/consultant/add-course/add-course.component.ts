import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/Category.service';
import { CourseService } from 'src/app/core/services/Course.service';
import { CourseLevelService } from 'src/app/core/services/CourseLevel.service';
import { InsertedLanguageService } from 'src/app/core/services/InsertedLang.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  categories: any[] = [];
  courseLevels: any[] = [];
  languages: any[] = [];
  user: any;
  errMessage: string = "";

  myForm = new FormGroup({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    requirements: new FormControl('', Validators.required),
    target: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  })
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllCourseLevels();
    this.getAllLanguages();
    this.getUser();
  }
  constructor(
    private categoryService: CategoryService,
    private courseLevelService: CourseLevelService,
    private langService: InsertedLanguageService,
    private userService: UserProfileService,
    private tokenService: TokenService,
    private courseService: CourseService,
    private ShareService: SharedService
  ) { }

  getAllCategories() {
    this.categoryService.getAll().subscribe((res: any) => this.categories = res);
  }

  getAllCourseLevels() {
    this.courseLevelService.getAll().subscribe((res: any) => this.courseLevels = res);
  }

  getAllLanguages() {
    this.langService.getAll().subscribe((res: any) => this.languages = res);
  }

  getUser() {
    this.userService.getByEmail(this.tokenService.extractUsername()).subscribe((res: any) => this.user = res);
  }

  addCourse() {
    console.log("hi")
    if (this.myForm.valid) {
      let course = {
        title: this.myForm.value.title,
        subtitle: this.myForm.value.subtitle,
        description: this.myForm.value.description,
        requirements: this.myForm.value.requirements,
        target: this.myForm.value.target,
        price: this.myForm.value.price,
        level: {
          id_course_level: this.myForm.value.level
        },
        language: {
          id_language: this.myForm.value.language
        },
        category: {
          id_category: this.myForm.value.category
        },
        instructor: {
          id_user: this.user.id_user
        }
      }
      this.courseService.add(course).subscribe({
        next: (value: any) => {
          alert("Added successfully!");
        },
        error: (err) => {
          console.log(err);
          this.ShareService.errorMessageObservable.subscribe(msg => this.errMessage = msg);
        }
      });
    } else {
      this.errMessage = "You didn't fill a required field";
    }
  }

}
