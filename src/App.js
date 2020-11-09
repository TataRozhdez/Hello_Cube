import React, { useState, useRef } from 'react'
import { Canvas, useThree, extend, useFrame } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { a, useSpring } from 'react-spring/three'
import './App.css'

extend({ OrbitControls })

function Cube(props) {
  const [isBig, setIsBig] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef()

  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })

  const { size, x } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    x: isBig ? 2 : 0,
  })

  const color = isHovered ? 'pink' : 'salmon'

  return (
    <a.mesh
      {...props}
      ref={ref}
      scale={size}
      position-x={x}
      onClick={() => setIsBig(!isBig)}
      onPointerOut={() => setIsHovered(false)}
      onPointerOver={() => setIsHovered(true)}
    >
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial attach='material' color={color} />
    </a.mesh>
  )
}

function Scene() {
  const {
    camera,
    gl: { domElement },
  } = useThree()

  return (
    <>
      <ambientLight />
      <pointLight intensity={0.9} position={[-1, 2, 4]} />
      <Cube rotation={[10, 10, 0]} position={[0, 0, 0]} />
      <Cube rotation={[10, 10, 0]} position={[2, 2, 0]} />
      <orbitControls args={[camera, domElement]} />
    </>
  )
}

function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  )
}

export default App
