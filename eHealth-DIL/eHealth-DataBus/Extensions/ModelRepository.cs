using System;
using System.Collections.Generic;
using System.Linq;
using eHealth_DataBus.Models;

namespace eHealth_DataBus.Extensions
{
    public class ModelRepository<TEntity> : IRepository<TEntity> where TEntity : Master
    {
        internal DbContextTrinity _dbt;

        public ModelRepository(DbContextTrinity trinity)
        {
            _dbt = trinity;
        }

        public IEnumerable<TEntity> Read()
        {
            var items = _dbt.DefaultModel
                            .GetResources<TEntity>(true)
                            .ToList();

            foreach (var item in items)
            {
                if (item.ID == null)
                {
                    var uri = item.Uri.ToString();
                    var separatorIndex = uri.IndexOf("#");
                    item.ID = uri.Substring(separatorIndex + 1);
                }
            }

            return items;
        }

        public void Create(TEntity obj)
        {
            _dbt.DefaultModel.AddResource(obj);
        }

        public void Update(TEntity obj)
        {
            obj.IsNew = false;
            _dbt.DefaultModel.UpdateResource(obj);
        }

        public void Delete(Uri uri)
        {
            _dbt.DefaultModel.DeleteResource(uri);
        }
    }
}