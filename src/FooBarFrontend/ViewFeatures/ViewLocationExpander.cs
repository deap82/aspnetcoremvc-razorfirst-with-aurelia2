using FooBarFrontend.Core;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FooBarFrontend.ViewFeatures
{
    public class ViewLocationExpander : IViewLocationExpander
	{
		private readonly IHostEnvironment _env;
		public ViewLocationExpander(IHostEnvironment env)
		{
			_env = env;
		}

		public void PopulateValues(ViewLocationExpanderContext context)
		{
			context.Values["foobar-shared"] = "true";
		}

		public virtual IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context,
			IEnumerable<string> viewLocations)
		{
			string commonFolder = _env.IsRunningLocally() ? "_CommonLocal" : "_Common";

			List<string> locs = new List<string>(viewLocations);

			locs.AddRange(viewLocations.Select(f => f.Replace(
				 "/Views/",
				$"/Views/{commonFolder}/"))); //Enables views persisted in FooBarFrontend

			locs.AddRange(viewLocations.Where(f => f.Contains("Shared")).Select(f => f.Replace(
				 "/Views/Shared/",
				 "/Views/" + commonFolder + "/{1}/"))); //Enables views persisted in FooBarFrontend

			locs.AddRange(viewLocations.Where(f => !f.Contains("Shared")).Select(f => f.Replace(
				"/Views/{1}/{0}",
				"/Views/{1}/{0}{1}"))); //Enables view name `CourseMembers.cshtml` when action is Course and Controller is Members.

			locs.AddRange(viewLocations.Where(f => f.Contains("Shared")).Select(f => f.Replace(
				 "/Views/Shared/{0}",
				 "/Views/" + commonFolder + "/{1}/{0}{1}"))); //Enables view name `CourseMembers.cshtml` when action is Course and Controller is Members, also as persisted in FooBarFrontend.

			locs.AddRange(viewLocations.Where(f => !f.Contains("Shared")).Select(f => f.Replace(
				"/Views/{1}/{0}",
				"/Views/{1}/{1}{0}"))); //Enables view name `AssignmentDetail.cshtml` when action is Detail and Controller is Assignment.

			locs.AddRange(viewLocations.Where(f => f.Contains("Shared")).Select(f => f.Replace(
				 "/Views/Shared/{0}",
				 "/Views/" + commonFolder + "/{1}/{1}{0}"))); //Enables view name `AssignmentDetail.cshtml` when action is Detail and Controller is Assignment, also as persisted in FooBarFrontend.

			locs.Add("/Views/{0}.cshtml");

			locs.Add("/{0}.cshtml"); //Enables inclusion using exact path in `partial` taghelper from app specific view to include the overridden FooBarFrontend view.

			locs = locs.Where(f => !f.StartsWith("/Pages/")).ToList(); //Remove Razor Pages paths because we don't use that

			return locs;
		}
	}
}
