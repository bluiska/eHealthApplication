using System;
using System.Collections.Generic;
using eHealth_DataBus.Models;
using eHealth_DataBus.Extensions;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;

namespace eHealth_DataBus.Controllers
{
    [ODataRoutePrefix("WeightReadings")]
    public class WeightReadingsController : ODataController
    {
        private readonly ModelRepository<WeightReading> repo;
        private readonly ModelFormatter<WeightReading> shaper;

        public WeightReadingsController(DbContextTrinity trinity)
        {
            repo = new ModelRepository<WeightReading>(trinity);
            shaper = new ModelFormatter<WeightReading>(trinity);
        }

        [EnableQuery]
        public IEnumerable<dynamic> Get()
        {
            return repo.Read();
        }

        public void Post([FromBody] Object obj)
        {
            repo.Create(shaper.FormatObject(obj));
        }

        [ODataRoute("{uri_id}")]
        public void Put([FromBody] Object obj, [FromODataUri] string uri_id)
        {
            repo.Update(shaper.FormatObject(obj, uri_id));
        }

        [ODataRoute("{uri_id}")]
        public void Delete([FromODataUri] string uri_id)
        {
            repo.Delete(shaper.GetObjectUriByID(uri_id));
        }
    }
}
