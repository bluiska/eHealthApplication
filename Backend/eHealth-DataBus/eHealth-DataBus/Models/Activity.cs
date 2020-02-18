using System;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.Activity)]
    public class Activity : Master
    {
        public Activity(Uri uri) : base(uri) { }
        
        [RdfProperty(EHS.name)]
        public string Name { get; set; }

        [RdfProperty(EHS.timestamp)]
        public string Timestamp { get; set; }
    }
}
