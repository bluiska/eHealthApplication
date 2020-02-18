using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.Patient)]
    public class Patient : User
    {
        public Patient(Uri uri) : base(uri) { }

        [JsonConstructor]
        public Patient(string uri) : base(new Uri(uri)) { }

        [RdfProperty(EHS.is_assigned_to)]
        public List<Doctor> Doctors { get; set; }

        [RdfProperty(EHS.commits_to)]
        public List<Activity> Activities { get; set; }
    }
}
