import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import Router from './components/Router'
import LinearGradient from 'react-native-linear-gradient'
import Communications from 'react-native-communications'
import {
  NavigationProvider,
  StackNavigation
} from '@exponent/ex-navigation'
import {
  styles,
  colors
} from './components/Styles'
import {
  AppRegistry,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native'

class App extends React.Component {
  render () {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation
          defaultRouteConfig={{
            navigationBar: {
              backgroundColor: '#fff',
              tintColor: '#000'
            }
          }}
          initialRoute={Router.getRoute('index')}
          onTransitionStart={this.handleTransition.bind(this)}
        />
      </NavigationProvider>
    )
  }

  handleTransition (newRoute) {
    newRoute.scene.route.getEventEmitter().emit('refresh')
  }
}

export default class Index extends Component {

  static get route () {
    return {
      navigationBar: {
        title: 'Menu'
      }
    }
  }

  navigateTo (screen) {
    this.props.navigator.push(Router.getRoute(screen))
  }

  async sendEmail () {
    const keys = await AsyncStorage.getAllKeys()
    if (keys.length === 0) {
      this.props.navigator.showLocalAlert('You have no cards to send', {
        text: { color: '#fff' },
        container: { backgroundColor: colors.red }
      })
    } else {
      let cards = await AsyncStorage.multiGet(keys)
      cards = cards.map(q => JSON.parse(q[1]))
      const body = JSON.stringify(cards, null, 2)
      Communications.email(['theodor.lindekaer@gmail.com'], null, null, `${new Date()} - QuizWizz backup`, body)
    }
  }

  render () {
    return (
      <LinearGradient colors={colors.gradient} style={styles.background}>
        <View style={styles.container}>
          <Image
            style={{ width: 250, height: 250 }}
            source={require('./img/logo.png')} />
          <Button
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={this.navigateTo.bind(this, 'quiz')}
            title='Start quiz' />
          <Button
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={this.navigateTo.bind(this, 'add')}
            title='Add new card' />
          <Button
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={this.navigateTo.bind(this, 'browse')}
            title='Browse cards' />
          <Button
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={this.sendEmail.bind(this)}
            title='Send cards by email' />
        </View>
      </LinearGradient>
    )
  }
}

AppRegistry.registerComponent('QuizWizz', () => App)
