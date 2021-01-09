using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;

namespace ODOT.ARMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmsBudgetController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly IArmsBudgetRepository _armsBudgetRepository;

        public ArmsBudgetController(IMapper mapper, IArmsBudgetRepository armsBudgetRepository)
        {
            _mapper = mapper;
            _armsBudgetRepository = armsBudgetRepository;
        }

        [HttpPost]
        [Route("AddBudget")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.budgetforcreate+json" })]
        public async Task<IActionResult> AddBudget([FromBody] BudgetForDD budgetForCreate)
        {
            if (budgetForCreate == null)
            {
                return BadRequest();
            }
            Console.WriteLine("*******************************************************************************************************************************************************");
            Console.WriteLine("**");
            Console.WriteLine("** PhaseId: " + budgetForCreate.PhaseId);
            Console.WriteLine("** ProjId: " + budgetForCreate.ProjId);
            Console.WriteLine("** BudgetId: " + budgetForCreate.BudgetId);
            Console.WriteLine("**");
            Console.WriteLine("*******************************************************************************************************************************************************");

            budgetForCreate.EntryDt = DateTime.UtcNow;
            budgetForCreate.UserId = "Sai";
            budgetForCreate.BudgetId = Guid.NewGuid();
            var budget = _mapper.Map<Entities.ArmsBudget>(budgetForCreate);
            var budgetEntity = await _armsBudgetRepository.AddArmsBudgetAsync(budget, budgetForCreate.BudgetAmount, budgetForCreate.BudgetCategory, budgetForCreate.ProjId);
            var result= _mapper.Map<DTOs.BudgetForDD>(budgetEntity);
            result.BudgetCategory = budgetForCreate.BudgetCategory;
            return Ok(result);
        }

        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.armsbudgetcategorybyprojectid+json" })]
        public async Task<IActionResult> GetArmsBudgetCategories(Guid projectId)
        {
            var budgetCategories = await _armsBudgetRepository.GetBudgetCategoriesByProject(projectId);

            var result = _mapper.Map<IEnumerable<DTOs.BudgetCategoryForDD>>(budgetCategories);
            return Ok(result);
        }

        [HttpGet(Name = "GetArmsBudgetCategories")]
        [Route("GetArmsBudgetCategories")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.armsbudgetcategory+json" })]
        public async Task<IActionResult> GetArmsBudgetCategories()
        {
            var budgetCategories = await _armsBudgetRepository.GetBudgetCategories();

            var result = _mapper.Map<IEnumerable<DTOs.BudgetCategoryForDD>>(budgetCategories);
            return Ok(result);
        }

        [HttpGet("{projectId}", Name = "GetArmsBudgetByProjectId")]
        [Route("GetArmsBudgetByProjectId/{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.armsbudgetbyprojectId+json" })]
        public async Task<IActionResult> GetArmsBudgetByProjectId(Guid projectId)
        {
            var budgets = await _armsBudgetRepository.GetArmsBudgetByCategories(projectId);
         //   var result = _mapper.Map<IEnumerable<DTOs.BudgetForDD>>(budgets);
            return Ok(budgets);
        }

        [HttpGet(Name = "GetArmsBudgets")]
        [Route("GetArmsBudgets")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.armsbudgets+json" })]
        public async Task<IActionResult> GetArmsBudgets()
        {
            var budgets = await _armsBudgetRepository.GetArmsBudgets();

            var result = _mapper.Map<IEnumerable<DTOs.BudgetForDD>>(budgets);
            return Ok(result);
        }

        [HttpPatch(Name = "UpdateBudget")]
        [Route("UpdateBudget")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.budgetupdate+json" })]
        public IActionResult UpdateBudget([FromBody] BudgetForDD budgetUpdate)
        {
            if (budgetUpdate == null)
            {
                return BadRequest();
            }
            var budget = _mapper.Map<Entities.ArmsBudget>(budgetUpdate);
            var result = _armsBudgetRepository.UpdateBudget(budget);
            return Ok(result);


        }

    }
}
