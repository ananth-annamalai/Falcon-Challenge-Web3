import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileuploadComponent } from './file-upload/file-upload.component';
import { LayoutComponent } from "./layout/layout.component";
import { StreamComponent } from './stream/stream.component';
import { UploadComponent } from "./upload/upload.component";
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { HttpClientModule } from "@angular/common/http";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    RatingModule,
    OverlayPanelModule,
    MenuModule,
    ProgressSpinnerModule

  ],
  declarations: [
    LayoutComponent,
    UploadComponent,
    FileuploadComponent,
    StreamComponent
  ],
  providers: []
})
export class PagesModule { }
