import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MarkdownModule } from "ngx-markdown";
import { LayoutComponent } from './layout/layout.component'; // Standalone component
import { EditorComponent } from './pages/editor/editor.component'; // Standard component

@NgModule({
  declarations: [
    AppComponent,       // Root component
    EditorComponent     // Standard Angular component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    QuillModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    LayoutComponent      // Import standalone component
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
