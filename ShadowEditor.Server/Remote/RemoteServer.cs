﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.IO;
using WebSocketSharp.Server;
using ShadowEditor.Server.Helpers;
using FubarDev.FtpServer;
using FubarDev.FtpServer.AccountManagement;
using FubarDev.FtpServer.FileSystem.DotNet;

namespace ShadowEditor.Server.Remote
{
    /// <summary>
    /// 远程编辑服务器
    /// </summary>
    public class RemoteServer
    {
        // ftp
        private string ftpPort = ConfigurationManager.AppSettings["FTPServerPort"];
        private FtpServer ftpServer = null;

        // websocket
        private string webSocketPort = ConfigurationManager.AppSettings["WebSocketServerPort"];
        private WebSocketServer webSocketServer = null;

        public void Start()
        {
            var log = LogHelper.GetLogger(this.GetType());

            // 启动FTP服务器
            try
            {
                var membershipProvider = new AnonymousMembershipProvider();
                var fsProvider = new DotNetFileSystemProvider(Path.Combine(Path.GetTempPath(), "TestFtpServer"), false);
                ftpServer = new FtpServer(fsProvider, membershipProvider, "127.0.0.1");
                ftpServer.Start();
            }
            catch (Exception ex)
            {
                log.Error("Create FtpServer failed.", ex);
            }

            // 启动Websocket服务器
            try
            {
                // see: https://github.com/jjrdk/websocket-sharp
                webSocketServer = new WebSocketServer(null, int.Parse(webSocketPort));
                webSocketServer.AddWebSocketService<SocketServer>("/Socket");
                webSocketServer.Start();
            }
            catch (Exception ex)
            {
                log.Error("Create websocket server failed.", ex);
            }
        }

        public void Stop()
        {
            if (ftpServer != null)
            {
                ftpServer.Stop();
            }

            try
            {
                webSocketServer.Stop();
            }
            catch (Exception ex)
            {
                var log = LogHelper.GetLogger(this.GetType());
                log.Error("Stop websocket server failed.", ex);
            }
        }
    }
}
