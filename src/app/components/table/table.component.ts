import { Component, Input } from '@angular/core'
import { AnnualData } from '../../../utils/interfaces'

/**
 * The table component
 */
@Component({
    selector: 'table-component',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    /**
     * The data binding to get data from parents
     */
    @Input() data: Array<AnnualData> = []
}
