﻿using System;
using Semiodesk.Trinity;
using Newtonsoft.Json;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.LegSport)]
    public class LegSport : DistanceSport
    {
        public LegSport(Uri uri) : base(uri) { }

        [RdfProperty(EHS.steps)]
        public int Steps { get; set; }
    }
}
