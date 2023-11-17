import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailVerificationService } from 'src/app/core/services/EmailVerification.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private emailVerif: EmailVerificationService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.verifyEmail();
  }

  token: string = this.route.snapshot.paramMap.get('token')!;

  verifyEmail() {
    this.emailVerif.verify(this.token).subscribe({
      next: (res) => {
        localStorage.removeItem("auth_token");
        window.location.replace('/auth/signin-basic');
      },
      error: () => {
        console.log("Something went wrong");
      }
    });
  }

}
