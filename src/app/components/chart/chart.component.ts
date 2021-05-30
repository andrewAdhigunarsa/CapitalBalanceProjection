import { OnInit, OnChanges, Component, ElementRef, Input } from '@angular/core'
import { Chart, registerables } from 'chart.js'
import { AnnualData } from '../../../utils/interfaces'

/**
 * The chart component
 */
@Component({
    selector: 'chart-component',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
    /**
     * The data-binding to get data to the parent component
     *
     * See {@link FormParameter}
     */
    @Input() chartData: Array<AnnualData> = []

    /**
     * define labels
     */
    labels: Array<number>

    /**
     * define myCart
     */
    myChart

    /**
     * on value change update cart data
     */

    ngOnChanges(changes): void {
        if (
            this.myChart &&
            this.myChart.config &&
            this.myChart.config.data.labels &&
            this.myChart.config.data.datasets[0] &&
            this.myChart.config.data.datasets[0].data
        ) {
            this.myChart.config.data.labels = this.chartData.map(
                (v) => v.currentYear
            )
            this.myChart.config.data.datasets[0].data = this.chartData.map(
                (v) => v.startBalance
            )
            this.myChart.update()
        }
    }

    /**
     * on Init register cart
     */

    ngOnInit() {
        Chart.register(...registerables)
        this.myChart = new Chart('myChart', {
            type: 'line',
            data: {
                labels: this.chartData.map((v) => v.currentYear),
                datasets: [
                    {
                        label: 'Balance chart',
                        data: this.chartData.map((v) => v.startBalance),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            },
            options: {
                responsive: false,
                display: true,
            },
        })
    }
}
