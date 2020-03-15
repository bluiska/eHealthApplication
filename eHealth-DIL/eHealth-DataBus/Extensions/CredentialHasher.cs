using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using eHealth_DataBus.Models;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Extensions
{
    /// Inspired by: https://stackoverflow.com/questions/4181198/how-to-hash-a-password/10402129#10402129
    /// <summary>The CredentialHasher class is responsible for validating the correctness of the models.</summary>
    /// <typeparam name="T">Represents an instance of an RDF class in Virtuoso.</typeparam>
    public class CredentialHasher
    {
        /// <summary>Default constructor of the CredentialHasher class</summary>
        /// <param name="trinity">References the instance of an ontology which enables the data binding capabilities with Virtuoso.</param>
        public CredentialHasher() {}

        /// <summary>Validates an instance.</summary>
        /// <param name="obj">Represents the instance.</param>
        /// <returns>Transformed instance with the hashed credentials.</returns>
        public Credential EncryptUserPassword(Credential obj, string password = "")
        {
            if (password == "")
                password = obj.Password;

            // Generate salt value
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            // Generate hash value by salt
            byte[] hash = GenerateHashFromPassword(password, salt);

            // Append the salt to the hash to produce the password hash
            byte[] hashBytes = GeneratePasswordHashBySalt(hash, salt);

            obj.Password = Convert.ToBase64String(hashBytes);
            obj.Salt = Convert.ToBase64String(salt);

            return obj;
        }

        public bool ValidateUser(string loginPassword, string dbPassword)
        {
            // Extract bytes from password hash for salt
            byte[] hashBytes = Convert.FromBase64String(dbPassword);

            // Derive the salt from password hash
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            // Generate the hash from login password
            byte[] hash = GenerateHashFromPassword(loginPassword, salt);

            // Append the salt to the login hash to produce the password hash
            byte[] passwordHash = GeneratePasswordHashBySalt(hash, salt);

            return Convert.ToBase64String(passwordHash) == dbPassword;
        }

        public byte[] GenerateHashFromPassword(string password, byte[] salt)
        {
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            return pbkdf2.GetBytes(20);
        }

        public byte[] GeneratePasswordHashBySalt(byte[] hash, byte[] salt)
        {
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            return hashBytes;
        }
    }
}
