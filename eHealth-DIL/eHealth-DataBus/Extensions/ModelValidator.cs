using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using eHealth_DataBus.Models;

namespace eHealth_DataBus.Extensions
{
    /// <summary>The ModelValidator class is responsible for validating the correctness of the models.</summary>
    /// <typeparam name="T">Represents an instance of an RDF class in Virtuoso.</typeparam>
    public class ModelValidator<T> where T : Master
    {
        /// <summary>The default constructor of the ModelValidator class.</summary>
        public ModelValidator() {}

        /// <summary>Validates an instance.</summary>
        /// <param name="obj">Represents the instance.</param>
        /// <returns>Returns a Boolean.</returns>
        public bool ValidateModel(T obj)
        {
            // Add a URI ID to the new Object
            var context = new ValidationContext(obj, serviceProvider: null, items: null);
            var validationResults = new List<ValidationResult>();

            return Validator.TryValidateObject(obj, context, validationResults, true);
        }

        /// <summary>Validates an instance by URI.</summary>
        /// <param name="uri">Represents the URI of an instance.</param>
        /// <returns>Returns a Boolean.</returns>
        public bool ValidateModelByUri(Uri uri)
        {
            /* Usually IDs are auto-generated on the DIL in the ModelFormatter class but
             * this is to ensure that exactly the entities of a certain class will be
             * deleted. ID pattern: [Class name]-[Timestamp]
             */
            return uri.ToString().Contains(typeof(T).Name);
        }
    }
}
