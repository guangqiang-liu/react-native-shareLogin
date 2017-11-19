# react-native-shareLogin

# 前言
> 移动端开发中，分享登录功能基本上是每一个app上必备的功能。对于原生app来说，我们接入分享登录功能也不算复杂，直接接入三方的友盟sdk，只需要几步就能搞定。但是对于RN开发就稍微麻烦些，因为很多三方的平台暂不提供ReactNative的sdk，这时我们就需要在原生的基础之上再进行封装，然后提供接口给RN调用。下面介绍的就是基于此方案在RN工程汇中集成分享登录。

# 效果图
![img](http://upload-images.jianshu.io/upload_images/6342050-62c239f951cef0fb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 简书:[http://www.jianshu.com/p/9bc54b188425](http://www.jianshu.com/p/9bc54b188425)

# 注意
**因为三方登录所添加的SDK和分享功能相同，我们只需要配置一种功能的SDK即可，本Demo示例是以配置分享功能为例。要想支持三方登录功能，我们不需要在单独的配置SDK环境，只需要添加LoginModule即可**

# 本套教程使用的SDK版本号：v6.4.5

# Demo中使用到的v6.4.5SDK为精简版本
> * 什么是精简版
> 	* 大部分三方分享平台都需要借助官方SDK来进行实现，而官方SDK由于包含很多复杂功能，因此体积通常很庞大，比如微信SDK和新浪SDK，体积分别为14M和25M，从6.4.1版本开始，UShare对微信、新浪、QQ三方的官方SDK做了精简操作，只保留和分享、登录核心功能相关的代码，最大限度精简体积。
> * 精简版和完整版区别
> 	* 正常的分享、登录功能，精简版和完整版是没有任何区别的，分享及登录界面也没有任何区别，因此，我们推荐开发者们可以直接使用精简版来进行集成，可以大幅度缩减体积
> * 老版本如何升级使用精简版
> 	* 如果是从6.x版本升级上来的开发者，可以直接替换对应的库文件即可，在API上我们做了最大兼容，基本不影响旧版开发者升级使用，从5.x或者4.x版本升级上来的开发者，注意要将旧版本库文件、资源文件删掉后再进行集成，避免引起冲突等问题


# 分享登录平台
* 微信
* 朋友圈
* QQ
* QQ空间
* 新浪微博

# iOS端

# 1. SDK集成与配置

## 1.1 手动集成
**考虑到很多同学是非iOS开发者，这里集成sdk我们就采取最原始的手动集成方式。避免使用pod**

### 1.1.1 接入SDK

* 将Demo工程中，iOS项目目录下的`UMSocial`文件夹导入到自己的项目中。

![sdk](http://upload-images.jianshu.io/upload_images/6342050-6620e39d3e431f78.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 添加项目配置

*在Other Linker Flags加入-ObjC，<font color=red>注意不要写为-Objc</font>*

![objc](http://upload-images.jianshu.io/upload_images/6342050-822d2cd279f35359.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

<font color=red>-ObjC属于链接库必备参数，如果不加此项，会导致库文件无法被正确链接，SDK无法正常运行</font>

* 加入U-Share SDK依赖的系统库

![libs](http://upload-images.jianshu.io/upload_images/6342050-df4cabdbaac145d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

加入以下系统库：

```
libsqlite3.tbd
CoreGraphics.framework
```

### 1.1.2 添加第三方平台依赖库

* 添加方式同上 ：选中项目Target -> General -> Linked Frameworks and Libraries列表中进行添加

```
SystemConfiguration.framework
CoreTelephony.framework
ImageIO.framework
libc++.tbd
libz.tbd
```

## 1.2 第三方平台配置
### 1.2.1 配置SSO白名单
* 在iOS9以上系统需要增加一个可跳转App的白名单，即`LSApplicationQueriesSchemes `，否则将在SDK判断是否跳转时用到的canOpenURL时返回NO，进而只进行webview授权或授权/分享失败
* 在项目中的info.plist中加入应用白名单，右键info.plist选择source code打开(plist具体设置在Build Setting -> Packaging -> Info.plist ) 

**直接拷贝下面代码块到plist文件中即可**

```
<key>LSApplicationQueriesSchemes</key> 
<array> 
  <!-- 微信 URL Scheme 白名单--> 
  <string>wechat</string> 
  <string>weixin</string> 
  
  <!-- 新浪微博 URL Scheme 白名单--> 
  <string>sinaweibohd</string> 
  <string>sinaweibo</string> 
  <string>sinaweibosso</string> 
  <string>weibosdk</string> 
  <string>weibosdk2.5</string> 
  
  <!-- QQ、Qzone、TIM URL Scheme 白名单--> 
  <string>mqqapi</string> 
  <string>mqq</string> 
  <string>mqqOpensdkSSoLogin</string> 
  <string>mqqconnect</string> 
  <string>mqqopensdkdataline</string> 
  <string>mqqopensdkgrouptribeshare</string> 
  <string>mqqopensdkfriend</string> 
  <string>mqqopensdkapi</string> 
  <string>mqqopensdkapiV2</string> 
  <string>mqqopensdkapiV3</string> 
  <string>mqqopensdkapiV4</string> 
  <string>mqzoneopensdk</string> 
  <string>wtloginmqq</string> 
  <string>wtloginmqq2</string> 
  <string>mqqwpa</string> 
  <string>mqzone</string> 
  <string>mqzonev2</string> 
  <string>mqzoneshare</string> 
  <string>wtloginqzone</string> 
  <string>mqzonewx</string> 
  <string>mqzoneopensdkapiV2</string> 
  <string>mqzoneopensdkapi19</string> 
  <string>mqzoneopensdkapi</string> 
  <string>mqqbrowser</string> 
  <string>mttbrowser</string> 
  <string>tim</string> 
  <string>timapi</string> 
  <string>timopensdkfriend</string> 
  <string>timwpa</string> 
  <string>timgamebindinggroup</string> 
  <string>timapiwallet</string> 
  <string>timOpensdkSSoLogin</string> 
  <string>wtlogintim</string> 
  <string>timopensdkgrouptribeshare</string> 
  <string>timopensdkapiV4</string> 
  <string>timgamebindinggroup</string> 
  <string>timopensdkdataline</string> 
  <string>wtlogintimV1</string> 
  <string>timapiV1</string> 
  <!-- Facebook URL Scheme 白名单--> 
  <string>fbapi</string> 
  <string>fb-messenger-api</string> 
  <string>fbauth2</string> 
  <string>fbshareextension</string> 
</array> 
```

### 1.2.2 URL Scheme
* URL Scheme是通过系统找到并跳转对应app的设置，通过向项目中的info.plist文件中加入URL types可使用第三方平台所注册的appkey信息向系统注册你的app，当跳转到第三方应用授权或分享后，可直接跳转回你的app。

* 添加URL Types
![types](http://upload-images.jianshu.io/upload_images/6342050-21f3ab506160fae4.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 注意：URL Schemes的值，直接可以拷贝工程中的值即可

# 2. 初始化设置

## 2.1 初始化U-Share及第三方平台
* 在AppDelegate.m中添加如下代码

```
#import <UMSocialCore/UMSocialCore.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    /* 打开调试日志 */
    [[UMSocialManager defaultManager] openLog:YES];

    /* 设置友盟appkey */
    [[UMSocialManager defaultManager] setUmSocialAppkey:USHARE_DEMO_APPKEY];

    [self configUSharePlatforms];

    [self confitUShareSettings];

    return YES;
}

- (void)confitUShareSettings
{
    /*
     * 打开图片水印
     */
    //[UMSocialGlobal shareInstance].isUsingWaterMark = YES;

    /*
     * 关闭强制验证https，可允许http图片分享，但需要在info.plist设置安全域名
     <key>NSAppTransportSecurity</key>
     <dict>
     <key>NSAllowsArbitraryLoads</key>
     <true/>
     </dict>
     */
    //[UMSocialGlobal shareInstance].isUsingHttpsWhenShareContent = NO;

}

- (void)configUSharePlatforms
{
    /* 
     设置微信的appKey和appSecret
     [微信平台从U-Share 4/5升级说明]http://dev.umeng.com/social/ios/%E8%BF%9B%E9%98%B6%E6%96%87%E6%A1%A3#1_1
     */
    [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:@"wxdc1e388c3822c80b" appSecret:@"3baf1193c85774b3fd9d18447d76cab0" redirectURL:nil];
    /*
     * 移除相应平台的分享，如微信收藏
     */
    //[[UMSocialManager defaultManager] removePlatformProviderWithPlatformTypes:@[@(UMSocialPlatformType_WechatFavorite)]];

    /* 设置分享到QQ互联的appID
     * U-Share SDK为了兼容大部分平台命名，统一用appKey和appSecret进行参数设置，而QQ平台仅需将appID作为U-Share的appKey参数传进即可。
     100424468.no permission of union id
     [QQ/QZone平台集成说明]http://dev.umeng.com/social/ios/%E8%BF%9B%E9%98%B6%E6%96%87%E6%A1%A3#1_3
    */
    [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:@"1105821097"/*设置QQ平台的appID*/  appSecret:nil redirectURL:@"http://mobile.umeng.com/social"];

    /* 
     设置新浪的appKey和appSecret
     [新浪微博集成说明]http://dev.umeng.com/social/ios/%E8%BF%9B%E9%98%B6%E6%96%87%E6%A1%A3#1_2
     */
    [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Sina appKey:@"3921700954"  appSecret:@"04b48b094faeb16683c32669824ebdad" redirectURL:@"https://sns.whalecloud.com/sina2/callback"];
    
```

## 2.2 设置系统回调

```
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation 
{ 
  //6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响 
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url sourceApplication:sourceApplication annotation:annotation]; 
  if (!result) { 
     // 其他如支付等SDK的回调 
  } 
  return result; 
} 
```

# 3. 将Demo工程中ReactNativeModule文件拖到自己的工程

***注意：ReactNativeModule 文件中包含分享module和登录module两个模块***

![module](http://upload-images.jianshu.io/upload_images/6342050-2bf52c57c662840b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


# Android

## 注意：
**Android平台的分享和登录功能相关的函数回调略有不同，后面同学需要注意。**

# 1. SDK集成与配置

## 1.1 手动集成
**考虑到很多同学是非android开发者，这里集成sdk我们就采取最原始的手动集成方式。**

### 1.1.1 接入SDK
* 将Demo工程中Android工程中的app目录下的libs整个文件添加到自己的工程

![libs](http://upload-images.jianshu.io/upload_images/6342050-9dc77c63edee9579.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 将 android/app/src/main中的jniLibs文件夹添加到自己的工程
* 将报名目录下的`apshare ` `moduel ` `wxapi` `WBShareActivity ` 文件添加到自己的工程

**注意：<font color= red>检查文件中的包名是否为自己的包名</font>**

## 1.2 设置权限
* 在工程中的AndroidMainfest.xml文件下添加如下代码，直接拷贝代码

```
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" /> 
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" /> 
<uses-permission android:name="android.permission.READ_PHONE_STATE" /> 
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/> 
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/> 
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /> 
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" /> 
<uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS" /> 
```

### 1.2.1 添加分享平台
* 在工程中的AndroidMainfest.xml文件中，`<activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />` 下面添加如下代码，直接拷贝代码

```
<!-- 新浪 -->
        <activity
            android:name=".WBShareActivity"
            android:configChanges="keyboardHidden|orientation"
            android:screenOrientation="portrait" >
            <intent-filter>
                <action android:name="com.sina.weibo.sdk.action.ACTION_SDK_REQ_ACTIVITY" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
        <activity
            android:name="com.sina.weibo.sdk.component.WeiboSdkBrowser"
            android:configChanges="keyboardHidden|orientation"
            android:windowSoftInputMode="adjustResize"
            android:exported="false" >
        </activity>
        <service android:name="com.sina.weibo.sdk.net.DownloadService"
            android:exported="false" />

        <!-- 微信 -->
        <activity
            android:name=".wxapi.WXEntryActivity"
            android:configChanges="keyboardHidden|orientation|screenSize"
            android:exported="true"
            android:screenOrientation="portrait"
            android:theme="@android:style/Theme.Translucent.NoTitleBar" />

        <!-- 支付宝 -->
        <activity
            android:name=".apshare.ShareEntryActivity"
            android:configChanges="keyboardHidden|orientation|screenSize"
            android:exported="true"
            android:screenOrientation="portrait"
            android:theme="@android:style/Theme.Translucent.NoTitleBar" />

        <!-- QQ -->
        <activity
            android:name="com.tencent.tauth.AuthActivity"
            android:launchMode="singleTask"
            android:noHistory="true" >
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="tencent1106207359" />
            </intent-filter>
        </activity>
        <activity
            android:name="com.tencent.connect.common.AssistActivity"
            android:screenOrientation="portrait"
            android:theme="@android:style/Theme.Translucent.NoTitleBar"
            android:configChanges="orientation|keyboardHidden|screenSize"/>

        <meta-data
            android:name="UMENG_APPKEY"
            android:value="5126ff896c738f2bfa000438" >
        </meta-data>
```

## 1.3 配置签名
* 生成签名文件

**如何生成签名文件请查看：[http://www.jianshu.com/p/b28a5be05029](http://www.jianshu.com/p/b28a5be05029)**

* 在gradle.properties文件下，添加签名信息，直接拷贝代码

```
MYAPP_RELEASE_STORE_FILE=xxx.jks（签名文件路径）
MYAPP_RELEASE_KEY_ALIAS=alias（自己设置的签名alias）
MYAPP_RELEASE_STORE_PASSWORD=111111（自己设置的STORE_PASSWORD） 
MYAPP_RELEASE_KEY_PASSWORD=111111 （填写自己设置的KEY_PASSWORD）
```

* app/build.gradle 文件下的添加签名配置，直接拷贝代码

```
signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
 }
    
buildTypes {   
  release {   
   ...   
  	signingConfig signingConfigs.release <= 添加此行
  	... 
  }   
}  
```

##  1.4 初始化设置
### 1.4.1 初始化分享
* 在MainApplication中初始化分享，直接拷贝代码

```
@Override
protected List<ReactPackage> getPackages() { 
 return Arrays.<ReactPackage>asList( 
   new MainReactPackage(), 
     new SharePackage() <= 添加引用
 ); 
}

@Override
public void onCreate() { 
 super.onCreate(); 
 SoLoader.init(this,false); 
 Config.shareType = "react native"; 
 UMShareAPI.get(this); 
} 
  
// 配置平台 
{ 
 PlatformConfig.setWeixin("wxdc1e388c3822c80b", "3baf1193c85774b3fd9d18447d76cab0"); 
 PlatformConfig.setQQZone("100424468", "c7394704798a158208a74ab60104f0ba"); 
 PlatformConfig.setSinaWeibo("3921700954", "04b48b094faeb16683c32669824ebdad", "www.baidu.com"); 
}
```

### 1.4.2 初始化回调
* 在MainActivity中初始化分享回调，直接拷贝代码

```
@Override
 protected void onCreate(Bundle savedInstanceState) { 
   super.onCreate(savedInstanceState); 
   ShareModule.initActivity(this); 
 }
```

# 注意事项
* 添加 `apshare ` `moduel ` `wxapi` `WBShareActivity ` 这几个文件时，注意导入的包名是否和工程包名一致
* 签名文件最好放在app目录下
* iOS和Android导出模块的模块名和函数名一致

# 总结