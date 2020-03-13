using System;
using System.Collections.Generic;
using System.Linq;
using eHealth_DataBus.Models;

namespace eHealth_DataBus.Extensions
{
    /// <summary>The ModelRepository is a class that implements the IRepository interface for embodying the Repository Pattern.</summary>
    /// <typeparam name="T">T represents the Master class which is a subclass of the Resource class.</typeparam>
    public class ModelRepository<T> : IRepository<T> where T : Master
    {
        /// <summary>References the instance responsible for enforcing CRUD operations against the Virtuoso database.</summary>
        internal DbContextTrinity _dbt;

        /// <summary>Default constructor of the ModelRepository class</summary>
        /// <param name="trinity"></param>
        public ModelRepository(DbContextTrinity trinity)
        {
            _dbt = trinity;
        }

        public IEnumerable<T> Read()
        {
            // Retrieves a list of every instance related to class T.
            return _dbt.DefaultModel
                       .GetResources<T>(true)
                       .ToList();
        }

        public void Create(T obj)
        {
            // Persists a new instance on the database
            _dbt.DefaultModel.AddResource(obj);
        }

        public void Update(T obj)
        {
            _dbt.DefaultModel.UpdateResource(obj);

            /* According to Semiodesk, the Commit() function is not necessary for persisting
             * the changes on the backend as it is already calling UpdateResource().
             * However, the UpdateResource() function itself is slightly erroneous and I
             * have raised this issue and it aware with the developers responsible for
             * Trinity for fixing the bus. For now, the .Commit() function is required for
             * seeing the changes on the OData layer. The minor error is that the changed
             * data will be adding a new property to a model instead of overwriting it on
             * the DB side. Link: https://github.com/semiodesk/trinity-rdf/issues/7
             */
            obj.Commit();
        }

        public void Delete(Uri uri)
        {
            _dbt.DefaultModel.DeleteResource(uri);
        }
    }
}