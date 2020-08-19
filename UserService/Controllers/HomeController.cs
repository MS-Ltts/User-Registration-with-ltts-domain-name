using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using UserService.Models;
using System.Configuration;
using MongoDB.Driver;

namespace UserService.Controllers
{
   // [Route("api[controller]")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        IMongoClient mongoClient = new MongoClient("mongodb://localhost:27017");

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public ActionResult Index()
        {
            return View();
        }
      
      [HttpPost]
        public ActionResult DoSignUp(User input) {
                if (ModelState.IsValid && input.Name != null)
                {
                    var DB = mongoClient.GetDatabase("User_DB");
                    var collection = DB.GetCollection<User>("User");
                    var _checkuser = collection.AsQueryable().FirstOrDefault(x => x.Email == input.Email);
                if (_checkuser == null)
                {
                    collection.InsertOne(input);
                    return Json(new { result = true });
                  }
                else
                {
                    return Json(new { result = false });
                }
            }
                return View("Index");
           
        }

        [HttpPost]
        public ActionResult DoSignIn(User input)
        {
            if (ModelState.IsValid && input.Email != null && input.Password!=null)
            {
                var DB = mongoClient.GetDatabase("User_DB");
                var collection = DB.GetCollection<User>("User");
                var _checkuser = collection.AsQueryable().FirstOrDefault(x => x.Email == input.Email && x.Password==input.Password);
                if (_checkuser != null)
                {
                    return Json(new { result = true });
                }
                else {
                    return Json(new { result = false });
                }
            }
            return View("Index");

        }
    }
}
