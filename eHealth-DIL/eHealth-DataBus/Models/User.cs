using System;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.User)]
    public class User : Master
    {
        public User(Uri uri) : base(uri) {}

        [RdfProperty(EHS.name)]
        public string Name { get; set; }
    }
}
