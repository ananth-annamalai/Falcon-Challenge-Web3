import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { Movie } from "src/app/model/movie.mode";

@Component({
    selector: 'app-file-Upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileuploadComponent {
    @ViewChild('fileUpload') fileUpload: ElementRef
    @Input() selectedTitle: Movie = null;
    uploadedFileName: string
    files: File[] = []

    constructor(private sanitizer: DomSanitizer) {
    }

    onClick(event) {
        if (this.fileUpload)
            this.fileUpload.nativeElement.click()
    }

    onInput(event) {

    }

    onFileSelected(event) {
        let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        console.log('event::::::', event)
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (this.validate(file)) {
                file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                if (!this.isMultiple()) {
                    this.files = []
                }
                this.files.push(files[i]);
            }
        }
    }

    removeFile(file) {
        let ix
        if (this.files && -1 !== (ix = this.files.indexOf(file))) {
            this.files.splice(ix, 1)
            this.clearInputElement()
        }
    }

    validate(file: File) {
        for (const f of this.files) {
            if (f.name === file.name
                && f.lastModified === file.lastModified
                && f.size === f.size
                && f.type === f.type
            ) {
                return false
            }
        }
        return true
    }

    clearInputElement() {
        this.fileUpload.nativeElement.value = ''
    }

    formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    isMultiple(): boolean {
        return false;
    }

}
