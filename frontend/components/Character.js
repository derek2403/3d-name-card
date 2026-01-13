import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

export default function Character({ scale = 0.015, position = [-0.5, -1.5, 0] }) {
  const [model, setModel] = useState(null);
  const modelRef = useRef();
  const mixerRef = useRef();

  useEffect(() => {
    const loader = new FBXLoader();
    const textureLoader = new THREE.TextureLoader();

    // Load the texture
    const texture = textureLoader.load('/models/shaded.png');
    texture.flipY = true;
    texture.colorSpace = THREE.SRGBColorSpace;

    // Load the animated model from Mixamo
    loader.load('/models/animations/Talking.fbx', (fbx) => {
      // Apply texture to all meshes
      fbx.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.5,
            metalness: 0.1,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Apply scale directly to the model
      fbx.scale.setScalar(scale);

      // Setup animation mixer
      const mixer = new THREE.AnimationMixer(fbx);
      mixerRef.current = mixer;

      // Play the baked animation
      if (fbx.animations && fbx.animations.length > 0) {
        const clip = fbx.animations[0];
        const action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopRepeat);
        action.play();
      }

      setModel(fbx);
    });

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [scale]);

  // Update animation every frame
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  if (!model) return null;

  return (
    <primitive
      ref={modelRef}
      object={model}
      position={position}
    />
  );
}
