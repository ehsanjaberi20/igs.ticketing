using IGS.Ticketing.Service.Business.Service;
using IGS.Ticketing.Service.Common.IService;
using Microsoft.Extensions.DependencyInjection;

namespace IGS.Ticketing.Service.Business
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBusinessLayer(this IServiceCollection services, string connectionString)
        {
            services.AddDataLayer(connectionString);
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPermissionService, PermissionService>();

            //var assembly = Assembly.GetExecutingAssembly();
            //var types = assembly.GetTypes()
            //    .Where(t => t.IsClass && !t.IsAbstract && t.IsPublic);

            //foreach (var impl in types)
            //{
            //    var iface = impl.GetInterfaces().FirstOrDefault(i => i.Name == "I" + impl.Name);
            //    if (iface != null)
            //        services.AddScoped(iface, impl);
            //}

            return services;
        }
    }
}
