using FooBarFrontend;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace FooBarMainWeb
{
    public class Program
    {
		private const string AppName = "App-Main";

		public static void Main(string[] args)
		{
			var host = Host.CreateDefaultBuilder(args)
				.ConfigureAppConfiguration((builderContext, builder) =>
					SharedStartup.SetupConfiguration(builderContext.HostingEnvironment, AppName, builder))
				.ConfigureWebHostDefaults(webBuilder =>
				{
					webBuilder
						.UseContentRoot(Directory.GetCurrentDirectory())
						.UseStartup<Startup>();
				});

			host.Build().Run();
		}
	}
}
