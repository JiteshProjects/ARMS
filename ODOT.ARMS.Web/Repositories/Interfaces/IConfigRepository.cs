using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IConfigRepository
    {
        Task<List<ConfigItem>> GetAllConfigItemsAsync();
        ConfigItem UpdateConfigItem(ConfigItem ci);
        Task<ConfigItem> GetConfigByKeyAsync(string key);
    }
}
