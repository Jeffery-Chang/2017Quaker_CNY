<%@ WebHandler Language="C#" Class="SendData" %>

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

public class SendData : IHttpHandler
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

        string CRight = context.Request.Form["CRight"].ToString();
        string CLeft = context.Request.Form["CLeft"].ToString();
        string storgeBase64 = context.Request.Form["storgeBase64"].ToString();
        string storgeCP = context.Request.Form["storgeCP"].ToString();
            string storgeCPm = context.Request.Form["storgeCPm"].ToString();
            string isFF = context.Request.Form["isFF"].ToString();
        string guid = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 12) + ".png";

         if (isFF == "false"){
            SaveByteArrayAsImage(guid, storgeBase64);
            SaveCP(guid, storgeCP);
            SaveCPm(guid, storgeCPm);
         }


        submit_Json submit_Json = new submit_Json();
        if (InsertData(CRight, CLeft, guid))
        {
            submit_Json.err = null;
            submit_Json.resguid = guid.Substring(0, 12);
        }
        else
            submit_Json.err = "err";
        context.Response.Write(json.Serialize(submit_Json));
        return;
    }

    // 儲存照片
    private void SaveByteArrayAsImage(string guid, string base64String)
    {
        string path = HttpContext.Current.Server.MapPath("../img/user_result/" + guid);
        byte[] bytes = Convert.FromBase64String(base64String);

        System.Drawing.Image image;
        using (MemoryStream ms = new MemoryStream(bytes))
        {
            image = System.Drawing.Image.FromStream(ms);
            image.Save(path, System.Drawing.Imaging.ImageFormat.Png);
        }


    }
    private void SaveCP(string guid, string base64String)
    {
        string path = HttpContext.Current.Server.MapPath("../img/user_resultCP/" + guid);
        byte[] bytes = Convert.FromBase64String(base64String);

        System.Drawing.Image image;
        using (MemoryStream ms = new MemoryStream(bytes))
        {
            image = System.Drawing.Image.FromStream(ms);
            image.Save(path, System.Drawing.Imaging.ImageFormat.Png);
        }


    }
    private void SaveCPm(string guid, string base64String)
    {
        string path = HttpContext.Current.Server.MapPath("../img/user_resultCPm/" + guid);
        byte[] bytes = Convert.FromBase64String(base64String);

        System.Drawing.Image image;
        using (MemoryStream ms = new MemoryStream(bytes))
        {
            image = System.Drawing.Image.FromStream(ms);
            image.Save(path, System.Drawing.Imaging.ImageFormat.Png);
        }


    }
    //儲存資料
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
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}