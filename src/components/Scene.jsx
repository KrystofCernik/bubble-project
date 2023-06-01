import { Suspense } from 'react'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import Bubble from './Bubble'
import Typography from './Typography'

export default function Scene() {
  return (
	<>
		<PerspectiveCamera
			makeDefault
			position={[0, 0, 50]}
		/>
		<Suspense>
			<Bubble />
			<Typography />
			<Environment preset="warehouse" />
		</Suspense>
	</>
  )
}
