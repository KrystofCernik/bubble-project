import { useRef } from "react"
import { useThree } from "@react-three/fiber"
import { RenderTexture, Text, Image } from "@react-three/drei"
import { useControl } from 'react-three-gui'

export default function Typography() {

	const contentRef = useRef('Bubble')
	const sizeRef = useRef(20)

	const image = useControl('WM mode', { type: 'boolean', value: false })

	const { width, height } = useThree((state) => state.viewport)
	const vw = (size) => (width * size) / 100;

	return (
		<mesh>
			<planeBufferGeometry args={[width, height, 1]} />
			<meshBasicMaterial toneMapped={false}>
				<RenderTexture attach="map">
					<color attach="background" args={["#000"]} />
					{!image ? (
						<Text
							color={"#f5f5f5"}
							font="/prompt-semibold.ttf"
							fontSize={vw(sizeRef.current)}
							anchorX="center"
							anchorY="middle"
						>
							{contentRef.current}
						</Text>
					) : (
						<Image
							url="/text.png"
							scale={[80, 80]}
							position={[0, 0, 0]}
						/>
					)}
				</RenderTexture>
			</meshBasicMaterial>
		</mesh>
	)
}
