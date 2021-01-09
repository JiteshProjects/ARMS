export class LookupItem {
  public value: string;
  public text: string;
  public primaryTypeId?: string;

  public static getTxtById(id: string, lst: LookupItem[]): string {
    var retVal = ''
    if ((typeof (id) === 'undefined') || (id === null) || (id === "null"))
      return '';

    try {
      for (let el of lst) {
        if (el.value === id) {
          retVal = el.text;
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return retVal;
  }
}

export enum LookupItemKeys {
  AgencyCategory = 1,
  ContactRoles = 2,
  CBType = 3,
  CBStatus = 4,
  DeliverableType = 5,
  DeliverableStatus = 6,
  FundingSrc = 7,
  FundingType = 8,
  BudgetCategory = 9,
  FundingStatus = 10,
  ImplementationStatus = 11,
  MeetingTypes = 12,
  ModificationStatus = 13,
  PrjClassification = 14,
  PrjType = 15,
  PrjStatus = 16,
  PooledFundingStatus = 17,
  PrimaryEvents = 18,
  SecondaryEvents = 19,
  CBCategory = 21,
  PhaseStatus = 22
}
