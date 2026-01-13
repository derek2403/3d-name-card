import { useLoader, useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export default function Character({ scale = 0.01, position = [0, -1.5, 0] }) {
  // Use the PBR version which has proper materials
  const fbx = useLoader(FBXLoader, '/models/base_basic_shaded.fbx');
  const mixerRef = useRef(null);
  const groupRef = useRef();

  useEffect(() => {
    // Traverse and enhance materials without replacing them
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat.map) {
                mat.map.colorSpace = THREE.SRGBColorSpace;
              }
              mat.needsUpdate = true;
            });
          } else {
            if (child.material.map) {
              child.material.map.colorSpace = THREE.SRGBColorSpace;
            }
            child.material.needsUpdate = true;
          }
        }
      }
    });

    // Setup animation if available in the model
    if (fbx.animations && fbx.animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(fbx);
      const action = mixerRef.current.clipAction(fbx.animations[0]);
      action.play();
    }
  }, [fbx]);

  // Update animation mixer
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <primitive
      ref={groupRef}
      object={fbx}
      scale={scale}
      position={position}
      rotation={[0, 0, 0]}
    />
  );
}
