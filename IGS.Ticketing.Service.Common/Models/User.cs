using System.Text.Json.Serialization;
using static IGS.Ticketing.Service.Common.Enums.Enums;

namespace IGS.Ticketing.Service.Common.Models
{
    /// <summary>
    /// کاربر
    /// </summary>
    public class User
    {
        /// <summary>
        /// کد مجازی
        /// </summary>
        public int usrVCodeInt { get; set; }
        /// <summary>
        /// نام
        /// </summary>
        public string usrNameStr { get; set; } = string.Empty;
        /// <summary>
        /// نام خانوادگی
        /// </summary>
        public string usrFamilyStr { get; set; } = string.Empty;
        /// <summary>
        /// کد ملی
        /// </summary>
        public string usrNationalCodeStr { get; set; } = string.Empty;
        /// <summary>
        /// شماره همراه
        /// </summary>
        public string usrPhoneNumberStr { get; set; } = string.Empty;
        /// <summary>
        /// جنسیت
        /// </summary>
        public Gender usrGenderTny { get; set; }
        /// <summary>
        /// وضعیت
        /// </summary>
        public Status usrStatusTny { get; set; }
        /// <summary>
        /// نقش
        /// </summary>
        public Role usrRoleTny { get; set; }
        /// <summary>
        /// رمز عبور کاربر
        /// </summary>
        [JsonIgnore]
        public byte[] usrPasswordHashBin { get; set; } = [];
        /// <summary>
        /// salt
        /// </summary>
        [JsonIgnore]
        public byte[] usrSaltBin { get; set; } = [];
        /// <summary>
        /// کد مجازی کاربر ایجاد کننده
        /// </summary>
        public int usrCreatorUsrVCodeInt { get; set; }
        /// <summary>
        /// زمان ایجاد
        /// </summary>
        public DateTime usrCreateDateDtm { get; set; }
    }
}
