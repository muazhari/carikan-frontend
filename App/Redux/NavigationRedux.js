import { NavigationActions, StackActions } from 'react-navigation'
import AppNavigation from '../Navigation/AppNavigation'

const { navigate } = NavigationActions
const { reset } = StackActions
const { getStateForAction } = AppNavigation.router

const INITIAL_STATE = getStateForAction(NavigationActions.init())

const NOT_LOGGED_IN_STATE = getStateForAction(
  reset({
    index: 0,
    actions: [navigate({ routeName: 'NotLoggedInStack' })],
  }),
  INITIAL_STATE
)
const LOGGED_IN_STATE = getStateForAction(
  reset({
    index: 0,
    actions: [navigate({ routeName: 'LoggedInStack' })],
  }),
  INITIAL_STATE
)
/**
 * Creates an navigation action for dispatching to Redux.
 *
 * @param {string} routeName The name of the route to go to.
 */
// const navigateTo = routeName => () => navigate({ routeName })

export const reducer = (state = INITIAL_STATE, action) => {
  console.tron.log(`[Navigation Redux] Action Type listened : ${action.type}`)
  // console.tron.log(`[Navigation Redux] State listened : ${JSON.stringify({ ...state })}`)
  // console.tron.log(`[Navigation Redux] Action listened : ${JSON.stringify({ ...action })}`)
  let newState
  switch (action.type) {
    case 'AUTH_ANONYMOUS':
      return NOT_LOGGED_IN_STATE
    case 'AUTH_SUCCESS':
      return LOGGED_IN_STATE
    case 'LOGOUT_SUCCESS':
      return NOT_LOGGED_IN_STATE

    default:
      newState = getStateForAction(action, state)
  }

  return newState || state
}
