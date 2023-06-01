import { Canvas } from '@react-three/fiber'
import { Controls } from 'react-three-gui'
import Scene from './components/Scene'
import './App.css'

function App() {
  return (
    <div className='w-full h-screen bg-black text-white'>
      {/* <div className='absolute top-0 left-0 h-full w-full flex items-center justify-center'>
        <h1 className='text-[15rem] font-semibold'>Bubble</h1>
      </div> */}
      <div className="absolute top-0 left-0 h-full w-full">
        <Controls.Provider>
          <Controls.Canvas>
            <Scene />
          </Controls.Canvas>
          <Controls />
        </Controls.Provider>
      </div>
    </div>
  )
}

export default App
