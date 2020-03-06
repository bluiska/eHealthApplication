using System;
using System.ComponentModel.DataAnnotations;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    public class Master : Resource
    {
        /*
         * The Master class simulates Trinity's resource class
         * with the main responsibility of using the URI ID as
         * unique identifier for each model. 
         */
        public Master(Uri uri) : base(uri)
        {
            _ID = uri.AbsoluteUri;
        }

        private string _ID;

        [Key]
        public string ID
        {
            get
            {
                var indexHash = _ID.IndexOf("#") + 1;
                return _ID.Substring(indexHash);
            }
            set { }
        }
    }
}
