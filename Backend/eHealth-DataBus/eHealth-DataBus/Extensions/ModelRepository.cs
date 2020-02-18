using System;
using System.Collections.Generic;
using System.Linq;
using eHealth_DataBus.Models;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Extensions
{
    public class ModelRepository<TEntity> : IRepository<TEntity> where TEntity : Resource
    {
        internal DbContextTrinity _dbt;

        public ModelRepository(DbContextTrinity trinity)
        {
            _dbt = trinity;
        }

        public IEnumerable<TEntity> Read()
        {
            return _dbt.DefaultModel
                       .GetResources<TEntity>(true)
                       .ToList();
        }

        public void Create(TEntity obj)
        {
            _dbt.DefaultModel.AddResource(obj);
            obj.Commit();
        }

        public void Update(TEntity obj)
        {
            _dbt.DefaultModel.UpdateResource(obj);
        }

        public void Delete(Uri uri)
        {
            _dbt.DefaultModel.DeleteResource(uri);
        }

        public IEnumerable<dynamic> GetQuery(string query)
        {
            return _dbt.DefaultModel
                       .ExecuteQuery(new SparqlQuery(query))
                       .GetBindings();
        }
    }
}