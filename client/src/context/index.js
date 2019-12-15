import React from 'react'

import initialState from './state'
import reducers from './reducers'

const Context = React.createContext()

export { initialState, reducers, Context }
