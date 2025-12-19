using System.ComponentModel;

namespace IGS.Ticketing.Service.Common.Enums
{
    public class Enums
    {
        public enum Role
        {
            [Description("مدیر")]
            Admin = 1,
        }
        public enum Gender
        {
            [Description("زن")]
            Female = 0,
            [Description("مرد")]
            Male = 1
        }
        public enum Status
        {
            [Description("غیر فعال")]
            Disable = 0,
            [Description("فعال")]
            Enable = 1
        }
    }
}
