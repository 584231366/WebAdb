# WebAdb

## 感谢

THX for https://github.com/yume-chan/ya-webadb
THX for https://github.com/Future-Walkers/WebAdb

## 依赖

Require `rollup`

```shell
npm install -g rollup
```

## 编译

```shell
cd adb
rollup -c
```

## 用法

- 必须在localhost 或 https下运行
- 获取设备

``` JavaScript
var devices = await AdbWebBackend.getDevices()
或者
var device = await AdbWebBackend.requestDevice()
```
- adb执行shell

``` JavaScript
var adb = new Adb(device) // 实例化
adb.connect() // 建立连接
var result = await adb.exec("wm","size") // 执行shell命令
```
- adb安装apk
手机开发者要打开usb安装权限
apk文件转arrayBuffer格式
``` JavaScript
var adb = new Adb(device) // 实例化
adb.connect() // 建立连接
var result = await adb.install(apk,(process)=>{  // 执行安装命令
	console.log("进度",process)
})
```
