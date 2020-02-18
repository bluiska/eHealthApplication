using System;
using Semiodesk.Trinity;
using Newtonsoft.Json;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.Running)]
    public class Running : Activity
    {
        public Running(Uri uri) : base(uri) { }
        
        [JsonConstructor]
        public Running(string uri) : base(new Uri(uri)) { }

        [RdfProperty(EHS.calories_burnt)]
        public double CaloriesBurnt { get; set; }

        [RdfProperty(EHS.start_time)]
        public string StartTime { get; set; }

        [RdfProperty(EHS.end_time)]
        public string EndTime { get; set; }

        [RdfProperty(EHS.distance)]
        public double Distance { get; set; }

        [RdfProperty(EHS.steps)]
        public int Steps { get; set; }
    }
}
