import React, { Component } from 'react'
import { styles } from './Styles'
import {
  Text,
  View
} from 'react-native'

export default class FullscreenText extends Component {

  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.bigText}>
          {this.props.text}
        </Text>
        {this.props.sibling}
      </View>
    )
  }
}
