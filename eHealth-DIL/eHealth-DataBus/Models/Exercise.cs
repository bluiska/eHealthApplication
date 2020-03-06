using System;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.Exercise)]
    public class Exercise : Activity
    {
        public Exercise(Uri uri) : base(uri) { }
    }
}
