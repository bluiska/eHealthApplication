using System;
using System.Collections.Generic;

namespace eHealth_DataBus.Extensions
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> Read();
        void Create(TEntity obj);
        void Update(TEntity obj);
        void Delete(Uri uri);
    }
}
