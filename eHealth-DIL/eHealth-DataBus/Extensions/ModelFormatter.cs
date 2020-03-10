using System;
using System.Collections.Generic;
using System.Dynamic;
using eHealth_DataBus.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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

        //public T FormatObject(dynamic obj)
        //{
        //    // Add a URI ID to the new Object
        //    obj.uri = $"{uri}#{classType}_{DateTime.Now.ToString("HHmmss_ddMMyyyy")}";
        //    return obj.ToObject<T>();
        //}

        public T FormatObject(dynamic obj)
        {
            // Add a URI ID to the new Object
            var generatedUri = $"{uri}#{classType}_{DateTime.Now.ToString("HHmmss_ddMMyyyy")}";
            obj = PortIdToUri(obj, generatedUri);

            return obj.ToObject<T>();
        }

        public T FormatObject(dynamic obj, string uri_id)
        {
            obj = PortIdToUri(obj, GetObjectReference(uri_id));
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

        public dynamic PortIdToUri(dynamic obj, string absoluteUri)
        {
            var objAsDict = new Dictionary<string, object>();

            foreach (var prop in obj)
            {
                var propValue = prop.Value;
                if (prop.Value.GetType().Name.Contains("Array"))
                    propValue = TransformIdsToUris(prop);

                if (prop.Value.GetType().Name.Contains("Object"))
                    propValue = TransformIdToUri(prop);

                objAsDict[prop.Name] = propValue;
            }

            objAsDict["URI"] = absoluteUri;
            var dictAsObj = JsonConvert.SerializeObject(objAsDict);
            return JObject.Parse(dictAsObj);
        }

        public dynamic TransformIdsToUris(dynamic prop)
        {
            List<Dictionary<string, string>> uris = new List<Dictionary<string, string>>();
            foreach (var jObj in prop.Value)
            {
                foreach (var ids in jObj)
                {
                    Dictionary<string, string> uri = new Dictionary<string, string>();
                    uri["URI"] = GetObjectReference(ids.Value.ToString());
                    uris.Add(uri);
                }
            }

            return uris;
        }

        public dynamic TransformIdToUri(dynamic prop)
        {
            Dictionary<string, string> uri = new Dictionary<string, string>();
            foreach (var jObj in prop.Value)
            {
                if (jObj.Name == "ID")
                {
                    uri["URI"] = GetObjectReference(jObj.Value.ToString());
                    break;
                }
            }

            return uri;
        }
    }
}
