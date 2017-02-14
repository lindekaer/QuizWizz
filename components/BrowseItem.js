import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  styles,
  colors
} from './Styles'
import {
  FormInput,
  FormLabel,
  Button
} from 'react-native-elements'
import {
  View,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from 'react-native'

styles.containerSplit = { flex: 1, flexDirection: 'row', alignSelf: 'stretch', alignItems: 'flex-end', justifyContent: 'center' }
styles.buttonSplitLeft = { width: Dimensions.get('window').width / 2 - 30, marginRight: 7.5, backgroundColor: colors.red }
styles.buttonSplitRight = { width: Dimensions.get('window').width / 2 - 30, marginLeft: 7.5, backgroundColor: colors.green }

export default class BrowseItem extends Component {

  constructor (props) {
    super(props)
    this.state = {
      card: null
    }
  }

  async componentWillMount () {
    const card = this.props.route.params.card
    this.setState({
      card
    })
  }

  static get route () {
    return {
      navigationBar: {
        title: 'Card details'
      }
    }
  }

  change (type, value) {
    const updatedCard = this.state.card
    updatedCard[type] = value
    this.setState({
      card: updatedCard
    })
  }

  async update () {
    try {
      await AsyncStorage.setItem(this.state.card._id, JSON.stringify(this.state.card))
      this.props.navigator.pop()
      this.props.navigator.showLocalAlert('Card updated', {
        text: { color: '#fff' },
        container: { backgroundColor: colors.green }
      })
    } catch (err) {
      this.props.navigator.showLocalAlert('Unable to update card', {
        text: { color: '#fff' },
        container: { backgroundColor: colors.red }
      })
    }
  }

  async delete () {
    try {
      await AsyncStorage.removeItem(this.state.card._id)
      this.props.navigator.pop()
      this.props.navigator.showLocalAlert('Card removed', {
        text: { color: '#fff' },
        container: { backgroundColor: colors.green }
      })
    } catch (err) {
      this.props.navigator.showLocalAlert('Unable to remove card', {
        text: { color: '#fff' },
        container: { backgroundColor: colors.red }
      })
    }
  }

  renderItem () {
    return (
      <LinearGradient colors={colors.gradient} style={styles.background}>
        <View style={[styles.container, { justifyContent: 'space-between' }]}>
          <View>
            <FormLabel labelStyle={styles.label}>Question</FormLabel>
            <FormInput
              placeholder='What is the question?'
              containerStyle={styles.form}
              inputStyle={styles.formInput}
              value={this.state.card.question}
              onChangeText={this.change.bind(this, 'question')} />

            <FormLabel labelStyle={styles.label}>Answer</FormLabel>
            <FormInput
              placeholder='... and the answer?'
              containerStyle={styles.form}
              inputStyle={styles.formInput}
              value={this.state.card.answer}
              onChangeText={this.change.bind(this, 'answer')} />
          </View>

          <View style={styles.containerSplit}>
            <Button
              buttonStyle={[styles.button, styles.buttonSplitLeft]}
              textStyle={[styles.buttonText, { color: '#fff' }]}
              title='Delete'
              onPress={this.delete.bind(this)} />
            <Button
              buttonStyle={[styles.button, styles.buttonSplitRight]}
              textStyle={[styles.buttonText, { color: '#fff' }]}
              title='Update'
              onPress={this.update.bind(this)} />
          </View>
        </View>
      </LinearGradient>
    )
  }

  renderLoading () {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator
          style={{ alignItems: 'center', justifyContent: 'center' }}
          animating={true}
          size='large'
        />
      </View>
    )
  }

  render () {
    return this.state.card
      ? this.renderItem()
      : this.renderLoading()
  }
}
