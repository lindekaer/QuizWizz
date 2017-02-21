import React, { Component } from 'react'
import { shuffle } from 'lodash'
import LinearGradient from 'react-native-linear-gradient'
import FullscreenText from './FullscreenText'
import { Button } from 'react-native-elements'
import {
  styles,
  colors
} from './Styles'
import {
  View,
  Text,
  AsyncStorage,
  Dimensions,
  Image
} from 'react-native'

styles.quizBubble = { backgroundColor: '#fff', width: Dimensions.get('window').width - 90, padding: 20, borderRadius: 4, marginLeft: 15, marginRight: 15, marginBottom: 20 }

export default class Quiz extends Component {

  constructor (props) {
    super(props)
    this.state = {
      cards: [],
      numberOfCards: 0,
      index: 0,
      isShowingAnswer: false,
      isComplete: false
    }
  }

  static get route () {
    return {
      navigationBar: {
        title: 'Quiz'
      }
    }
  }

  async componentWillMount () {
    const keys = await AsyncStorage.getAllKeys()
    let cards = await AsyncStorage.multiGet(keys)
    cards = shuffle(cards.map(q => JSON.parse(q[1])))
    this.setState({
      cards,
      numberOfCards: cards.length
    })
  }

  renderQuiz () {
    const question = this.state.cards[this.state.index].question
    const answer = this.state.cards[this.state.index].answer
    const questionNode = (
      <View style={styles.quizBubble}>
        <Text style={styles.quizText}>{question}</Text>
        <Image
          style={{ width: 45, height: 20, position: 'absolute', left: 10, bottom: -18 }}
          source={require('../img/tip-left.png')} />
      </View>
    )
    const answerNode = (
      <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
        <View style={styles.quizBubble}>
          <Text style={[styles.quizText, { fontWeight: 'bold' }]}>{answer}</Text>
          <Image
            style={{ width: 45, height: 20, position: 'absolute', right: 10, bottom: -18 }}
            source={require('../img/tip-right.png')} />
        </View>
      </View>
    )
    return (
      <View style={[styles.container, { alignItems: 'flex-start', justifyContent: 'space-between', paddingTop: 20 }]}>
        <Text style={{ alignSelf: 'stretch', textAlign: 'center', backgroundColor: 'transparent', color: 'white', paddingBottom: 20 }}>
          {this.state.index} of {this.state.numberOfCards}
        </Text>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          {questionNode}
          {this.state.isShowingAnswer ? answerNode : null}
        </View>
        {this.renderButton()}
      </View>
    )
  }

  done () {
    this.props.navigator.pop()
  }

  renderButton () {
    const text = this.state.isComplete
      ? 'Done'
      : this.state.isShowingAnswer
        ? 'Next question'
        : 'Show answer'
    const action = this.state.isComplete ? this.done.bind(this) : this.handleButtonPress.bind(this)
    const buttonStyle = this.state.isShowingAnswer ? [styles.button, { backgroundColor: colors.green }] : styles.button
    const textStyle = this.state.isShowingAnswer ? [styles.buttonText, { color: '#fff' }] : styles.buttonText

    return (
      <View>
        <Button
          buttonStyle={buttonStyle}
          onPress={action}
          textStyle={textStyle}
          title={text} />
      </View>
    )
  }

  handleButtonPress () {
     // Check if we are at the end of the cards array
    if (this.state.index === this.state.cards.length - 1 && this.state.isShowingAnswer) {
      this.setState({
        isComplete: true
      })
    } else {
      this.setState({
        isShowingAnswer: !this.state.isShowingAnswer,
        index: this.state.isShowingAnswer ? this.state.index += 1 : this.state.index
      })
    }
  }

  render () {
    return (
      <LinearGradient colors={colors.gradient} style={styles.background}>
        {this.state.numberOfCards === 0
          ? <FullscreenText text={'No cards!'} />
          : this.state.isComplete
            ? <FullscreenText text={`Great, ${this.state.cards.length} question${this.state.cards.length > 1 ? 's' : ''} completed!`} sibling={this.renderButton()} />
            : this.renderQuiz()
        }
      </LinearGradient>
    )
  }
}
