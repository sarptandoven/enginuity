'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Sparkles, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface AbstractShapeProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed?: number;
  onClick: () => void;
}

// Abstract shape component
function AbstractShape({ position, rotation, scale, color, speed = 1, onClick }: AbstractShapeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2 * speed;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed;
      
      // Hover effect
      if (hovered) {
        mesh.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        mesh.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
      
      // Click effect
      if (clicked) {
        mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, position[1] + 0.5, 0.1);
      } else {
        mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, position[1], 0.1);
      }
    }
  });

  return (
    <mesh 
      ref={mesh}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(!clicked);
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.2}
      />
    </mesh>
  );
}

// Main 3D scene component
function Scene() {
  const [activeShape, setActiveShape] = useState<number | null>(null);
  
  const handleShapeClick = (id: number) => {
    setActiveShape(id === activeShape ? null : id);
  };
  
  return (
    <>
      <Environment preset="city" />
      
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
      
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[0, 0, 0]}>
          <AbstractShape 
            position={[-2, 0, 0]} 
            rotation={[0, 0, 0]} 
            scale={1} 
            color="#4285F4" 
            speed={1}
            onClick={() => handleShapeClick(1)}
          />
          <AbstractShape 
            position={[2, 0, 0]} 
            rotation={[0, 0, 0]} 
            scale={0.8} 
            color="#EA4335" 
            speed={1.2}
            onClick={() => handleShapeClick(2)}
          />
          <AbstractShape 
            position={[0, 2, 0]} 
            rotation={[0, 0, 0]} 
            scale={1.2} 
            color="#FBBC05" 
            speed={0.8}
            onClick={() => handleShapeClick(3)}
          />
          <AbstractShape 
            position={[0, -2, 0]} 
            rotation={[0, 0, 0]} 
            scale={0.9} 
            color="#34A853" 
            speed={1.5}
            onClick={() => handleShapeClick(4)}
          />
        </group>
      </Float>
      
      <Sparkles count={200} scale={10} size={2} speed={0.5} />
      
      <ContactShadows 
        position={[0, -3, 0]} 
        opacity={0.7} 
        scale={10} 
        blur={2.5} 
        far={5} 
      />
    </>
  );
}

export default function Hero3D() {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animation for the canvas container
    if (canvasRef.current) {
      gsap.fromTo(
        canvasRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
    }
  }, []);
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80 z-10" />
      
      {/* 3D Canvas */}
      <div ref={canvasRef} className="absolute inset-0 z-0">
        <Canvas shadows>
          <Scene />
        </Canvas>
      </div>
      
      {/* Text content overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
        >
          Revolutionize Your Learning
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mb-10"
        >
          AI-powered personalized education platform designed to transform how you master coding.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold 
                           text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform 
                           hover:scale-105 shadow-lg hover:shadow-blue-500/25">
            Get Started
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
              <motion.div 
                className="w-1 h-1 bg-gray-400 rounded-full"
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 