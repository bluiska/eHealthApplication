using System;
using System.Collections.Generic;
using eHealth_DataBus.Models;
using eHealth_DataBus.Extensions;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;

namespace eHealth_DataBus.Controllers
{
    [ODataRoutePrefix("BloodPressureReadings")]
    public class BloodPressureReadingsController : ODataController
    {
        private readonly ModelRepository<BloodPressureReading> repo;
        private readonly ModelFormatter<BloodPressureReading> shaper;

        public BloodPressureReadingsController(DbContextTrinity trinity)
        {
            repo = new ModelRepository<BloodPressureReading>(trinity);
            shaper = new ModelFormatter<BloodPressureReading>(trinity);
        }

        [EnableQuery]
        public IEnumerable<BloodPressureReading> Get()
        {
            return repo.Read();
        }

        public void Post([FromBody] Object meta)
        {
            repo.Create(shaper.FormatObject(meta));
        }

        [ODataRoute("{uri_id}")]
        public void Put([FromBody] Object meta, [FromODataUri] string uri_id)
        {
            repo.Update(shaper.FormatObject(meta, uri_id));
        }

        [ODataRoute("{uri_id}")]
        public void Delete([FromODataUri] string uri_id)
        {
            repo.Delete(shaper.GetObjectUriByID(uri_id));
        }
    }
}