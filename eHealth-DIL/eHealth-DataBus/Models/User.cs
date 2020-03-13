﻿using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.User)]
    public class User : Master
    {
        public User(Uri uri) : base(uri) {}

        [JsonConstructor]
        public User(string uri) : base(new Uri(uri)) { }

        [Required, RdfProperty(EHS.name)]
        public string Name { get; set; }
    }
}
