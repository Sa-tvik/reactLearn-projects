import './App.css'
import Card from './Card'

function App() {
  let myObj = {
    username: "satvik",
    age:"21"
  }
  let newArr = [1,2,3]
  return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>Tailwind test</h1>      
      <Card username="Satvik" title="react learning" />
      <Card username="SA-tvik" title="props" />
      <Card username="MrNoobOP"/>
    </>
  )
}

export default App
