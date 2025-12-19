using IGS.Ticketing.Service.Common.Dtos;

namespace IGS.Ticketing.Service.Common.Permission
{
    public static class Permissions
    {
        public static class UserPerm
        {
            public static readonly Guid View = Guid.Parse("d3f4d03a-39d9-4c45-b321-21abdfab1b01");
            public static readonly Guid Insert = Guid.Parse("d3f4d03a-39d9-4c45-b321-21abdfab1b54");
            public static readonly Guid Update = Guid.Parse("20b85948-2d9d-4e3f-8890-12a2dc964a3c");
            public static readonly Guid Delete = Guid.Parse("3f8c8f4b-90f7-4784-9c4c-6a0673de1f56");
        }
        public static IEnumerable<Guid> All()
        {
            return typeof(Permissions)
                .GetNestedTypes()
                .SelectMany(t => t.GetFields()
                    .Where(f => f.FieldType == typeof(Guid))
                    .Select(f => (Guid)f.GetValue(null)!));
        }
        public static TreeNode GetSecurityItems()
        {
            var parentNode = new TreeNode("مدیریت سیستم", new List<TreeNode>());

            var userNode = new TreeNode("کاربران", new List<TreeNode>());
            userNode.Child.Add(new TreeNode("مشاهده", UserPerm.View));
            userNode.Child.Add(new TreeNode("اضافه", UserPerm.Insert));
            userNode.Child.Add(new TreeNode("ویرایش", UserPerm.Update));
            userNode.Child.Add(new TreeNode("حذف", UserPerm.Delete));
            parentNode.Child.Add(userNode);

            return parentNode;
        }
    }
}
