import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  View,
  AsyncStorage
} from 'react-native'
import {
  styles,
  colors
} from './Styles'
import {
  Button,
  FormLabel,
  FormInput
} from 'react-native-elements'

export default class Add extends Component {

  constructor (props) {
    super(props)
    this.state = {
      question: '',
      answer: ''
    }
  }

  static get route () {
    return {
      navigationBar: {
        title: 'Add new card'
      }
    }
  }

  change (type, value) {
    this.setState({
      [type]: value
    })
  }

  add () {
    if (!this.state.question.trim() || !this.state.answer.trim()) {
      this.props.navigator.showLocalAlert('Please fill both fields', {
        text: { color: '#fff' },
        container: { backgroundColor: '#f44336' }
      })
    } else {
      this.saveQuestion()
    }
  }

  async saveQuestion () {
    try {
      const now = Date.now()
      const card = {
        _id: `QW_${now}`,
        question: this.state.question,
        answer: this.state.answer,
        timestamp: now
      }
      await AsyncStorage.setItem(card._id, JSON.stringify(card))
      this.resetForm()
      this.props.navigator.pop()
    } catch (err) {
      this.props.navigator.showLocalAlert('Unable to save card to device', {
        text: { color: '#fff' },
        container: { backgroundColor: colors.red }
      })
    }
  }

  resetForm () {
    this.setState({
      question: '',
      answer: ''
    })
    this.props.navigator.showLocalAlert('Question added', {
      text: { color: '#fff' },
      container: { backgroundColor: colors.green }
    })
  }

  render () {
    return (
      <LinearGradient colors={colors.gradient} style={styles.background}>
        <View style={[styles.container, { justifyContent: 'space-between' }]}>
          <View>
            <FormLabel labelStyle={styles.label}>Question</FormLabel>
            <FormInput
              placeholder='What is the question?'
              containerStyle={styles.form}
              inputStyle={styles.formInput}
              value={this.state.question}
              onChangeText={this.change.bind(this, 'question')} />

            <FormLabel labelStyle={styles.label}>Answer</FormLabel>
            <FormInput
              placeholder='... and the answer?'
              containerStyle={styles.form}
              inputStyle={styles.formInput}
              value={this.state.answer}
              onChangeText={this.change.bind(this, 'answer')} />
          </View>

          <View>
            <Button
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              title='Add'
              onPress={this.add.bind(this)} />
          </View>
        </View>
      </LinearGradient>
    )
  }
}
