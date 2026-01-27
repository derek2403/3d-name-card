import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import Character from './Character';
import SocialLinks3D from './SocialLinks3D';
import styles from '../styles/Scene.module.css';
import { Environment, OrbitControls, useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';



// Copied and adjusted from FallbackScene - Increased distance for 15% smaller initial render
function ResponsiveCamera() {
    const { camera, size } = useThree();

    useEffect(() => {
        const isMobile = size.width < 768;
        if (isMobile) {
            // Fallback was 5.5, increasing to 6.4 (~15% smaller)
            camera.position.set(0, 10, 6.4);
        } else {
            camera.position.set(0, 10, 4);
        }
        camera.updateProjectionMatrix();
    }, [size, camera]);

    return null;
}

// 3D Card base with card.png as top face
function Card3D({ position = [0, -1.5, 0] }) {
    const texture = useTexture('/card.png');

    // Credit card aspect ratio: 85.6mm x 53.98mm ≈ 1.586
    const cardWidth = 2.5;
    const cardHeight = cardWidth / 1.586;
    const cardDepth = 0.08; // Thin card thickness

    return (
        <group position={position}>
            {/* Main card body */}
            <mesh position={[0, cardDepth / 2, 0]}>
                <boxGeometry args={[cardWidth, cardDepth, cardHeight]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    roughness={0.3}
                    metalness={0.1}
                />
            </mesh>

            {/* Top face with card image */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, cardDepth + 0.001, 0]}>
                <planeGeometry args={[cardWidth, cardHeight]} />
                <meshStandardMaterial
                    map={texture}
                    roughness={0.4}
                    metalness={0.2}
                />
            </mesh>
        </group>
    );
}

function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[0.2, 0.4, 0.1]} />
            <meshStandardMaterial color="#00d4ff" wireframe />
        </mesh>
    );
}

export default function ARScene({ config }) {
    const videoRef = useRef(null);
    const [cameraReady, setCameraReady] = useState(false);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment', // Use back camera on mobile
                        width: { ideal: 1920 },
                        height: { ideal: 1080 }
                    }
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setCameraReady(true);
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                // Fallback to minimal error UI? 
                // For now just logging, index.js usually handles permission denial.
            }
        };

        startCamera();

        return () => {
            // Cleanup stream
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className={styles.container}>
            {/* Camera Feed Background */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    transform: 'scaleX(1)' // Ensure no mirroring for back camera
                }}
            />

            {/* 3D Overlay */}
            <Canvas
                className={styles.canvas}
                gl={{ alpha: true, antialias: true }}
                style={{ zIndex: 1, position: 'absolute', top: 0, left: 0 }}
                camera={{ position: [0, 0, 5], fov: 50 }}
            >
                {/* Lighting matched from FallbackScene */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={1}
                />
                <pointLight position={[-5, 5, -5]} intensity={0.5} color="#fff" />
                <pointLight position={[0, -1, 2]} intensity={0.8} color="#00d4ff" />

                <Environment preset="city" />

                <ResponsiveCamera />

                <Suspense fallback={<LoadingFallback />}>
                    <Character scale={0.02} position={[-0.5, -1.5, 0]} rotation={[Math.PI / 2, Math.PI / 2, 0]} />
                    <Card3D position={[-0.5, -1.5, 0]} />
                    <SocialLinks3D {...config} />
                </Suspense>

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    minDistance={2}
                    maxDistance={8}
                    target={[0, 0, 0]}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
}
