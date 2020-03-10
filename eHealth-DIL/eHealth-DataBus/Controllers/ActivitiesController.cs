using System;
using System.Collections.Generic;
using System.Linq;
using eHealth_DataBus.Models;
using eHealth_DataBus.Extensions;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;

namespace eHealth_DataBus.Controllers
{
    [ODataRoutePrefix("Activities")]
    public class ActivitiesController : ODataController
    {
        private readonly ModelRepository<Activity> repo;

        public ActivitiesController(DbContextTrinity trinity)
        {
            repo = new ModelRepository<Activity>(trinity);
        }

        [EnableQuery]
        public IEnumerable<dynamic> Get()
        {
            return repo.Read();
        }
    }
}