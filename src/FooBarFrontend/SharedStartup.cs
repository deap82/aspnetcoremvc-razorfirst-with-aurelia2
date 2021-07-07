using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FooBarFrontend
{
    public class SharedStartup
    {	
		protected IHostEnvironment environment { get; set; }
		public IConfigurationRoot Configuration { get; }

		public SharedStartup(IHostEnvironment env, IConfiguration configuration)
        {
			environment = env;
			Configuration = (IConfigurationRoot)configuration;
		}

		public static void SetupConfiguration(IHostEnvironment env, string applicationName, IConfigurationBuilder builder)
		{
			builder
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true) // The env version will override the defaults
				.AddEnvironmentVariables();

			var config = builder.Build();
		}

		protected void Configure_Stage1(IApplicationBuilder app)
        {

        }

		protected void Configure_Stage2(IApplicationBuilder app)
		{
			// Place static files before UseRouting()
			app.UseStaticFiles();

			app.UseRouting();
			
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute("area", "{area:exists}/{controller=Home}/{action=Index}/{id?}");
				endpoints.MapDefaultControllerRoute();
			});
		}

		protected void ConfigureServices_Stage1(IServiceCollection services)
        {

        }

		protected void ConfigureServices_Stage2(IServiceCollection services)
		{

		}
	}
}
