import { Component, Input } from '@angular/core'

export interface FormParameter {
    salary: number
    contributionRate: number
    inflationRate: number
    earning: number
    fees: number
    tax: number
    withdrawalRate: number
    currentAge: number
    currentBalance: number
    retirementAge: number
}

export interface AnnualData {
    currentAge: number
    currentYear: number
    contributions: number
    earnings: number
    endBalance: number
    fees: number
    startBalance: number
    tax: number
    withdrawal: number
}

const lifeExpectancy = 100
const currentYearConst = 2020

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'CapitalBalanceProjection'

    data: Array<AnnualData> = []

    calculateContributions(salary, previousContributions, rate, inflationRate) {
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

    getYearlyData({
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
    }) {
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
            this.getYearlyData({
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
            this.data = []
            const yearLeft = lifeExpectancy - currentAge
            this.getYearlyData({
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

    updateValue(value: FormParameter) {
        this.populateData(value)
    }
}
