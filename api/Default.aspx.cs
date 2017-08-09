using System;
using System.Web;
using System.Web.Script.Serialization;
using System.Data.Common;
using System.Data;
using System.Web.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.IO;

public partial class api_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {



            string guid = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 12) + ".jpeg";
            if (InsertData("testRight", "testLeft", guid))
            {
                Label1.Text = "true";
                //DeleteData();
                //UpdateData();
                GridView1.DataSource = GetAll();                
                GridView1.DataBind();
                //if (GetAll().Rows.Count > 0)
                //    Label1.Text = GetAll().Columns.Count.ToString();
            };

        }

    }
    private DataTable GetAll()
    {
        //新增一格DataTable物件
        DataTable dt = new DataTable();

        //連線字串ConnectionStrings
        string ConnStr = "";
        if (HttpContext.Current.Request.Url.Authority == "tonicdrink.sfworldwide.com")
            ConnStr = @"Data Source=203.69.40.54;Initial Catalog=Tonicdrink;User ID=baby_webg;Password=03webg29";
        else
            ConnStr = @"Data Source=JUN-PC\SQLEXPRESS;Initial Catalog=Quaker;Integrated Security=True";
        SqlConnection conn = new SqlConnection(ConnStr);

        using (SqlDataAdapter da = new SqlDataAdapter())
        {
            da.SelectCommand = new SqlCommand();
            da.SelectCommand.Connection = conn;
            da.SelectCommand.CommandText = @"select * FROM [dbo].[event_2017ginseng]";
            da.SelectCommand.CommandType = CommandType.Text;
            try
            {
                da.Fill(dt);
            }
            catch (Exception ex)
            {
            }
        }

        return dt;
    }

    private bool DeleteData()
    {
        bool re = false;
        //連線字串ConnectionStrings
        string ConnStr = "";
        if (HttpContext.Current.Request.Url.Authority == "tonicdrink.sfworldwide.com")
            ConnStr = @"Data Source=203.69.40.54;Initial Catalog=Tonicdrink;User ID=baby_webg;Password=03webg29";
        else
            ConnStr = @"Data Source=JUN-PC\SQLEXPRESS;Initial Catalog=Quaker;Integrated Security=True";

        using (SqlConnection conn = new SqlConnection(ConnStr))
        {
            SqlCommand comm = new SqlCommand();
            comm.Connection = conn;

            comm.CommandText = @"
                DELETE FROM [dbo].[event_2017ginseng] WHERE [remark]=@remark
              ";
            comm.CommandType = CommandType.Text;
            comm.Parameters.Add("@remark", SqlDbType.NVarChar).Value = "a3470db30562.jpeg";
            conn.Open();
            comm.ExecuteNonQuery();


            conn.Close();

            re = true;
            return re;
        }
    }

    private bool InsertData(string CRight, string CLeft, string guid)
    {
        bool re = false;
        string ConnStr = "";
        if (HttpContext.Current.Request.Url.Authority == "tonicdrink.sfworldwide.com")
            ConnStr = @"Data Source=203.69.40.54;Initial Catalog=Tonicdrink;User ID=baby_webg;Password=03webg29";
        else
            ConnStr = @"Data Source=JUN-PC\SQLEXPRESS;Initial Catalog=Quaker;Integrated Security=True";
        using (SqlConnection conn = new SqlConnection(ConnStr))
        {
            SqlCommand comm = new SqlCommand();
            comm.Connection = conn;

            comm.CommandText = @"
               INSERT INTO [dbo].[event_2017ginseng]
                  ([coupletRight]
                  ,[coupletLeft],[fromIP],[remark],[createtime])
            VALUES(@coupletRight,@coupletLeft,@fromIP,@remark,@createtime);";
            comm.CommandType = CommandType.Text;
            DateTime createtime = DateTime.Now;
            //DateTime createtime = DateTime.Now.ToString("yyyy/MM/dd H:mm:ss.fff");
            string userip = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            comm.Parameters.Add("@coupletRight", SqlDbType.NVarChar, 10).Value = CRight;
            comm.Parameters.Add("@coupletLeft", SqlDbType.NVarChar, 10).Value = CLeft;
            comm.Parameters.Add("@fromIP", SqlDbType.NVarChar, 20).Value = userip;
            comm.Parameters.Add("@remark", SqlDbType.NVarChar).Value = guid.Substring(0, 12);
            comm.Parameters.Add("@createtime", SqlDbType.DateTime).Value = createtime;



            conn.Open();
            comm.ExecuteNonQuery();


            conn.Close();

            re = true;
            return re;
        }
    }

    private bool UpdateData()
    {
        bool re = false;
        string ConnStr = "";
        if (HttpContext.Current.Request.Url.Authority == "tonicdrink.sfworldwide.com")
            ConnStr = @"Data Source=203.69.40.54;Initial Catalog=Tonicdrink;User ID=baby_webg;Password=03webg29";
        else
            ConnStr = @"Data Source=JUN-PC\SQLEXPRESS;Initial Catalog=Quaker;Integrated Security=True";
        using (SqlConnection conn = new SqlConnection(ConnStr))
        {
            SqlCommand comm = new SqlCommand();
            comm.Connection = conn;

            comm.CommandText = @"
               UPDATE [dbo].[event_2017ginseng]
   SET [coupletRight] = @coupletRight      
 where [remark] = @remark";
            comm.CommandType = CommandType.Text;
            comm.Parameters.Add("@coupletRight", SqlDbType.NVarChar, 20).Value = "update";
            comm.Parameters.Add("@remark", SqlDbType.NVarChar).Value = "48faf883b47b";
            conn.Open();
            comm.ExecuteNonQuery();


            conn.Close();

            re = true;
            return re;
        }
    }
}