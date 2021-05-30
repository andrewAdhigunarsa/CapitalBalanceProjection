/**
 * The interface of form values
 *
 */

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

/**
 * The interface for getYearlyData function
 */

export interface GetYearlyData {
    salary: number
    currentYear: number
    startBalance: number
    previousContribution: number
    contributionRate: number
    inflationRate: number
    earningsRate: number
    feesRate: number
    taxRate: number
    currentAge: number
    yearLeft: number
    retirementAge: number
    withdrawalRate: number
}

/**
 * The interface of each year data
 */

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
