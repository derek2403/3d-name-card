import React from 'react';
import { Plane, useTexture } from '@react-three/drei';
import { RepeatWrapping } from 'three';

export const THEME_CONFIG = {
    modern: {
        groundColor: '#e0e0e0',
        wallColor: '#e6f2ff', // Very light blue
        bgColor: '#e6f2ff',
        fogColor: '#e6f2ff',
        grid: false,
        groundRoughness: 0.5,
        groundMetalness: 0.1,
        wallTexture: '/alphv.png',
    }
};

function TexturedWalls({ textureUrl, color }) {
    const texture = useTexture(textureUrl);

    // Configure texture repeating if needed
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(4, 2); // Adjust repeat as needed for UVs

    const WallMaterial = () => (
        <meshStandardMaterial
            map={texture}
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            roughness={1}
            metalness={0}
        />
    );

    return (
        <>
            {/* Back Wall */}
            <Plane
                args={[20, 10]}
                position={[0, 5, -5]}
                receiveShadow
            >
                <WallMaterial />
            </Plane>
            {/* Left Wall */}
            <Plane
                args={[20, 10]}
                rotation={[0, Math.PI / 2, 0]}
                position={[-10, 5, 0]}
                receiveShadow
            >
                <WallMaterial />
            </Plane>
            {/* Right Wall */}
            <Plane
                args={[20, 10]}
                rotation={[0, -Math.PI / 2, 0]}
                position={[10, 5, 0]}
                receiveShadow
            >
                <WallMaterial />
            </Plane>
        </>
    );
}

function StandardWalls({ color }) {
    const Material = () => (
        <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            roughness={1}
            metalness={0}
        />
    );
    return (
        <>
            {/* Back Wall */}
            <Plane args={[20, 10]} position={[0, 5, -5]} receiveShadow>
                <Material />
            </Plane>
            {/* Left Wall */}
            <Plane args={[20, 10]} rotation={[0, Math.PI / 2, 0]} position={[-10, 5, 0]} receiveShadow>
                <Material />
            </Plane>
            {/* Right Wall */}
            <Plane args={[20, 10]} rotation={[0, -Math.PI / 2, 0]} position={[10, 5, 0]} receiveShadow>
                <Material />
            </Plane>
        </>
    );
}

export default function EnvironmentBase({ theme = 'modern' }) {
    const config = THEME_CONFIG[theme] || THEME_CONFIG.modern;

    return (
        <group position={[0, -1.5, 0]}>
            {/* Ground */}
            <Plane
                args={[20, 20]}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                receiveShadow
            >
                <meshStandardMaterial
                    color={config.groundColor}
                    roughness={config.groundRoughness || 1}
                    metalness={config.groundMetalness || 0}
                />
            </Plane>

            {/* Walls */}
            {config.wallTexture ? (
                <TexturedWalls textureUrl={config.wallTexture} color={config.wallColor} />
            ) : (
                <StandardWalls color={config.wallColor} />
            )}
        </group>
    );
}
