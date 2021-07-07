using FooBarFrontend;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FooBarMainWeb
{
    public class Startup : SharedStartup
    {
        public Startup(IHostEnvironment env, IConfiguration configuration) : base(env, configuration)
        {
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureServices_Stage1(services);

            services.AddMvc();

            ConfigureServices_Stage2(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            Configure_Stage1(app);

            Configure_Stage2(app);
        }

        public void ConfigureDevelopment(IApplicationBuilder app)
        {
            Configure_Stage1(app);

            app.UseDeveloperExceptionPage();

            Configure_Stage2(app);
        }
    }
}
