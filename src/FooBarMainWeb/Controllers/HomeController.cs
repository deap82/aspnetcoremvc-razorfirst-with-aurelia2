using FooBarMainWeb.Models.Home;
using Microsoft.AspNetCore.Mvc;

namespace FooBarMainWeb.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

		public IActionResult Start()
		{
			return View();
		}

		public IActionResult About()
        {
            var model = new AboutModel
            {
                Topic = "History"
            };

            return View(model);
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
