/**
 * Created by guangqiang on 2017/11/9.
 */
import React, {Component} from 'react'
import {commonStyle} from '../commonStyle'
import {View, TouchableOpacity, Text, StyleSheet, Modal, NativeModules, Dimensions, Image} from 'react-native'

const ShareModule = NativeModules.ShareModule
const LoginModule = NativeModules.LoginModule

const deviceWidth = Dimensions.get('window').width

const SharePlatform = {
  QQ: 0,
  SINA: 1,
  WECHAT: 2,
  WECHATMOMENT: 3,
  QQZONE: 4,
  FACEBOOK: 5
}

class ShareModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isHidden: false
    }
  }

  share(platform) {
    ShareModule.share('OneM','OneM',
      'http://www.jianshu.com/u/023338566ca5', 'http://ovyjkveav.bkt.clouddn.com/17-11-9/48949929.jpg', SharePlatform[platform],
      (response) => {
        this.props.onVisibleChange && this.props.onVisibleChange(false)
        this.setState({isHidden: true})
      })
  }

  login() {
    LoginModule.login(SharePlatform[platform], (response) => {
      /**
       * response
       * 授权数据
       * uid
       * openid
       * accessToken
       * expiration
       * 用户数据
       * name
       * iconurl
       * unionGender
       */
      this.props.onVisibleChange && this.props.onVisibleChange(false)
      this.setState({isHidden: true})
    })
  }

  renderItem(img, title, platform) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.props.funcType === 'share' ? this.share(platform) : this.login(platform)}>
        <Image style={{width: 40, height: 40}} source={img} resizeMode={'center'}/>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      !this.state.isHidden || this.props.visible ?
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => this.props.onVisibleChange(false)}>
          <TouchableOpacity
            style={styles.modalStyle}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.cancle}
              onPress={() => this.props.onVisibleChange && this.props.onVisibleChange(false)}>
              <Text>取消</Text>
            </TouchableOpacity>
            <View style={styles.content}>
              {this.renderItem(require('../assets/imgs/微信.png'), '微信', 'WECHAT')}
              {this.renderItem(require('../assets/imgs/朋友圈.png'), '朋友圈', 'WECHATMOMENT')}
              {this.renderItem(require('../assets/imgs/微信.png'), 'QQ', 'QQ')}
              {this.renderItem(require('../assets/imgs/刷新.png'), '微博', 'SINA')}
            </View>
          </TouchableOpacity>
        </Modal> : null
    )
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    flexDirection: 'column-reverse',
    alignItems: commonStyle.center,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  content: {
    flexDirection: commonStyle.row,
    backgroundColor: commonStyle.white,
    justifyContent: commonStyle.around,
    alignItems: commonStyle.center,
    width: deviceWidth,
    paddingHorizontal: 20
  },
  item: {
    justifyContent: commonStyle.center,
    alignItems: commonStyle.center,
    marginVertical: 10
  },
  cancle: {
    height: 44,
    justifyContent: commonStyle.center,
    alignItems: commonStyle.center,
    backgroundColor: commonStyle.white,
    width: deviceWidth,
    borderTopColor: commonStyle.lineColor,
    borderTopWidth: 1
  },
  text: {
    marginTop: 5,
    fontSize: 13,
    color: commonStyle.textBlockColor
  }
})

export {ShareModal}