import deepFreeze from 'deep-freeze'
import reducer, {increment_good, increment_ok, increment_bad, reset_count} from './reducer'


describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  test('should return a proper initial state when called with undefined state', () => {

    const action = {
      type: 'DO_NOTHING'
    }

    const newState = reducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
  

    deepFreeze(initialState)
    const newState = reducer(initialState, increment_good())
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
})