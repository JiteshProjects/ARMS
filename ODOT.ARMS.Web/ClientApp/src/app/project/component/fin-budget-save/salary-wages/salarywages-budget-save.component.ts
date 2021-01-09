import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Budget } from "src/app/project/models/budget";
import { GenericLookupListForDD } from "src/app/project/models/project-for-update";
import { Phase } from "../../../models/phase";


@Component({
    selector: 'app-prj-salarywages-budget-save',
    templateUrl: './salarywages-budget-save.component.html'
})
export class SalaryWagesBudgetSaveComponent implements OnInit, OnChanges {

    @Input() dialogStatus: boolean;
    @Input() projectId: string;
    @Input() selectedCategory: GenericLookupListForDD;
    @Input() phaseList: Phase[];
    @Input() status: GenericLookupListForDD[];
    @Input() selectedBudget: Budget;

    @Output() closeDialog = new EventEmitter<boolean>();
    @Output() saveSalaryWagesBudget = new EventEmitter<any>();


    salaryWagesForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.loadForm();
    }

    get title(): string {
        return !this.selectedBudget ? 'Add ' + this.selectedCategory.text : 'Edit ' + this.selectedCategory.text;
      }
      
    loadForm() {
        if (this.selectedBudget) {
            this.salaryWagesForm = this.fb.group({
                title: [this.selectedBudget.budgetTitle],
                phaseId: [this.selectedBudget.phaseId, Validators.required],
                odotFunding: [this.selectedBudget.odotFunding, Validators.required],
                orgCostSharing: [this.selectedBudget.orgCostSharing],
                qty: [this.selectedBudget.qty],
                notes: [this.selectedBudget.notes],
                statusId: ['A'],
                budgetId:[this.selectedBudget.budgetId],
                bcAltId: [this.selectedBudget.bcAltId],
                budgetCategory:[this.selectedCategory.value],
                projectId: [this.projectId]
            });
        }
        else {
            this.salaryWagesForm = this.fb.group({
                title: [''],
                phaseId: [null, Validators.required],
                odotFunding: ['', Validators.required],
                orgCostSharing: [''],
                qty: ['1'],
                notes: [''],
                statusId: [''],
                budgetId: [null],
                bcAltId: [null],
                budgetCategory:[this.selectedCategory.value],
                projectId: [this.projectId]
            });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
      console.info('selected Budget', this.selectedBudget);
      console.info('phase List', this.phaseList);
      console.info('salary wages save', changes);
      if (changes['phaseList'] && changes.dialogStatus) {
        this.loadForm();
      }
    }

    saveForm() {
        this.saveSalaryWagesBudget.emit(this.salaryWagesForm.value);
    }
}
