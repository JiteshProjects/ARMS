using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories
{
    public class ArmsBudgetRepository : IArmsBudgetRepository
    {
        private ARMSContext _currentContext { get; set; }
        public ArmsBudgetRepository(ARMSContext context)
        {
            _currentContext = context;
        }
        public async Task<ArmsBudget> AddArmsBudgetAsync(ArmsBudget armsBudget, int amount, int budgetCatgeoryId, Guid projId)
        {
            using (IDbContextTransaction transaction = _currentContext.Database.BeginTransaction())
            {
                try
                {
                    ArmsBudgetCategory armsBudgetCatgeory = new ArmsBudgetCategory
                    {
                        ProjId = projId,
                        BudgetAmt = amount,
                        BudgetCatId = budgetCatgeoryId,
                        BcAltId = 0,
                        EntryDt = armsBudget.EntryDt,
                        UserId = armsBudget.UserId
                
                    };
                    //insert into budget category only if absent
                    var budgetCategoryForProjectExists = _currentContext.ArmsBudgetCategory.Find(budgetCatgeoryId, projId);
                    if (budgetCategoryForProjectExists == null)
                    {
                        var budgetCategroy = await _currentContext.ArmsBudgetCategory.AddAsync(armsBudgetCatgeory);
                        _currentContext.SaveChanges();
                        armsBudget.BcAltId = budgetCategroy.Entity.BcAltId;
                    }
                    else
                    {
                        armsBudget.BcAltId = budgetCategoryForProjectExists.BcAltId;
                    }
                    armsBudget.ActiveInd = "A";
                    await _currentContext.ArmsBudget.AddAsync(armsBudget);

                    _currentContext.Attach(armsBudget);
                    _currentContext.Entry(armsBudget).State = Microsoft.EntityFrameworkCore.EntityState.Added;
                    _currentContext.SaveChanges();

                    transaction.Commit();
                    return armsBudget;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }

        }

        public async Task<List<ArmsBudgetCategory>> GetBudgetCategories()
        {
            return await _currentContext.ArmsBudgetCategory.Select(x => new ArmsBudgetCategory
            {
                BcAltId = x.BcAltId,
                BudgetCatId = x.BudgetCatId,
                BudgetAmt = x.BudgetAmt,
                BudgetCatText = x.BudgetCat.AdministrationCategoryText
            }).ToListAsync();
        }

        public async Task<List<ArmsBudgetCategory>> GetBudgetCategoriesByProject(Guid projectId)
        {
            return await _currentContext.ArmsBudgetCategory.Where(y => y.ProjId == projectId).Select(x => new ArmsBudgetCategory
            {
                BcAltId = x.BcAltId,
                BudgetCatId = x.BudgetCatId,
                BudgetAmt = x.BudgetAmt,
                BudgetCatText = x.BudgetCat.AdministrationCategoryText,
                ProjId = x.ProjId
            }).ToListAsync();
        }

        public async Task<List<DTOs.BudgetForDD>> GetArmsBudgetByCategories(Guid projectId)
        {
            //return await _currentContext.ArmsBudget.ToListAsync();
            return await _currentContext.ArmsBudget
        .Join(
            _currentContext.ArmsBudgetCategory,
            B => B.BcAltId,
            BC => BC.BcAltId,
            (B, BC) => new DTOs.BudgetForDD
            {
                ActiveInd = B.ActiveInd,
                Amount = B.Amount,
                BcAltId = B.BcAltId,
                BudgetAmount = (int)BC.BudgetAmt,
                BudgetCategory = BC.BudgetCatId,
                BudgetId = B.BudgetId,
                BudgetTitle = B.BudgetTitle,
                EntryDt = B.EntryDt,
                Notes = B.Notes,
                OdotFunding = B.OdotFunding,
                OrgCostSharing = B.OrgCostSharing,
                PhaseId = B.PhaseId,
                ProjId = BC.ProjId,
                Qty = B.Qty,
                UserId = B.UserId
            }
        ).Where(e=>e.ProjId==projectId).ToListAsync();
        }

        public async Task<List<ArmsBudget>> GetArmsBudgets()
        {
            return await _currentContext.ArmsBudget.ToListAsync();
        }

        public ArmsBudget UpdateBudget(ArmsBudget budget)
        {
            _currentContext.ArmsBudget.Update(budget);
            _currentContext.Attach(budget);
            _currentContext.Entry(budget).State = EntityState.Modified;
            _currentContext.SaveChanges();
            return budget;
        }
    }
}
