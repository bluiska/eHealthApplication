using eHealth_DataBus.Models;
using eHealth_DataBus.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace eHealth_DataBus.Controllers
{
    public class OAuthController : Controller
    {
        [HttpGet]
        public IActionResult Authorise()
        {
            return null;
        }

        [HttpPost]
        public IActionResult Authorise(string username)
        {
            return null;
        }

        public IActionResult Token(string username)
        {
            return null;
        }

    }
}