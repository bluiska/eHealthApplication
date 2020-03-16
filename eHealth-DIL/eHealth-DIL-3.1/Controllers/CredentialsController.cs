using System;
using System.Collections.Generic;
using System.Linq;
using eHealth_DataBus.Models;
using eHealth_DataBus.Extensions;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VDS.RDF.Query.Expressions.Functions.Sparql.String;

namespace eHealth_DataBus.Controllers
{
    [ODataRoutePrefix("Credentials")]
    public class CredentialsController : ODataController
    {
        private readonly IRepository<Credential> repo;
        private readonly ModelFormatter<Credential> shaper;
        private readonly ModelValidator<Credential> checker;
        private readonly AuthenticationManager authenticator;
        private readonly CredentialHasher crypto;

        public CredentialsController(DbContextTrinity trinity)
        {
            repo = new ModelRepository<Credential>(trinity.DefaultModel);
            shaper = new ModelFormatter<Credential>(trinity.DefaultModel.Uri.AbsoluteUri);
            checker = new ModelValidator<Credential>(trinity.DefaultModel);
            authenticator = new AuthenticationManager("eHealth Key for Authentication");
            crypto = new CredentialHasher();
        }

        [EnableQuery]
        public IEnumerable<dynamic> Get()
        {
            return repo.Read();
        }

        [ODataRoute("ValidateUsername(username={username})")]
        public IActionResult ValidateUsername([FromODataUri] string username)
        {
            if (checker.ValidateUsername(repo.Read(), username))
                return BadRequest("Username already taken.");

            return Ok("Username is valid");
        }

        [ODataRoute("Register")]
        public IActionResult Register([FromBody] Object obj)
        {
            // Retrieve actual class of the model
            var resource = shaper.FormatObject(obj);

            // Encrypt the user's credentials for security
            resource = crypto.EncryptUserPassword(resource);

            if (checker.ValidateModel(resource))
            {
                repo.Create(resource);
                return Ok("Registration successful.");
            }

            return BadRequest("Registration failed.");
        }

        [ODataRoute("Login")]
        public IActionResult Login([FromBody] Object obj)
        {
            // Retrieve actual class of the model
            var resource = shaper.FormatObject(obj);

            // Retrieve the resource stored on the database
            var dbCred = checker.GetCredentialByUsernameValidation(repo.Read(), resource.Username);

            // Check if username is valid by instance
            if (dbCred != null)
            {
                // Check if password is valid
                if (crypto.ValidateUser(resource.Password, dbCred.Password))
                {
                    // Update password hash
                    dbCred = crypto.EncryptUserPassword(dbCred, resource.Password);
                    repo.Update(dbCred);

                    // Return user
                    var token = authenticator.Authenticate(resource.Username, resource.Password);
                    
                    return Ok(new
                    {
                        user = dbCred.User,
                        token = token
                    });
                }
            }

            return Unauthorized("Credentials invalid. Please try again.");
        }
    }
}