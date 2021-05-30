import { Component, Input } from '@angular/core'
import { AnnualData, FormParameter, GetYearlyData } from '../utils/interfaces'

/**
 * Expected life expectancy of an individual
 */
const lifeExpectancy = 100

/**
 * Current year static value
 */
const currentYearConst = 2020

/**
 * The app root component
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    /**
     * The title of the component
     */
    title = 'Capital Balance Projection'

    /**
     * The data for table and chart
     */

    data: Array<AnnualData> = []

    /**
     * Calculate the total contribution for the year
     *
     * @param {salary} the user annual salary in number
     * @param {previousContributions} the previous year contributions total
     * @param {rate} the current contribution rate
     * @param {inflationRate} the inflation rate
     */

    calculateContributions(
        salary: number,
        previousContributions: number,
        rate: number,
        inflationRate: number
    ) {
        if (
            salary &&
            (previousContributions !== null ||
                previousContributions !== undefined) &&
            rate &&
            inflationRate
        ) {
            if (previousContributions === 0) {
                return (salary * rate) / 100
            } else {
                return previousContributions * (1 + inflationRate / 100)
            }
        }
        return
    }

    /**
     * Recursive
     *
     * @param {salary} the user annual salary in number
     * @param {previousContributions} the previous year contributions total
     * @param {rate} the current contribution rate
     * @param {inflationRate} the inflation rate
     */

    getPopulateYearlyData({
        salary,
        currentYear,
        startBalance,
        previousContribution,
        contributionRate,
        inflationRate,
        earningsRate,
        feesRate,
        taxRate,
        currentAge,
        yearLeft,
        retirementAge,
        withdrawalRate,
    }: GetYearlyData) {
        if (yearLeft === 0) {
            return
        } else {
            let currentContribution = 0
            if (currentAge <= retirementAge) {
                currentContribution = this.calculateContributions(
                    salary,
                    previousContribution,
                    contributionRate,
                    inflationRate
                )
            }
            const earnings =
                ((startBalance + currentContribution) * earningsRate) / 100
            const fees =
                ((startBalance + currentContribution + earnings) * feesRate) /
                100
            const tax = ((currentContribution + earnings) * taxRate) / 100
            let withdrawal = 0
            if (currentAge > retirementAge) {
                withdrawal = (startBalance * withdrawalRate) / 100
            }
            const endBalance =
                startBalance +
                currentContribution +
                earnings -
                fees -
                tax -
                withdrawal
            let yearLeftAge
            if (yearLeft > 0) {
                yearLeftAge = yearLeft - 1
            }
            this.data.push({
                currentYear,
                currentAge,
                startBalance: Math.ceil(startBalance),
                contributions: Math.ceil(currentContribution),
                earnings: Math.ceil(earnings),
                fees: Math.ceil(fees),
                tax: Math.ceil(tax),
                withdrawal: Math.ceil(withdrawal),
                endBalance: Math.ceil(endBalance),
            })
            this.getPopulateYearlyData({
                salary,
                currentYear: currentYear + 1,
                startBalance: endBalance,
                previousContribution: currentContribution,
                contributionRate,
                inflationRate,
                earningsRate,
                feesRate,
                taxRate,
                currentAge: currentAge + 1,
                yearLeft: yearLeftAge,
                retirementAge,
                withdrawalRate,
            })
        }
    }

    /**
     * Populate data
     *
     * @param {{FormParameter}} values from form
     */

    populateData({
        salary,
        contributionRate,
        inflationRate,
        earning,
        fees,
        tax,
        withdrawalRate,
        currentAge,
        currentBalance,
        retirementAge,
    }: FormParameter) {
        if (
            salary &&
            contributionRate &&
            inflationRate &&
            earning &&
            fees &&
            tax &&
            withdrawalRate &&
            currentAge &&
            currentBalance &&
            retirementAge &&
            lifeExpectancy &&
            currentYearConst
        ) {
            // clear values before repopulating
            this.data = []
            const yearLeft = lifeExpectancy - currentAge
            this.getPopulateYearlyData({
                salary,
                currentYear: currentYearConst,
                startBalance: currentBalance,
                previousContribution: 0,
                contributionRate,
                inflationRate,
                earningsRate: earning,
                feesRate: fees,
                taxRate: tax,
                currentAge,
                yearLeft,
                retirementAge,
                withdrawalRate,
            })
        }
    }

    /**
     * Receive values form child form component
     *
     * @param {value:FormParameter} values from form
     */

    updateValue(value: FormParameter) {
        this.populateData(value)
    }
}
