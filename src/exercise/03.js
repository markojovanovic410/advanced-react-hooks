// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// 🐨 create your CountContext here with React.createContext
const CountContext = React.createContext()
// 🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider
function CountProvider(props) {
  const [state, setState] = React.useState({count: 0})
  const value = [state, setState]
  return <CountContext.Provider value={value} {...props} />
}
function useCount() {
  const context = React.useContext(CountContext)
  if (!context) throw new Error('useCount should be used within CountProvider')

  const [state] = context
  console.log("useCount context's count state", state.count)
  return context
}

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  //const [count] = React.useContext(CountContext)
  const [state] = useCount()
  return <div>{`The current count is ${state.count}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  //const [, setCount] = React.useContext(CountContext)
  const [, setState] = useCount()
  const increment = () =>
    setState(prevState => ({...prevState, count: prevState.count + 1}))
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      {/*
        🐨 wrap these two components in the CountProvider so they can access
        the CountContext value
      */}
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
