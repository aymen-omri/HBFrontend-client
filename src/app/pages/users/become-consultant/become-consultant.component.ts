import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ConsultantService } from 'src/app/core/services/Consultant.service';
import { VendorService } from 'src/app/core/services/Vendor.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-become-consultant',
  templateUrl: './become-consultant.component.html',
  styleUrls: ['./become-consultant.component.scss']
})
export class BecomeConsultantComponent implements OnInit {
  selectedFile: File | null = null;
  uploadProgress: number | null = null;

  constructor(
    private conService: ConsultantService,
    private userService: UserProfileService,
    private tokenService: TokenService,
    private share: SharedService
  ) { }
  ngOnInit(): void {
    //this.enableButton();
    this.getUser();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  uploadedVideo: any;
  showVideo = false;
  user: any;
  showSpinner: boolean = false;
  hideButton: boolean = false;
  getUser() {
    this.userService.getByEmail(this.tokenService.extractUsername()).subscribe((data: any) => this.user = data);
  }

  // define a function to upload files
  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) { formData.append('file', file, file.name); }
    this.conService.upload(formData).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body) {
          this.uploadedVideo = httpEvent.body;
          this.showVideo = true;
        } else {
          //saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
          //{ type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  uploadedFiles: any[] = [];
  onSelectedFile(event: any) {
    for (const file of event.target.files) {
      this.uploadedFiles.push(file);
    }
  }

  deleteSelectedFile(name: string) {
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      if (this.uploadedFiles[i].name == name) {
        this.uploadedFiles.splice(i, 1);
        break;
      }
    }
  }

  consultantDescription = new FormControl('', Validators.required);
  errMessage: string = "";
  disabled = true;
  enableButton() {
    if (this.consultantDescription.valid && this.uploadedVideo && this.uploadedFiles.length > 0) {
      this.disabled = false;
    }
  }
  sendConsultantRequest() {
    this.showSpinner = true;
    this.hideButton = true;
    if (this.uploadedFiles.length == 0) {
      this.errMessage = "No files selected";
      this.showSpinner = false;
      this.hideButton = false;
    }
    else if (!this.uploadedVideo) {
      this.errMessage = "Upload demo video first";
      this.showSpinner = false;
      this.hideButton = false;
    }
    else if (this.consultantDescription.valid) {
      const formData = new FormData();
      // Append the files
      for (let i = 0; i < this.uploadedFiles.length; i++) {
        formData.append('files', this.uploadedFiles[i]);
      }
      // Append other form fields
      formData.append('description', this.consultantDescription.value!);
      formData.append('demoUrl', this.uploadedVideo.url);
      formData.append('demoVideoType', this.uploadedVideo.type);
      formData.append('demoVideoName', this.uploadedVideo.name);
      this.conService.sendRequest(formData, this.user.id_user).subscribe({
        next: () => {
          alert("Successfully sent");
        },
        error: () => {
          this.showSpinner = false;
          this.hideButton = false;
          this.share.errorMessageObservable.subscribe(msg => {
            this.errMessage = msg;
          });
        }
      });
    } else {
      this.errMessage = "Please fill out all required fields.";
      this.showSpinner = false;
      this.hideButton = false;
    }


  }

}


