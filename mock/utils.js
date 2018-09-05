//封装文件读写

let fs = require("fs");

//读文件(根据地址读取文件)
let read = (url)=>{
    //promise封装  防止回调地域  方便操作
    return  new Promise((resolve,reject)=>{
        //url:文件路径  "utf8"编码格式  回调函数 读取成功或失败都会调用
        fs.readFile(url,"utf8",(err,data)=>{
            if(err){
                reject(err);
                return;
            }  
            resolve(data);          
        })
    })    

}

//写文件(根据地址写入data)
let write = (url,data)=>{
    //promise封装  防止回调地域  方便操作
    return new Promise((resolve,reject)=>{
        //异步写文件到对应地址，每一次会覆盖之前的数据
        fs.writeFile(url,JSON.stringify(data),(err)=>{
            if(err){
                reject(err);
                return;
            }  
            resolve(); 
        })
    })    

}
module.exports={
    read,
    write
}

// read("./user.js").then((data)=>{
//     console.log(data);
// })