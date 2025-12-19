using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace IGS.Ticketing.Service.Common.Security
{
    public static class PasswordHasher
    {
        public static (byte[] Hash, byte[] Salt) HashPassword(string password)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(16);

            byte[] hash = KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100_000,
                numBytesRequested: 32);

            return (hash, salt);
        }
        public static bool VerifyPassword(string password, byte[] hash, byte[] salt)
        {
            var hashToCompare = KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100_000,
                numBytesRequested: 32);

            return CryptographicOperations.FixedTimeEquals(hash, hashToCompare);
        }
    }
}
