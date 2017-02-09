using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace CAPTOR.Controllers
{
    public class GTS : Controller
    {
        // GET: /<controller>/
        public IActionResult AssignGrievance()
        {
            return View();
        }

        public IActionResult Summary()
        {
            return View("~/Views/GTS/Summary.cshtml");
        }

        public IActionResult AssignmentDetails()
        {
            return View();
        }
        public IActionResult InitialReview()
        {
            return View();
        }

        public IActionResult InitialResponse()
        {
            return View();
        }
        public IActionResult InitialNotes()
        {
            return View();
        }
    }
}
