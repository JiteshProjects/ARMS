import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ReducerManagerDispatcher, StoreModule } from '@ngrx/store';
import { projectReducer } from './state/reducers/project.reducer';
import { projectTypeReducer } from './state/reducers/projecttype.reducers';
import { PrjComponent } from './component/prj/prj.component';
import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { PrjDetailComponent } from './component/prj-detail/prj-detail.component';
import { PrjHeaderComponent } from './component/prj-header/prj-header.component';
import { PrjSummaryComponent } from './component/prj-summary/prj-summary.component';
import { PrjAbstractComponent } from './component/prj-abstract/prj-abstract.component';
import { Agencyreducer } from '../agency/state/reducers/agencies.reducer';
import { ProjectForDDEffects } from './state/effects/projectForDD.effects';
import { AgencyEffects } from '../agency/state/effects/agency.effects';
//import { PrjInfoBaseComponent } from './component/prj-info-base/prj-info-base.component';
import { ProjectTypeEffects } from './state/effects/projects.effects';
import { AdministrationStoreEffects } from '../manage/state/effects/administration-categories';
//import { PrjCbComponent } from './component/prj-cb/prj-cb.component';
import { FinancialHeaderComponent } from './component/financial-header/financial-header.component';
//import { PrjEventsComponent } from './component/prj-events/prj-events.component';
import { UploadModule } from '@progress/kendo-angular-upload';
//import { EventEffects } from './state/effects/event.effects';
//import { eventReducer } from './state/reducers/event.reducer';
import { EditPrjEventsPageEffects } from './state/effects/edit-project-events-page.effects';
//import { CBReducer } from './state/reducers/controllingBoard.reducer';
import { personnelReducer } from './state/reducers/personnel.reducer';
import { PersonnelEffects } from './state/effects/personnel.effects';
import { ImageUploaderDialog } from './component/prj-abstract/upload-dialog/upload-dialog.component';
import { LinkDialog } from './component/prj-abstract/link-dialog/link-dialog.component';
import { PrjPersonnelComponent } from './component/prj-personnel/prj-personnel.component';
import { FinancialOverviewComponent } from './component/financial-overview/financial-overview.component';
import { FinancialBudgetComponent } from './component/financial-budget/financial-budget.component';
import { FinancialBudgetSalarywagesComponent } from './component/financial-budget/budget-grids/financial-budget-salarywages/financial-budget-salarywages.component';
import { FinancialBudgetSubcontractorComponent } from './component/financial-budget/budget-grids/financial-budget-subcontractor/financial-budget-subcontractor.component';
import { FinancialBudgetFringebenefitsComponent } from './component/financial-budget/budget-grids/financial-budget-fringebenefits/financial-budget-fringebenefits.component';
import { ModificationsHeaderComponent } from './component/modifications-header/modifications-header.component';
import { FinancialFundingComponent } from './component/financial-funding/financial-funding.component';
import { FinancialLedgerComponent } from './component/financial-ledger/financial-ledger.component';
import { FinancialInvoicesComponent } from './component/financial-invoices/financial-invoices.component';
import { ModificationsComponent } from './component/modifications/modifications.component';
import { ModificationsBudgetComponent } from './component/modifications/modifications-budget/modifications-budget.component';
import { ModificationsPersonnelComponent } from './component/modifications/modifications-personnel/modifications-personnel.component';
import { InvoiceDialogComponent, DialogEntryComponent } from './component/financial-invoices/invoice-dialog/invoice-dialog.component';
import { FinancialInvoicesBalancesComponent } from './component/financial-invoices/invoice-dialog/financial-invoices-balances/financial-invoices-balances.component';
import { FinancialInvoicesBudgetCategoriesComponent } from './component/financial-invoices/invoice-dialog/financial-invoices-budget-categories/financial-invoices-budget-categories.component';
import { FinancialInvoicesCommentuploadsComponent } from './component/financial-invoices/invoice-dialog/financial-invoices-commentuploads/financial-invoices-commentuploads.component';
import { FinancialInvoicesEncumbranceComponent } from './component/financial-invoices/invoice-dialog/financial-invoices-encumbrance/financial-invoices-encumbrance.component';
import { FinancialInvoicesInvoiceComponent } from './component/financial-invoices/invoice-dialog/financial-invoices-invoice/financial-invoices-invoice.component';
import { ModificationsBaseComponent } from './component/modifications/modifications-base/modifications-base.component';
import { ModificationsFundingComponent } from './component/modifications/modifications-funding/modifications-funding.component';
import { ModificationsUploadsComponent } from './component/modifications/modifications-uploads/modifications-uploads.component';
import { EditPrjAbstractComponent } from './containers/edit-prj-abstract/edit-prj-abstract.component';
import { EditModificationScopeComponent } from './containers/modifications/edit-modification-scope/edit-modification-scope.component';
import { EditPrjPhasePageComponent } from './containers/edit-prj-phase/edit-prj-phase-page.component';
import { PrjPhaseListComponent } from './component/prj-phases-list/prj-phases-list.component';
import { PrjPhaseSaveComponent } from './component/prj-phase-save/prj-phase-save.component';
import { ProjectForDDreducer } from './state/reducers/projectForDD.reducer';
import { SalarywagesComponent } from './component/financial-budget/budget-dialogs/salarywages/salarywages.component';
import { SubcontractorComponent } from './component/financial-budget/budget-dialogs/subcontractor/subcontractor.component';
import { OthercategoriesComponent } from './component/financial-budget/budget-dialogs/othercategories/othercategories.component';
import { reducers } from '../manage/state/reducers';
import { courseReducer } from '../manage/state/reducers/administration-categories';
import { FundingListStoreEffects } from '../manage/state/effects/fundingtype';
import { SpecificListStoreEffects } from '../manage/state/effects/specificlist';
import { budgetReducer } from './state/reducers/budget.reducers';
import { BudgetEffects } from './state/effects/budget.effects';
import { PrjEventsListComponent } from './component/prj-events-list/prj-events-list.component';
import { EditPrjEventsPageComponent } from './containers/edit-prj-events-page/edit-prj-events-page.component';
import { budgetCategoryReducer } from './state/reducers/budgetCategory.reducer';
import { PrjEventSaveComponent } from './component/prj-event-save/prj-event-save.component';
import { EditPrjSummaryPageComponent } from './containers/edit-prj-summary/edit-prj-summary-page.component';
import { ProjectCurrentSummaryEffects } from './state/effects/projectCurrentSummary.effects';
import { EditPrjAbstractPageEffects } from './state/effects/edit-project-abstract-page.effects';
import { EditPrjPhasePageEffects } from './state/effects/edit-project-phase-page.effects';
import { projectSummaryReducer } from './state/reducers/project-summary.reducer';
import { reducer } from './state/reducers/edit-project-abstract-page.reducer';
import { projectPhaseReducer } from './state/reducers/edit-project-phase-page.reducer';
import { PrjInfoPageComponent } from './containers/prj-info/prj-info-page.component';
import { PrjInfoFormComponent } from './component/prj-info/prj-info-display.component';
import { projectInfoReducer } from './state/reducers/project-info.reducer';
import { ProjectInfoEffects } from './state/effects/projectInfo.effects.ts';
import { projectBudgetCategoryReducer } from './state/reducers/edit-project-budgetCategory-page.reducer';
import { EditPrjBudgetPageComponent } from './containers/edit-prj-budget-page/edit-prj-budget-page.component';
import { finBudgetCategoryListComponent } from './component/fin-budget-category-list/fin-budgetCategory-list.component';
import { OtherCategoriesBudgetSaveComponent } from './component/fin-budget-save/other-categories/otherCategories-budget-save.component';
import { SalaryWagesBudgetSaveComponent } from './component/fin-budget-save/salary-wages/salarywages-budget-save.component';
import { SubContractorBudgetSaveComponent } from './component/fin-budget-save/subcontractor/subcontractor-budget-save.component';
import { projectBudgetReducer } from './state/reducers/edit-project-budget-page.reducer';
import { EditPrjBudgetPageEffects } from './state/effects/edit-project-budget-page-effects';
import { EditPrjUploadsPageComponent } from './containers/edit-prj-uploads-page/edit-prj-uploads-page.component';
import { PrjUploadSaveComponent } from './component/prj-upload-save/prj-upload-save.component';
import { PrjUploadsListComponent } from './component/prj-uploads-list/prj-uploads-list.component';
import { EditProjectUploadsPageEffects } from './state/effects/edit-project-uploads-page.effects';
import { EditPrjCbPageComponent } from './containers/edit-prj-cb-page/edit-prj-cb-page.component';
import { PrjCbListComponent } from './component/prj-cb-list/prj-cb-list.component';
import { PrjCbSaveComponent } from './component/prj-cb-save/prj-cb-save.component';
import { EditPrjCbPageEffects } from './state/effects/edit-prj-cb-page.effects';
import { CBReducer } from './state/reducers/edit-prj-cb-page.reducer';
import { FileUploadsEffects } from './state/effects/file-uploads.effects';
import { EditFinFundingPageComponent } from './containers/edit-fin-funding-page/edit-fin-funding-page.component';
import { FinFundingListComponent } from './component/fin-funding-list/fin-funding-list.component';
import { FinFundingSaveComponent } from './component/fin-funding-save/fin-funding-save-component';
import { fundingReducer } from './state/reducers/edit-fin-funding-page.reducer';
//import { uploadsReducer } from './state/reducers/edit-project-uploads-page.reducer';
import { EditFinFundingsPageEffects } from './state/effects/edit-fin-funding-page.effect';
import { GetFinLedgerPageComponent } from './containers/get-fin-ledger-page/get-fin-ledger-page.component';
import { FinLedgerComponent } from './component/fin-ledger/fin-ledger.component';
import { LedgerReducer } from './state/reducers/get-fin-ledger-page.reducer';
import { LedgerEffects } from './state/effects/get-fin-ledger-page.effects';

@NgModule({
  declarations: [
    PrjComponent,
    PrjDetailComponent,
    PrjPersonnelComponent,
    EditPrjCbPageComponent,
    PrjHeaderComponent,
    FinancialHeaderComponent,
    FinancialOverviewComponent,
    FinancialBudgetComponent,
    FinancialInvoicesComponent,
    FinancialLedgerComponent,
    PrjSummaryComponent,
    PrjAbstractComponent,
    EditPrjAbstractComponent,
    LinkDialog,
    ImageUploaderDialog,
    FinancialBudgetSalarywagesComponent,
    FinancialBudgetSubcontractorComponent,
    FinancialBudgetFringebenefitsComponent,
    ModificationsHeaderComponent,
    FinancialFundingComponent,
    DialogEntryComponent,
    ModificationsComponent,
    ModificationsBudgetComponent,
    ModificationsPersonnelComponent,
    InvoiceDialogComponent,
    FinancialInvoicesBalancesComponent,
    FinancialInvoicesBudgetCategoriesComponent,
    FinancialInvoicesCommentuploadsComponent,
    FinancialInvoicesEncumbranceComponent,
    FinancialInvoicesInvoiceComponent,
    ModificationsBaseComponent,
    ModificationsFundingComponent,
    ModificationsUploadsComponent,
    EditPrjAbstractComponent,
    EditModificationScopeComponent,
    PrjEventSaveComponent,
    SalarywagesComponent,
    SubcontractorComponent,
    OthercategoriesComponent,
    PrjEventsListComponent,
    EditPrjEventsPageComponent,
    PrjEventSaveComponent,
    EditPrjSummaryPageComponent,
    EditPrjPhasePageComponent,
    PrjPhaseListComponent,
    PrjPhaseSaveComponent,
    PrjInfoPageComponent,
    PrjInfoFormComponent,
    EditPrjBudgetPageComponent,
    finBudgetCategoryListComponent,
    OtherCategoriesBudgetSaveComponent,
    SalaryWagesBudgetSaveComponent,
    SubContractorBudgetSaveComponent,
    EditPrjUploadsPageComponent,
    PrjUploadSaveComponent,
    PrjUploadsListComponent,
    PrjCbListComponent,
    PrjCbSaveComponent,
    EditFinFundingPageComponent,
    FinFundingListComponent,
    FinFundingSaveComponent,
    GetFinLedgerPageComponent,
    FinLedgerComponent

  ],

  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('projectForDD', ProjectForDDreducer),
    StoreModule.forFeature('project', projectReducer),
    StoreModule.forFeature('projectType', projectTypeReducer),
    StoreModule.forFeature('agency', Agencyreducer),
    StoreModule.forFeature('personnel', personnelReducer),
    StoreModule.forFeature('adminstration', reducers),
    StoreModule.forFeature('administrationCategory', courseReducer),
    StoreModule.forFeature('controllingBoard', CBReducer),
    StoreModule.forFeature('adminstration', reducers),
    StoreModule.forFeature('administrationCategory', courseReducer),
    StoreModule.forFeature('budgets', budgetReducer),
    StoreModule.forFeature('budgetCategory', budgetCategoryReducer),
    StoreModule.forFeature('projectBudgetCategories', projectBudgetCategoryReducer),
    StoreModule.forFeature('projectBudget', projectBudgetReducer),
    StoreModule.forFeature('currentSummary', projectSummaryReducer),
    StoreModule.forFeature('projectAbstract', reducer),
    StoreModule.forFeature('projectPhase', projectPhaseReducer),
    StoreModule.forFeature('prjInfo', projectInfoReducer),
    StoreModule.forFeature('projectFunding', fundingReducer),
    StoreModule.forFeature('Ledgers', LedgerReducer),


    EffectsModule.forFeature([ProjectForDDEffects, FundingListStoreEffects, SpecificListStoreEffects, AdministrationStoreEffects, AgencyEffects, ProjectTypeEffects, EditPrjEventsPageEffects,
      PersonnelEffects, BudgetEffects, ProjectCurrentSummaryEffects, EditPrjAbstractPageEffects, EditPrjPhasePageEffects, EditPrjBudgetPageEffects, ProjectInfoEffects, EditProjectUploadsPageEffects, EditPrjCbPageEffects, FileUploadsEffects, EditFinFundingsPageEffects, LedgerEffects]),
    UploadModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
  ],
  entryComponents: [PrjComponent, PrjHeaderComponent, PrjDetailComponent]
})
export class ProjectModule { }
