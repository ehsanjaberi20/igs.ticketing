using IGS.Ticketing.Service.DataLayer;
using IGS.Ticketing.Service.DataLayer.Database;
using Microsoft.Extensions.DependencyInjection;
namespace IGS.Ticketing.Service.Business
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDataLayer(this IServiceCollection services, string connectionString)
        {
            services.AddSingleton<IDbConnectionFactory>(sp => new DbConnectionFactory(connectionString));

            services.AddScoped<IUserDal, UserDal>();
            services.AddScoped<IPermissionDal, PermissionDal>();

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
