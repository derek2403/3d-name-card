import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import Character from './Character';
import SocialLinks3D from './SocialLinks3D';
import EnvironmentBase, { THEME_CONFIG } from './EnvironmentBase';
import styles from '../styles/Scene.module.css';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

function ResponsiveCamera() {
    const { camera, size } = useThree();

    useEffect(() => {
        const isMobile = size.width < 768;
        if (isMobile) {
            camera.position.set(0, 0.5, 5.5); // Move back slightly on mobile
        } else {
            camera.position.set(0, 0.5, 4);
        }
        camera.updateProjectionMatrix();
    }, [size, camera]);

    return null;
}
import { useState } from 'react';

function HolographicBase({ position = [0, -1.5, 0] }) {
    return (
        <group position={position}>
            {/* Glowing ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <ringGeometry args={[0.8, 1.2, 64]} />
                <meshStandardMaterial
                    color="#00d4ff"
                    emissive="#00d4ff"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            {/* Inner glow */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
                <circleGeometry args={[0.85, 64]} />
                <meshStandardMaterial
                    color="#001a33"
                    emissive="#0066cc"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.9}
                />
            </mesh>
            {/* Outer pulse ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <ringGeometry args={[1.15, 1.25, 64]} />
                <meshStandardMaterial
                    color="#00aaff"
                    emissive="#00aaff"
                    emissiveIntensity={1.5}
                    transparent
                    opacity={0.6}
                />
            </mesh>
        </group>
    );
}

function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[1, 2, 0.5]} />
            <meshStandardMaterial color="#666" wireframe />
        </mesh>
    );
}

export default function FallbackScene({ config }) {
    const [currentTheme] = useState('modern');
    const themeConfig = THEME_CONFIG[currentTheme];

    return (
        <div className={styles.container}>
            <Canvas
                shadows
                camera={{ position: [0, 0.5, 4], fov: 50 }}
                className={styles.canvas}
            >
                <ResponsiveCamera />
                <color attach="background" args={[themeConfig.bgColor]} />
                <fog attach="fog" args={[themeConfig.fogColor, 5, 20]} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <pointLight position={[-5, 5, -5]} intensity={0.5} color="#fff" />
                <pointLight position={[0, -1, 2]} intensity={0.8} color="#00d4ff" />

                <Suspense fallback={<LoadingFallback />}>
                    <Character scale={0.015} position={[-0.5, -1.5, 0]} />
                    <HolographicBase position={[-0.5, -1.5, 0]} />
                    <EnvironmentBase theme={currentTheme} />
                    <SocialLinks3D {...config} />
                </Suspense>

                <ContactShadows
                    position={[0, -1.49, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={2}
                    far={4}
                />

                <Environment preset="city" />

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={2}
                    maxDistance={8}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2}
                    target={[0, 0, 0]}
                />
            </Canvas>
        </div>
    );
}
