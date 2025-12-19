using IGS.Ticketing.Service.Common.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IGS.Ticketing.Service.Classes
{
    public static class JwtHelper
    {
        public static string GenerateToken(IConfiguration config, string username, User user)
        {
            var key = Encoding.UTF8.GetBytes(config["Jwt:Key"] ?? "");
            var issuer = config["Jwt:Issuer"];
            var audience = config["Jwt:Audience"];

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                //new Claim(ClaimTypes.Role, "Admin"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };


            var securityKey = new SymmetricSecurityKey(key);
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(double.Parse(config["Jwt:ExpireMinutes"])),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
