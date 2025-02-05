import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const[password, setPassword] = useState("")

  //useRe hook
  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_-+={}[]~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])
  
  const copyPassToClipboard = useCallback(() => {
    passRef.current?.select()
    // passRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  
  return (
    <>
      <div className="text-1xl w-full max-w-md mx-auto shadow-md rounded-lg pt-1 px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className='text-white text-center pb-4 my-3'> Password Generator</h1>
        <div className='flex overflow-hidden pb-8'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 placeholder-gray-500 bg-white rounded-3xl'
          placeholder='Password'
          readOnly
          ref={passRef}
          />
          <button 
          onClick={copyPassToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-3xl'
          >copy</button>
        </div>
        <div className='flex items-center text-sm gap-x-2 pb-5'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer w-full h-2 bg-gray-200 rounded-lg appearance-none'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label className='w-full'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={ () => {
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={charAllowed}
            id='charInput'
            onChange={ () => {
              setCharAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
