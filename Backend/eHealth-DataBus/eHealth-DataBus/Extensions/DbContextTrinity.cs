using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using eHealth_DataBus.Models;
using Microsoft.AspNet.OData.Builder;
using Microsoft.OData.Edm;
using Semiodesk.Trinity;
using Semiodesk.Trinity.Store.Virtuoso;

namespace eHealth_DataBus.Extensions
{
    public class DbContextTrinity
    {
        public IStore Store { get { return StoreFactory.CreateStore(_connectionString); } }

        private string _connectionString = "provider=virtuoso;host=127.0.0.1;port=1111;uid=dba;pw=dba;rule=urn:example/ruleset";
        public IModel DefaultModel { get { return Store.GetModel(_defaultModelUri); } }

        Uri _defaultModelUri = new Uri("http://www.ehealth.ie/semantics");

        public DbContextTrinity() {}

        public void Initialise()
        {
            StoreFactory.LoadProvider<VirtuosoStoreProvider>();
            Store.InitializeFromConfiguration(Path.Combine(Environment.CurrentDirectory, "ontologies.config"));
            OntologyDiscovery.AddAssembly(Assembly.GetExecutingAssembly());
            MappingDiscovery.RegisterCallingAssembly();
        }

        public static IEdmModel GetEdmModel()
        {
            // Set up Entity Data Model for OData
            var builder = new ODataConventionModelBuilder();
            SetEntitySets(builder);

            var obj = builder.EntityType<Master>();

            // Disable inheriting Trinity properties for OData
            IgnoreTrinityProperties(obj);

            // Enable SPARQL methods
            //EnableSparqlQueries(obj);

            return builder.GetEdmModel();
        }

        private static void SetEntitySets(ODataConventionModelBuilder b)
        {
            //b.EntitySet<Master>("Masters");
            b.EntitySet<User>("Users");
            b.EntitySet<Patient>("Patients");
            b.EntitySet<Doctor>("Doctors");
            b.EntitySet<Activity>("Activities");
            b.EntitySet<Running>("Runnings");
            b.EntitySet<WeightReading>("WeightReadings");
            b.EntitySet<BloodPressureReading>("BloodPressureReadings");
        }

        private static void IgnoreTrinityProperties<T>(EntityTypeConfiguration<T> entity) where T : Resource
        {
            entity.Ignore(v => v.IsDisposed);
            entity.Ignore(v => v.IsNew);
            entity.Ignore(v => v.IsSynchronized);
            entity.Ignore(v => v.Language);
            entity.Ignore(v => v.Model);
            entity.Ignore(v => v.Uri);
        }

        private static void EnableSparqlQueries<T>(EntityTypeConfiguration<T> entity) where T : Resource
        {
            //entity.Namespace = "MetaObjects";
            //entity.Collection
            //      .Function("GetLayers")
            //      .Returns<IEnumerable<string>>();
        }
    }
}
