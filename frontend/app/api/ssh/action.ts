const { Client } = require("ssh2");

export const sshCommand = (command: string, args?: string[]) => {
  const conn = new Client();
  const MacAddresses: string[] = [];

  conn
    .on("ready", () => {
      console.log("Client :: ready");
      conn.exec(command, function (err: unknown, stream: any) {
        if (err) throw err;
        stream
          .on("close", function () {
            console.log("Stream :: close");
            console.log(MacAddresses.toString());
            conn.end();
          })
          .on("data", function (data: string) {
            console.log("asfasfsaf", data);
            MacAddresses.push(data);
            console.log("STDOUT: " + data);
          })
          .stderr.on("data", function (data: string) {
            console.log("STDERR: " + data);
          });
        stream.end("ls -l\nexit\n");
      });
    })
    .connect({
      host: process.env.SSH_HOST,
      port: process.env.SSH_PORT,
      username: process.env.SSH_USERNAME,
      password: process.env.SSH_PASSWORD,
      debug: console.log,
    });
};
