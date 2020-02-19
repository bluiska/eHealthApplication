using System;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.DistanceSport)]
    public class DistanceSport : Exercise
    {
        public DistanceSport(Uri uri) : base(uri) { }

        [RdfProperty(EHS.calories_burnt)]
        public double CaloriesBurnt { get; set; }

        [RdfProperty(EHS.start_time)]
        public string StartTime { get; set; }

        [RdfProperty(EHS.end_time)]
        public string EndTime { get; set; }

        [RdfProperty(EHS.distance)]
        public double Distance { get; set; }
    }
}
