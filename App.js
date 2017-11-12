/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import {ShareModal} from './shareModal'

export default class ReactNativeShare extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      funcType: 'share'
    }
  }

  openShare() {
    this.setState({modalVisible: true, funcType: 'share'})
  }

  openLogin() {
    this.setState({modalVisible: true, funcType: 'login'})
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.share} onPress={() => this.openShare()}>
          <Text>封装分享功能组件</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.share} onPress={() => this.openLogin()}>
          <Text>封装登录功能组件</Text>
        </TouchableOpacity>
        <ShareModal
          visible={this.state.modalVisible}
          funcType={this.state.funcType}
          onVisibleChange={(modalVisible) => this.setState({
            modalVisible: modalVisible
          })}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  share: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  }
})