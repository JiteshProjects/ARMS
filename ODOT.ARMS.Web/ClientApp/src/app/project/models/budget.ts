export interface IBudget {
  projId: string;
  budgetCategory: number;
  budgetId: string;
  phaseId: string;
  bcAltId: number;
  budgetAmount: number;
  budgetTitle: string;
  odotFunding: number;
  orgCostSharing: number;
  qty?: number;
  amount?: number;
  notes: string;
  activeInd: string;
  entryDt: Date;
  userId: string;
}

export class Budget implements IBudget {
  projId: string;
  budgetCategory: number;
  budgetId: string;
  phaseId: string;
  bcAltId: number;
  budgetAmount: number;
  budgetTitle: string;
  odotFunding: number;
  orgCostSharing: number;
  qty?: number;
  amount?: number;
  notes: string;
  activeInd: string;
  entryDt: Date;
  userId: string;


  constructor(projId: string, budgetCategory: number, budgetId: string, phaseId: string, bcAltId: number, budgetAmount: number,
    budgetTitle: string, odotFunding: number, orgCostSharing: number, entryDt: Date, userId: string, activeInd: string, notes?: string, amount?: number, qty?: number) {
    this.projId = projId;
    this.budgetCategory = budgetCategory;
    this.budgetId = budgetId;
    this.phaseId = phaseId;
    this.bcAltId = bcAltId;
    this.budgetAmount = budgetAmount;
    this.budgetTitle = budgetTitle;
    this.odotFunding = odotFunding;
    this.orgCostSharing = orgCostSharing;
    this.qty = qty;
    this.amount = amount;
    this.notes = notes;
    this.activeInd = activeInd;
    this.entryDt = entryDt;
    this.userId = userId;

  }
}

export interface IBudgetCategory {
  budgetCatId: number;
  projId: string;
  budgetAmt: number;
  budgetCatText: string;
  bcAltId: number;
}

export class BudgetCategory implements IBudgetCategory {
  budgetCatId: number;
  projId: string;
  budgetAmt: number;
  budgetCatText: string;
  bcAltId: number;
}

//Fetch from API??
export enum BudgetDialogCategories {
  salariesandwages = 'Salaries and Wages',
  subcontractor = 'SubContractor 1'
}

export class OtherCategoryViewModel {
  constructor(public bcAltId: number, public budgetId: string, public phaseId: string, public phaseTxt: string, public budgetTitle,
    public odotFunding: number, public orgCostSharing: number, public activeInd: string) { }
}

export class SalaryWagesViewModel {
  constructor(public bcAltId: number, public budgetId: string, public phaseId: string, public phaseTxt: string, public budgetTitle,
    public qty: number, public odotFunding: number, public orgCostSharing: number, public notes: string, public activeInd: string, public budgetCategoryValue: number, public budgetCategoryText: string) { }
}

export class SubContractorViewModel {
  constructor(public bcAltId: number, public budgetId: string, public phaseId: string, public phaseTxt: string, public budgetTitle,
    public amount: number, public activeInd: string) { }
}
