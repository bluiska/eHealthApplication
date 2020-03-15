using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.Credential)]
    public class Credential : Master
    {
        public Credential(Uri uri) : base(uri) {}

        [JsonConstructor]
        public Credential(string uri) : base(new Uri(uri)) { }

        [Required, RdfProperty(EHS.username)]
        public string Username { get; set; }

        [Required, RdfProperty(EHS.password)]
        public string Password { get; set; }

        [RdfProperty(EHS.salt)]
        public string Salt { get; set; }

        [Required, RdfProperty(EHS.links_to)]
        public User User { get; set; }
    }
}
