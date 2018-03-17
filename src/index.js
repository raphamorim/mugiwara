import memoize from 'fast-memoize'
import createClassFN from './createClass'

export const createClass = memoize(createClassFN)
