using System;
using Semiodesk.Trinity;
using Newtonsoft.Json;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.BloodPressureReading)]
    public class BloodPressureReading : Activity
    {
        public BloodPressureReading(Uri uri) : base(uri) { }

        [JsonConstructor]
        public BloodPressureReading(string uri) : base(new Uri(uri)) { }

        [RdfProperty(EHS.diastolic_pressure)]
        public double DiastolicPressure { get; set; }

        [RdfProperty(EHS.systolic_pressure)]
        public double SystolicPressure { get; set; }
    }
}
