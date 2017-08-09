<%@ WebHandler Language="C#" Class="UpdateData" %>


using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

using System.Web.Script.Serialization;
using System.Data.Common;
using System.Data;
using System.Web.Configuration;
using System.Data.SqlClient;

public class UpdateData : IHttpHandler
{

    private class submit_Json
    {
        public string err { get; set; }  //送出後是否有錯誤訊息 正常null
        public string resguid { get; set; }

    }
    private JavaScriptSerializer json = new JavaScriptSerializer();

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        string name = context.Request.Form["name"].ToString();
        string number = context.Request.Form["number"].ToString();
        string email = context.Request.Form["email"].ToString();
        string upguid = context.Request.Form["upguid"].ToString();
        //string guid = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 12) + ".jpeg";
        //string path = HttpContext.Current.Server.MapPath("../img/user_result/" + guid);



        submit_Json submit_Json = new submit_Json();
        if (Update(name, number, email, upguid))
        {
            submit_Json.err = null;
        }
        else
            submit_Json.err = "err";
        context.Response.Write(json.Serialize(submit_Json));
        return;
    }

    //儲存資料
    private bool Update(string name, string number, string email, string upguid)
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
   SET [name] = @name
      ,[email] = @email
      ,[number] = @number
  
 where [remark] = @remark";
            comm.CommandType = CommandType.Text;
            
                comm.Parameters.Add("@name", SqlDbType.NVarChar, 20).Value = name;
                comm.Parameters.Add("@email", SqlDbType.NVarChar, 20).Value = email;
                comm.Parameters.Add("@number", SqlDbType.NVarChar, 20).Value = number;

            comm.Parameters.Add("@remark", SqlDbType.NVarChar).Value = upguid;
            conn.Open();
            comm.ExecuteNonQuery();


            conn.Close();

            re = true;
            return re;
        }
    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}