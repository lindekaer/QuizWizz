import { StyleSheet, Dimensions } from 'react-native'

export const colors = {
  blueDark: '#3a7bd5',
  blueLight: '#00d2ff',
  green: '#4caf50',
  red: '#f44336',
  gradient: ['#00d2ff', '#3a7bd5']
}

export const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40
  },
  bigText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  button: {
    width: Dimensions.get('window').width - 30,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    padding: 20,
    borderRadius: 4,
    backgroundColor: 'white'
  },
  buttonText: {
    color: 'black'
  },
  form: {
    width: Dimensions.get('window').width - 30,
    marginLeft: 15,
    marginRight: 15,
    borderBottomColor: '#fff'
  },
  formInput: {
    color: 'white'
  },
  label: {
    marginLeft: 15,
    marginBottom: 5,
    color: '#fff',
    backgroundColor: 'transparent'
  },
  quizText: {
    lineHeight: 24,
    fontSize: 16
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
