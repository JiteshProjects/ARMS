using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using ODOT.ARMS.Web.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Controllers
{
    public class ConfigController : Controller
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly IMapper _mapper;
        private readonly IConfigRepository _configRepo;

        public ConfigController(IMapper mapper, IConfigRepository configRepo)
        {
            _mapper = mapper;
            _configRepo = configRepo;
        }

        [HttpGet("{keyNme}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.configforproject+json" })]
        public async Task<IActionResult> getConfigValByKey(string keyNme)
        {
            return Ok(await _configRepo.GetConfigByKeyAsync(keyNme));
        }

        [HttpPatch("{keyNme}")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.configforupdate+json" })]
        public async Task<IActionResult> UpdateCB(string keyNme, [FromBody] DTOs.ConfigItem configForUpdate)
        {
            var configFromRepo = await _configRepo.GetConfigByKeyAsync(keyNme);

            if (configFromRepo == null)
            {
                return BadRequest();
            }

            _configRepo.UpdateConfigItem(_mapper.Map(configForUpdate, configFromRepo));
            return Ok(_mapper.Map<DTOs.ConfigItem>(configFromRepo));
        }

    }
}
