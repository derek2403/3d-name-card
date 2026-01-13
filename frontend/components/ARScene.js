import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
import { Suspense } from 'react';
import Character from './Character';
import SocialLinks from './SocialLinks';
import styles from '../styles/Scene.module.css';

// Create XR store for session management
const store = createXRStore({
    requiredFeatures: ['local-floor'],
    optionalFeatures: ['dom-overlay'],
});

function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[0.2, 0.4, 0.1]} />
            <meshStandardMaterial color="#00d4ff" wireframe />
        </mesh>
    );
}

export default function ARScene({ config }) {
    return (
        <div className={styles.container}>
            <button
                className={styles.arButton}
                onClick={() => store.enterAR()}
            >
                Enter AR
            </button>

            <Canvas className={styles.canvas}>
                <XR store={store}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 10, 5]} intensity={1} />
                    <pointLight position={[0, 2, 2]} intensity={0.5} color="#00d4ff" />

                    <Suspense fallback={<LoadingFallback />}>
                        <group position={[0, -1, -2]} scale={0.01}>
                            <Character scale={1} position={[0, 0, 0]} />
                        </group>
                    </Suspense>
                </XR>
            </Canvas>

            <div id="ar-overlay" className={styles.arOverlay}>
                <SocialLinks {...config} />
                <div className={styles.arTagline}>
                    Point your camera at a flat surface
                </div>
            </div>
        </div>
    );
}
