namespace IGS.Ticketing.Service.Common.Dtos
{
    public class TreeNode
    {
        public string UniqueKey { get; set; } = string.Empty;
        public string Caption { get; set; } = string.Empty;
        public List<TreeNode> Child { get; set; }

        public TreeNode(string _caption, List<TreeNode> _child)
        {
            Caption = _caption;
            Child = _child;
        }
        public TreeNode(string _caption, string _uniqueKey)
        {
            UniqueKey = _uniqueKey;
            Caption = _caption;
            Child = new List<TreeNode>();
        }
        public TreeNode(string _caption, Guid _uniqueKey)
        {
            UniqueKey = _uniqueKey.ToString();
            Caption = _caption;
            Child = new List<TreeNode>();
        }

    }
}
