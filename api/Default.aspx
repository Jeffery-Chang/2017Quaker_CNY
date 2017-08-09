<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="api_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:GridView ID="GridView1" runat="server"  AutoGenerateColumns="False" DataKeyNames="name" >
            <Columns>
                <asp:BoundField DataField="id" HeaderText="id" ReadOnly="True" InsertVisible="False" SortExpression="id"></asp:BoundField>
                <asp:BoundField DataField="coupletRight" HeaderText="coupletRight" SortExpression="coupletRight"></asp:BoundField>
                <asp:BoundField DataField="coupletLeft" HeaderText="coupletLeft" SortExpression="coupletLeft"></asp:BoundField>
                <asp:BoundField DataField="name" HeaderText="name" SortExpression="name"></asp:BoundField>
                <asp:BoundField DataField="email" HeaderText="email" SortExpression="email"></asp:BoundField>
                <asp:BoundField DataField="number" HeaderText="number" SortExpression="number"></asp:BoundField>
                <asp:BoundField DataField="fromIP" HeaderText="fromIP" SortExpression="fromIP"></asp:BoundField>
                <asp:BoundField DataField="remark" HeaderText="remark" SortExpression="remark"></asp:BoundField>
                <asp:BoundField DataField="remark2" HeaderText="remark2" SortExpression="remark2"></asp:BoundField>
                <asp:BoundField DataField="createtime" HeaderText="createtime" SortExpression="createtime"></asp:BoundField>
            </Columns>
        </asp:GridView>
       
        <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
       
    </div>
    </form>
</body>
</html>
