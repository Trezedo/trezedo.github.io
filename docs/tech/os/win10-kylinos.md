---
icon: ix:operating-system
date: 2026-01-17
modified: 2026-03-23
category:
    - linux
tag:
    - 银河麒麟
    - qemu
---

# Win10 使用 QEMU 运行银河麒麟系统

## 准备工作

- 下载 QEMU：[QEMU Windows 64](https://qemu.weilnetz.de/w64/)
- 下载 UEFI.fd： [UEFI.fd](https://releases.linaro.org/components/kernel/uefi-linaro/16.02/release/qemu64/)
- 准备银河麒麟系统镜像（如 Kylin-Desktop V10）

本机信息：

- CPU：Intel i5-9300H
- GPU：GTX 1650 (4GB)
- RAM：12GB

## 创建虚拟硬盘

```sh
# 进入 qemu 安装目录，根据实际情况修改路径
cd E:\envs\qemu
# 建议至少 50G
qemu-img create -f qcow2 D:\kylinV10\kylin.img 50G
```

提示如下即成功：

```sh
Formatting 'D:\kylinV10\kylin.img', fmt=qcow2 cluster_size=65536 extended_l2=off compression_type=zlib size=53687091200 lazy_refcounts=off refcount_bits=16
```

## 启动安装

```sh
qemu-system-aarch64.exe -m 6G -cpu cortex-a72 -smp 4,cores=4,threads=1,sockets=1 -M virt -bios D:\kylinV10\QEMU_EFI.fd -net nic -net user -device nec-usb-xhci -device usb-kbd -device usb-mouse -device VGA -drive if=none,file=D:\kylinV10\Kylin-Desktop-V10-GFB-Release-JICAI_03-2207-Build14-arm64.iso,id=cdrom,media=cdrom -device virtio-scsi-device -device scsi-cd,drive=cdrom -drive if=none,file=D:\kylinV10\kylin.img,id=hd0 -device virtio-blk-device,drive=hd0
```

> 如果出现 `cannot set up guest memory 'mach-virt.ram': Invalid argument` 错误，尝试减小内存到 `2G`，再逐步增大。

## 安装过程

要选择安装 kylin-Desktop V10，确保写入 `kylin.img`：

![安装界面](https://zedo-img.netlify.app/img/kylin/20260117204135.png)

等待大约 3 分钟，出现安装界面：

![选择语言](https://zedo-img.netlify.app/img/kylin/20260117204716.png)
使用默认设置，有打钩同意或者要格式化的打钩即可

![阅读许可协议](https://zedo-img.netlify.app/img/kylin/20260117204820.png)

![选择安装方式](https://zedo-img.netlify.app/img/kylin/20260117205100.png)

> 踩坑：如果创建 `img` 或 `qcow2` 文件时大小只设定了 20G，会显示如下界面：
> ![安装方式内存不够](https://zedo-img.netlify.app/img/kylin/20260116234014.png)

下面直接贴图了：

![确认全盘安装](https://zedo-img.netlify.app/img/kylin/20260117205127.png)

![创建账户](https://zedo-img.netlify.app/img/kylin/20260117205157.png)

![创建用户](https://zedo-img.netlify.app/img/kylin/20260117205245.png)

![安装进度](https://zedo-img.netlify.app/img/kylin/20260117205316.png)

会预装【奇安信浏览器】和【WPS Office】

![解压奇安信浏览器](https://zedo-img.netlify.app/img/kylin/20260117124959.png)

![解压 WPS](https://zedo-img.netlify.app/img/kylin/20260117125150.png)

耗时取决于电脑性能，本机安装耗时总共 43 分钟。

安装过程中，`kylin.img` 逐渐从 `193 KB` 增大至 `13.2 GB`

安装完成后有如下界面就是成功了，不用点击重启，直接关闭 qemu 窗口即可：

![安装完成](https://zedo-img.netlify.app/img/kylin/20260117130538.png)

## 进入桌面

安装完成后，下次启动时不需要挂载安装介质：

```sh
qemu-system-aarch64.exe -m 6G -cpu cortex-a72 -smp 4,cores=4,threads=1,sockets=1 -M virt -bios D:\kylinV10\QEMU_EFI.fd -net nic -net user -device nec-usb-xhci -device usb-kbd -device usb-tablet -device VGA -drive if=none,file=D:\kylinV10\kylin.img,id=hd0 -device virtio-blk-device,drive=hd0
```

选择第一个，可以看到内核版本：

![选择界面](https://zedo-img.netlify.app/img/kylin/20260117130657.png)

等待大概 4 分钟进入桌面，观察任务栏可以发现自带了浏览器和 WPS：

![桌面](https://zedo-img.netlify.app/img/kylin/20260117214405.png)

查看系统参数：

```sh
lscpu
dpkg --print-architecture
```

![lscpu](https://zedo-img.netlify.app/img/kylin/20260117224402.png)

测试网络是否联通：

```sh
ping 8.8.8.8
```

![测试ping](https://zedo-img.netlify.app/img/kylin/20260117214754.png)

响应比较快，说明网络正常。

在任务栏打开软件商店：

![软件商店报错](https://zedo-img.netlify.app/img/kylin/20260117214645.png)

提示服务异常，但多重启几次是可以正常打开的：

![软件商店更新提示](https://zedo-img.netlify.app/img/kylin/20260117215001.png)

> 这里不建议更新软件商店 (`kylin-software-center`)，先前试过一次，更新完打开即闪退。

查看软件源配置文件：

```sh
cat /etc/apt/sources.list
```

如果指向 `kylinos.cn` 官网，就说明正常：

```text
deb http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1 main restricted universe multiverse
deb http://archive2.kylinos.cn/deb/kylin/production/PART-V10-SP1/custom/partner/V10-SP1 default all
```

![查看 sources](https://zedo-img.netlify.app/img/kylin/20260117132147.png)

暂时就这么多，后面有时间再测试下编程开发以及 WPS JS 宏之类的东西。

## 踩坑&相关问题

### Try without installing 的结果

如果最初选择的是 `Try Kylin-Desktop Vl0 without installing`，进入的系统后桌面有一个“安装 Kylin”的隐藏文件：

![桌面](https://zedo-img.netlify.app/img/kylin/20260117125050.png)

查看软件源配置文件 `sources.list`，均为针对内部构建环境的地址：

```text
deb http://archive-proxy.internal:8001/ap/build/51335/archive.launchpad.dev_kylin v101 main restricted universe multiverse
deb http://archive-proxy.internal:8001/ap/build/51335/archive.launchpad.dev_kylin v101-security main restricted universe multiverse
```

### 剪切板共享（未成功）

为了在 Kylin 系统与宿主机之间实现共享，网上搜了下解决方案，但是未能成功：

```sh
sudo apt install qemu-guest-agent
systemctl enable qemu-guest-agent

sudo apt install spice-vdagent
systemctl enable spice-vdagent
```

还是使用在线传输吧：

- <https://easychuan.cn/>：轻松传，可传文本、文件等
- <https://yun.kuaiya.cn/>：快牙文件传输

## 参考链接

- [Windows上使用QEMU创建银河麒麟ARM64虚拟机完全手册](https://www.cnblogs.com/mylibs/p/kylin-arm64-with-qemu-on-windows.html) （记录完整）
- [Windows（x86）上部署ARM虚拟机](https://blog.csdn.net/XiaoYuHaoAiMin/article/details/140701250)
- [VMware安装麒麟系统报错](https://blog.csdn.net/GRAGXU/article/details/152007602)
- [Windows电脑上使用QEMU虚拟机启动龙芯Loongnix系统](https://blog.csdn.net/clancy_pinkie/article/details/135250263)
- [Windows x86 环境 虚拟机 安装银河麒麟V10 arm架构系统](https://huaweicloud.csdn.net/6707c62ee2ce0119e0a22920.html)
