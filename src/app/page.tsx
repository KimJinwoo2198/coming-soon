'use client'

import { useEffect, useRef, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.css'

export default function Home() {
 const canvasRef = useRef<HTMLCanvasElement | null>(null)
 const cursorPosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 })
 const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 })
 const [isPressed, setIsPressed] = useState(false)
 const [hasBeenPressed, setHasBeenPressed] = useState(false)

 useEffect(() => {
   const handleMouseMove = (e: MouseEvent) => {
     const newPos = { x: e.clientX, y: e.clientY }
     cursorPosRef.current = newPos
     setCursorPos(newPos)
   }
   const handleMouseDown = () => {
     setIsPressed(true)
     setHasBeenPressed(true)
   }
   const handleMouseUp = () => setIsPressed(false)

   document.addEventListener('mousemove', handleMouseMove)
   document.addEventListener('mousedown', handleMouseDown)
   document.addEventListener('mouseup', handleMouseUp)

   return () => {
     document.removeEventListener('mousemove', handleMouseMove)
     document.removeEventListener('mousedown', handleMouseDown)
     document.removeEventListener('mouseup', handleMouseUp)
   }
 }, [])

 useEffect(() => {
   const canvas = canvasRef.current
   if (!canvas) return

   const gl = canvas.getContext('webgl')
   if (!gl) {
     alert('WebGL is not supported')
     return
   }

   const vertexShaderSource = `
     attribute vec3 position;
     attribute vec3 spherePosition;
     uniform mat4 projection;
     uniform mat4 view;
     uniform float pointSize;
     uniform float time;
     uniform float sphereProgress;
     uniform vec2 mousePos;
     
     varying float depth;
     varying float particleLife;
     varying float pulseEffect;
     varying float mouseDistance;
     
     void main() {
         float noiseTime = time * 0.001;
         vec3 currentPos = mix(position, spherePosition, sphereProgress);
         
         currentPos.x += sin(noiseTime * 2.0 + currentPos.y) * (1.0 - sphereProgress) * 0.3;
         currentPos.y += cos(noiseTime * 1.5 + currentPos.x) * (1.0 - sphereProgress) * 0.3;
         currentPos.z += sin(noiseTime + currentPos.x + currentPos.y) * (1.0 - sphereProgress) * 0.3;
         
         vec4 viewPosition = view * vec4(currentPos, 1.0);
         gl_Position = projection * viewPosition;
         
         depth = viewPosition.z;
         particleLife = sphereProgress;
         
         float pulse = sin(noiseTime * 3.0 + position.x * 2.0 + position.y * 2.0) * 0.5 + 0.5;
         float size = pointSize * (1.2 + pulse * 0.8);
         gl_PointSize = size * (25.0 / -viewPosition.z);
         
         vec4 screenPos = projection * viewPosition;
         vec2 ndc = screenPos.xy / screenPos.w;
         mouseDistance = length(ndc - mousePos) * 2.0;
         
         pulseEffect = pulse;
     }
   `

   const fragmentShaderSource = `
     precision mediump float;
     varying float depth;
     varying float particleLife;
     varying float pulseEffect;
     varying float mouseDistance;
     
     void main() {
         vec2 coord = gl_PointCoord - vec2(0.5);
         float dist = length(coord);
         float softness = 0.05;
         float glowStrength = (1.0 - dist) * 0.5;
         float alpha = (1.0 - smoothstep(0.45, 0.5, dist)) * (0.7 + pulseEffect * 0.3);
         
         float brightness = 0.8 + 0.2 * sin(depth * 0.5 + particleLife * 3.14159);
         
         vec3 color1 = vec3(0.6, 0.2, 1.0);
         vec3 color2 = vec3(0.2, 0.5, 1.0);
         vec3 color3 = vec3(0.1, 0.8, 0.9);
         
         float mixFactor1 = sin(particleLife * 6.28318 + depth + pulseEffect) * 0.5 + 0.5;
         float mixFactor2 = cos(particleLife * 3.14159 + depth * 0.5) * 0.5 + 0.5;
         
         vec3 color = mix(mix(color1, color2, mixFactor1), color3, mixFactor2) * brightness;
         
         float mouseGlow = smoothstep(0.8, 0.0, mouseDistance) * 0.5;
         color = mix(color, vec3(1.0), mouseGlow);
         
         gl_FragColor = vec4(color, alpha);
     }
   `

   function createShader(type: number, source: string): WebGLShader | null {
     if (!gl) {
       console.error('WebGL context is not initialized')
       return null
     }
     const shader = gl.createShader(type)
     if (!shader) return null
     
     gl.shaderSource(shader, source)
     gl.compileShader(shader)
     if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
       console.error('Shader compile error:', gl.getShaderInfoLog(shader))
       gl.deleteShader(shader)
       return null
     }
     return shader
   }

   const program = gl.createProgram()
   if (!program) return

   const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
   const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
   
   if (!vertexShader || !fragmentShader) return

   gl.attachShader(program, vertexShader)
   gl.attachShader(program, fragmentShader)
   gl.linkProgram(program)

   if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
     console.error('Program link error:', gl.getProgramInfoLog(program))
     return
   }

   const numParticles = 3000
   const positions = new Float32Array(numParticles * 3)
   const spherePositions = new Float32Array(numParticles * 3)

   for (let i = 0; i < numParticles; i++) {
     positions[i * 3] = (Math.random() - 0.5) * 20
     positions[i * 3 + 1] = (Math.random() - 0.5) * 20
     positions[i * 3 + 2] = (Math.random() - 0.5) * 20
   }

   for (let i = 0; i < numParticles; i++) {
     const radius = 3
     const theta = Math.random() * Math.PI * 2
     const phi = Math.acos(2 * Math.random() - 1)
     
     spherePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
     spherePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
     spherePositions[i * 3 + 2] = radius * Math.cos(phi)
   }

   const positionBuffer = gl.createBuffer()
   if (!positionBuffer) return
   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
   gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

   const sphereBuffer = gl.createBuffer()
   if (!sphereBuffer) return
   gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer)
   gl.bufferData(gl.ARRAY_BUFFER, spherePositions, gl.STATIC_DRAW)

   let cameraDistance = 12
   let rotationX = 0
   let rotationY = 0
   let isDragging = false
   let lastMouseX = 0
   let lastMouseY = 0
   let targetRotationX = 0
   let targetRotationY = 0
   let momentum = { x: 0, y: 0 }
   const friction = 0.95

   canvas.addEventListener('mousedown', (e: MouseEvent) => {
     isDragging = true
     lastMouseX = e.clientX
     lastMouseY = e.clientY
     momentum = { x: 0, y: 0 }
   })

   canvas.addEventListener('mousemove', (e: MouseEvent) => {
     if (isDragging) {
       const deltaX = e.clientX - lastMouseX
       const deltaY = e.clientY - lastMouseY
       
       momentum.x = deltaX * 0.002
       momentum.y = deltaY * 0.002
       
       targetRotationX += momentum.x
       targetRotationY = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationY + momentum.y))
       
       lastMouseX = e.clientX
       lastMouseY = e.clientY
     }
   })

   document.addEventListener('mouseup', () => {
     isDragging = false
   })

   canvas.addEventListener('wheel', (e: WheelEvent) => {
     e.preventDefault()
     cameraDistance = Math.max(5, Math.min(20, cameraDistance + e.deltaY * 0.01))
   })

   function resizeCanvas() {
     if (!canvas || !gl) return
     const devicePixelRatio = window.devicePixelRatio || 1
     canvas.width = window.innerWidth * devicePixelRatio
     canvas.height = window.innerHeight * devicePixelRatio
     canvas.style.width = `${window.innerWidth}px`
     canvas.style.height = `${window.innerHeight}px`
     gl.viewport(0, 0, canvas.width, canvas.height)
   }

   window.addEventListener('resize', resizeCanvas)
   resizeCanvas()

   function perspective(fov: number, aspect: number, near: number, far: number): Float32Array {
     const f = 1.0 / Math.tan(fov / 2)
     const nf = 1 / (near - far)
     return new Float32Array([
       f / aspect, 0, 0, 0,
       0, f, 0, 0,
       0, 0, (far + near) * nf, -1,
       0, 0, 2 * far * near * nf, 0
     ])
   }

   const startTime = Date.now()

   const render = (time: number) => {
     if (!canvasRef.current) {
       console.error('Canvas element is not initialized')
       return
     }
     const canvas = canvasRef.current
   
     if (!gl) {
       console.error('WebGL context is not initialized')
       return
     }
     const elapsed = (Date.now() - startTime) / 1000
     const sphereProgress = Math.min(Math.max((elapsed - 1) / 2, 0), 1)
   
     if (!isDragging) {
       momentum.x *= friction
       momentum.y *= friction
       targetRotationX += momentum.x
       targetRotationY = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationY + momentum.y))
     }
   
     rotationX += (targetRotationX - rotationX) * 0.1
     rotationY += (targetRotationY - rotationY) * 0.1
   
     gl.clearColor(0, 0.016, 0.032, 1)
     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
     gl.enable(gl.BLEND)
     gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
   
     const aspect = canvas.width / canvas.height
     const projection = perspective(Math.PI / 4, aspect, 0.1, 100.0)
   
     const cosX = Math.cos(rotationX)
     const sinX = Math.sin(rotationX)
     const cosY = Math.cos(rotationY)
     const sinY = Math.sin(rotationY)
   
     const view = new Float32Array([
       cosX, 0, -sinX, 0,
       sinX * sinY, cosY, cosX * sinY, 0,
       sinX * cosY, -sinY, cosX * cosY, 0,
       0, 0, -cameraDistance, 1
     ])
   
     gl.useProgram(program)
   
     gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projection'), false, projection)
     gl.uniformMatrix4fv(gl.getUniformLocation(program, 'view'), false, view)
     gl.uniform1f(gl.getUniformLocation(program, 'pointSize'), window.devicePixelRatio * 3)
     gl.uniform1f(gl.getUniformLocation(program, 'time'), time)
     gl.uniform1f(gl.getUniformLocation(program, 'sphereProgress'), sphereProgress)
   
     const rect = canvas.getBoundingClientRect()
     const mouseX = (cursorPosRef.current.x - rect.left) / rect.width * 2 - 1
     const mouseY = -((cursorPosRef.current.y - rect.top) / rect.height * 2 - 1)
     gl.uniform2f(gl.getUniformLocation(program, 'mousePos'), mouseX, mouseY)
   
     const positionLoc = gl.getAttribLocation(program, 'position')
     gl.enableVertexAttribArray(positionLoc)
     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
     gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0)
   
     const spherePositionLoc = gl.getAttribLocation(program, 'spherePosition')
     gl.enableVertexAttribArray(spherePositionLoc)
     gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer)
     gl.vertexAttribPointer(spherePositionLoc, 3, gl.FLOAT, false, 0, 0)
   
     gl.drawArrays(gl.POINTS, 0, numParticles)
   
     requestAnimationFrame(render)
   }

   requestAnimationFrame(render)

   return () => {
     window.removeEventListener('resize', resizeCanvas)
   }
 }, [])

 return (
   <main>
     <canvas ref={canvasRef} />
     <div className="custom-cursor" style={{ left: cursorPos.x, top: cursorPos.y }}>
       <div className="cursor-dot" style={{ transform: `scale(${isPressed ? 1.5 : 1})` }} />
       {!hasBeenPressed && <span className="drag-text">Click & Drag</span>}
     </div>
     <div className="content">
       <div className="text-container">
         <h1>COMING SOON</h1>
         <div className="glowing-line"></div>
         <div className="subtitle">THE FUTURE AWAITS</div>
       </div>
       <div className="scroll-hint">
         <i className="fas fa-mouse"></i>
         EXPLORE
       </div>
     </div>
   </main>
 )
}