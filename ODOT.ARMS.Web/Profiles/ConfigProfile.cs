using AutoMapper;

namespace ODOT.ARMS.Web.Profiles
{
    public class ConfigProfile : Profile
    {
        public ConfigProfile()
        {
            CreateMap<Entities.ConfigItem, DTOs.ConfigItem>();
        }
    }
}
