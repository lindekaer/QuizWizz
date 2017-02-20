import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Router from './Router'
import FullscreenText from './FullscreenText'
import {
  List,
  ListItem
} from 'react-native-elements'
import {
  styles,
  colors
} from './Styles'
import {
  View,
  ScrollView,
  AsyncStorage
} from 'react-native'


export default class Browse extends Component {

  constructor (props) {
    super(props)
    this.state = {
      cards: []
    }
  }

  componentWillMount () {
    // TODO: Simple hack to refresh list view on "back navigation"
    this.props.route.getEventEmitter().addListener('refresh', () => this.fetchCards())
  }

  async fetchCards () {
    const keys = await AsyncStorage.getAllKeys()
    let cards = await AsyncStorage.multiGet(keys)
    cards = cards.map(c => JSON.parse(c[1]))
    this.setState({
      cards: cards.sort((a, b) => b.timestamp - a.timestamp) // Descending timestamp
    })
    console.log(this.state.cards)
  }

  static get route () {
    return {
      navigationBar: {
        title: 'Browse'
      }
    }
  }

  shortenText (text) {
    const cutOff = 34
    return text.length > cutOff ? text.slice(0, cutOff) + '...' : text
  }

  onListItemPress (index) {
    this.props.navigator.push(Router.getRoute('browseItem', { card: this.state.cards[index] }))
  }

  renderList () {
    return (
      <ScrollView>
        <View style={[styles.container, { justifyContent: 'flex-start', alignItems: 'stretch' }]}>
          <List containerStyle={{ marginTop: 0 }}>
            {this.state.cards.map((item, index) => (
              <ListItem
                key={index}
                title={this.shortenText(item.question)}
                onPress={this.onListItemPress.bind(this, index)}
              />
            ))}
          </List>
        </View>
      </ScrollView>
    )
  }

  render () {
    return (
      <LinearGradient colors={colors.gradient} style={styles.background}>
        {this.state.cards.length > 0
          ? this.renderList()
          : <FullscreenText text={'No cards!'} />
        }
      </LinearGradient>
    )
  }
}
