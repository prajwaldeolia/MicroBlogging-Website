import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  progress: number;
  baseUrl: string = "https://localhost:44333/api/Upload/";
  message: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
  url: any = '';
  img: boolean = false;
  onselectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.img = true;
      }
    }
  }
  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
   





    let fileToUpload = <File>files[0];
    const formData = new FormData();
    let fileName: string = (sessionStorage.getItem('UserName'));
    let fileExtension: string = fileToUpload.name.split('?')[0].split('.').pop();
    formData.append('file', fileToUpload, fileName + '.' + fileExtension);

    this.http.post(this.baseUrl, formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
  }
}
