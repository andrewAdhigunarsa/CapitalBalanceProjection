import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { FormParameter } from '../../../utils/interfaces'

/**
 * The form component
 */
@Component({
    selector: 'form-component',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    /**
     * initial values as placeholder
     *
     */

    initialValue = {
        salary: 100000,
        contributionRate: 9.5,
        inflationRate: 3,
        earning: 7.5,
        fees: 1.5,
        tax: 15,
        withdrawalRate: 5,
        currentAge: 45,
        currentBalance: 300000,
        retirementAge: 65,
    }

    /**
     * The data-binding to emit data to the parent component
     *
     * See {@link FormParameter}
     */

    @Output() newItemEvent = new EventEmitter<FormParameter>()

    /**
     * The form group state
     */

    calculatorForm = new FormGroup({
        salary: new FormControl(this.initialValue.salary),
        contributionRate: new FormControl(this.initialValue.contributionRate),
        inflationRate: new FormControl(this.initialValue.inflationRate),
        earning: new FormControl(this.initialValue.earning),
        fees: new FormControl(this.initialValue.fees),
        tax: new FormControl(this.initialValue.tax),
        withdrawalRate: new FormControl(this.initialValue.withdrawalRate),
        currentAge: new FormControl(this.initialValue.currentAge),
        currentBalance: new FormControl(this.initialValue.currentBalance),
        retirementAge: new FormControl(this.initialValue.retirementAge),
    })

    /**
     * on init emit data to the parent
     */

    ngOnInit() {
        this.newItemEvent.emit(this.initialValue)
    }

    /**
     * handle form submit
     *
     * @param (value) take value from the form and emit to parent
     */
    onSubmit(value: FormParameter) {
        this.newItemEvent.emit(value)
    }
}
