import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";
import { UploadComponent } from "./pages/upload/upload.component";
import { StreamComponent } from "./pages/stream/stream.component";


const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: '', component: UploadComponent
      },
      {
        path: 'upload', component: UploadComponent
      },
      {
        path: 'stream', component: StreamComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: []
})
export class AppRoutingModule { }
