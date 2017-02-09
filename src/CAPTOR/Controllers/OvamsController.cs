using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CAPTOR.Controllers
{
    public class OvamsController : Controller
    {
        public IActionResult newclient()
        {
            return View();
        }
        public IActionResult AddressInfo()
        {
            return View();
        }
        public IActionResult Demographics()
        {
            return View();
        }
        public IActionResult searchClient()
        {
            return View();
        }

    }

}
