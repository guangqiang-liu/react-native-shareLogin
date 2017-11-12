//
//  ShareModule.m
//  RNShareDemo
//
//  Created by 刘光强 on 2017/11/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ShareModule.h"
#import <UMSocialCore/UMSocialCore.h>
#import <UMSocialCore/UMSocialManager.h>

@implementation ShareModule

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(share:(NSString *) title
                  description:(NSString *)description
                  imgUrl:(NSString *)imgUrl
                  webpageUrl:(NSString *)webpageUrl
                  platform:(NSInteger)platform
                  callback:(RCTResponseSenderBlock)callback) {
  //创建分享消息对象
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  
  //创建网页内容对象
  NSString *img = imgUrl;
  
  UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr: description thumImage:img];
  
  //设置网页地址
  shareObject.webpageUrl = webpageUrl;
  
  //分享消息对象设置分享内容对象
  messageObject.shareObject = shareObject;
  
  UMSocialPlatformType type = UMSocialPlatformType_Sina ;
  
  switch (platform) {
    case 0:
      type = UMSocialPlatformType_QQ;
      break;
    case 1:
      type = UMSocialPlatformType_Sina;
      break;
    case 2:
      type = UMSocialPlatformType_WechatSession;
      break;
    case 3:
      type = UMSocialPlatformType_WechatTimeLine;
      break;
    case 4:
      type = UMSocialPlatformType_Qzone;
      break;
    case 5:
      type = UMSocialPlatformType_Facebook;
      break;
    default:
      break;
  }
  
  // 在主线程中操作
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [[UMSocialManager defaultManager] shareToPlatform:type messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
      NSString *message = @"分享成功!";
      if (error) {
        UMSocialLogInfo(@"************Share fail with error %@*********",error);
        if(error.code == 2009) {
          message = @"取消分享!";
        } else {
          message = @"分享失败!";
        }
      } else {
        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
          UMSocialShareResponse *resp = data;
          //分享结果消息
          UMSocialLogInfo(@"response message is %@",resp.message);
          //第三方原始返回的数据
          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
        }else {
          UMSocialLogInfo(@"response data is %@",data);
        }
      }
      callback([[NSArray alloc] initWithObjects:message, nil]);
    }];
  });
}

@end
