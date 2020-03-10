using System;
using Newtonsoft.Json;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.DistanceSport)]
    public class DistanceSport : Exercise
    {
        public DistanceSport(Uri uri) : base(uri) { }
        
        [JsonConstructor]
        public DistanceSport(string uri) : base(new Uri(uri)) { }

        [RdfProperty(EHS.calories_burnt)]
        public double CaloriesBurnt { get; set; }

        [RdfProperty(EHS.start_time)]
        public DateTime StartTime { get; set; }

        [RdfProperty(EHS.end_time)]
        public DateTime EndTime { get; set; }

        [RdfProperty(EHS.distance)]
        public double Distance { get; set; }
    }
}
