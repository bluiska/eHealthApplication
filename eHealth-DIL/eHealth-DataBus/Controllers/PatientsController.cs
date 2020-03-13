using System;
using System.Collections.Generic;
using eHealth_DataBus.Extensions;
using eHealth_DataBus.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;

namespace eHealth_DataBus.Controllers
{
    [ODataRoutePrefix("Patients")]
    public class PatientsController : ODataController
    {
        private readonly IRepository<Patient> repo;
        private readonly ModelFormatter<Patient> shaper;

        public PatientsController(DbContextTrinity trinity)
        {
            repo = new ModelRepository<Patient>(trinity);
            shaper = new ModelFormatter<Patient>(trinity);
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
        public void Patch([FromBody] Object obj, [FromODataUri] string uri_id)
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
