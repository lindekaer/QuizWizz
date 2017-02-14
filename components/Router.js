import { createRouter } from '@exponent/ex-navigation'
import Add from './Add'
import Quiz from './Quiz'
import Browse from './Browse'
import BrowseItem from './BrowseItem'
import Index from '../index.ios.js'

const Router = createRouter(() => ({
  index: () => Index,
  add: () => Add,
  quiz: () => Quiz,
  browse: () => Browse,
  browseItem: () => BrowseItem
}))

export default Router
