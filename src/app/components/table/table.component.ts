import { Component, OnInit, Input } from '@angular/core'
import { AnnualData } from '../../app.component'

@Component({
    selector: 'table-component',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    @Input() data: Array<AnnualData> = []

    constructor() {}

    ngOnInit() {}
}
