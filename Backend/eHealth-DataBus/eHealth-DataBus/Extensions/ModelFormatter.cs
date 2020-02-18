using System;
using eHealth_DataBus.Models;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Extensions
{
    public class ModelFormatter<T> where T : Resource
    {
        private readonly string uri, classType;
        public ModelFormatter(DbContextTrinity trinity)
        {
            classType = typeof(T).Name;
            uri = trinity.DefaultModel.Uri.AbsoluteUri;
        }

        public T FormatObject(dynamic obj)
        {
            // Add a URI ID to the new Object
            obj.uri = $"{uri}#{classType}_{DateTime.Now.ToString("HHmmss_ddMMyyyy")}";
            return obj.ToObject<T>();
        }

        public T FormatObject(dynamic obj, string uri_id)
        {
            // Take the URI ID to retrieve the URI of the object
            obj.uri = GetObjectReference(uri_id);
            return obj.ToObject<T>();
        }

        public Uri GetObjectUriByID(string uri_id)
        {
            // Take the URI ID to retrieve the URI of the object
            return new Uri(GetObjectReference(uri_id));
        }

        public string GetObjectReference(string uri_id)
        {
            return $"{uri}#{uri_id}";
        }
    }
}
