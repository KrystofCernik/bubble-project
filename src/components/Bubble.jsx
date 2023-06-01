import { useRef } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { useControl } from 'react-three-gui'
import { animated } from '@react-spring/three'
import { LayerMaterial, Displace } from "lamina"
import gsap from 'gsap'

export default function Bubble() {

	const meshRef = useRef(null)
	const dispalceRef = useRef(null)

	const { width } = useThree((state) => state.viewport)

	const getRandomShape = () => {
		let currentRandomStrength = meshRef.current.material.layers[0].strength
		let currentRandomScale = meshRef.current.material.layers[0].scale

		let newRandomStrength = Math.floor(Math.random() * (5 - 1 + 1)) + 1
		let newRandomScale = Math.floor(Math.random() * (0.8 - 0.1 + 1)) + 0.1

		const flowTL = gsap.timeline()

		if (Math.abs(newRandomScale - currentRandomScale) > 0.1) {
			flowTL.to(meshRef.current.material.layers[0], {
				scale: newRandomScale,
				strength: newRandomStrength,
				duration: 3.5,
				ease: 'power3.inOut'
			})
		} else {
			getRandomShape()
		}
	}

	let thickness = useControl('Thickness', { type: 'number', value: 3, min: 1, max: 10 })
	let strength = useControl('Strength', { type: 'number', value: 2, min: 1, max: 10 })
	let scale = useControl('Scale', { type: 'number', value: 0.1, min: 0, max: 1 })
	let speed = useControl('Speed', { type: 'number', value: 2, min: 0, max: 20 })
	const random = useControl('Random', { type: 'button', value: false, onClick: () => getRandomShape() })

	// const flow = useControl('Flow', { type: 'button', value: false, onClick: () => {
	// 	const flowTL = gsap.timeline()
	// 	.to(meshRef.current.material.layers[0], {
	// 		scale: 0.3,
	// 		strength: 3,
	// 		duration: 10,
	// 	})
	// 	.to(meshRef.current.material.layers[0], {
	// 		scale: 0.1,
	// 		strength: 1,
	// 		duration: 10,
	// 	})
	// 	.to(meshRef.current.material.layers[0], {
	// 		scale: 0.2,
	// 		strength: 2,
	// 		duration: 10,
	// 	})
	// } })

	useFrame((state, delta) => {
		dispalceRef.current.offset.x += speed * delta
	})

	return (
		<animated.mesh ref={meshRef}>
			<sphereBufferGeometry args={[width / 6, 128, 128]} />
			<LayerMaterial
				color={'white'}
				lighting={"physical"}
				transmission={1}
				roughness={0}
				thickness={thickness}
				toneMapped={false}
			>
				<Displace
					ref={dispalceRef}
					strength={strength}
					scale={scale}
				/>
			</LayerMaterial>
		</animated.mesh>
	)
}
