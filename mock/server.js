//引入读写 express bodyParser 等需要的文件
let { write,read } = require("./utils");
let express = require("express");
let bodyParser = require("body-parser");

//利用express来解析上传文件
let server = express();

//后台监听端口
server.listen(8888);
server.use(bodyParser.json());

//这里的配置解决跨域问题
server.use("/", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
})

server.use("/", (req, res, next) => {
  //先全部读取
  read("./user.js").then((data) => {
    req.myUser = JSON.parse(data);
    //成功后继续执行
    next();
  })
})

// 登录
server.get("/login", (req, res) => {
  console.log(req.query);
  let users = req.myUser;
  let { username,password } = req.query;
  if (username) {
    //在所有数据中查找用户 检测是否存在
    let user = users.find(item => {
      return item.username == username;
    })
    
    //用户名和密码验证
    if (user && user.password == password) {
      res.json({
        code: "success",
        data: {
          user
        }
      })
    } else {
      res.json({
        code: "fail",
        msg: "用户不存在或密码不正确"
      });
    }
  } else {
    res.json({
      code: "fail",
      msg: "参数不对"
    });
  }

})

//注册
server.post("/reg", function (req, res) {
  console.log(req.body);
  let users = req.myUser;
  let {
    username,
    password
  } = req.body;
  if (username && password) {
    let user = users.find(item => {
      return item.username == username;
    })
    if (user) {
      res.json({
        code: "fail",
        msg: "用户已存在"
      })
    } else {
      let user = {
        username,
        password
      };
      users.push(user);
      write("./user.js", users).then(() => {
        res.json({
          code: "success",
          msg: "注册成功"
        })
      })
    }
  } else {
    res.json({
      code: "fail",
      mes: "参数不对"
    });
  }

})
