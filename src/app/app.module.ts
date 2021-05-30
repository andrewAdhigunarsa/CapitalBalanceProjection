import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ReactiveFormsModule } from '@angular/forms'
import { FormComponent } from './components/form/form.component'
import { TableComponent } from './components/table/table.component'
import { ChartComponent } from './components/chart/chart.component'

@NgModule({
    declarations: [AppComponent, FormComponent, TableComponent, ChartComponent],
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
