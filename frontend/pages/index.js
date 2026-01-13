import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

// Dynamic imports to avoid SSR issues with Three.js
const ARScene = dynamic(() => import('../components/ARScene'), { ssr: false });
const FallbackScene = dynamic(() => import('../components/FallbackScene'), { ssr: false });

// Configuration - UPDATE THESE WITH YOUR DETAILS
const CONFIG = {
  name: "Your Name",
  website: "https://yourwebsite.com",
  linkedin: "https://linkedin.com/in/yourprofile",
  email: "hello@example.com",
  calendar: "https://calendly.com/yourprofile"
};

export default function Home() {
  const [arSupported, setArSupported] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null); // null, 'granted', 'denied'
  const [isLoading, setIsLoading] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    checkARSupport();
  }, []);

  const checkARSupport = async () => {
    if (typeof navigator !== 'undefined' && 'xr' in navigator) {
      try {
        const supported = await navigator.xr.isSessionSupported('immersive-ar');
        setArSupported(supported);
      } catch (e) {
        console.log('WebXR not supported:', e);
        setArSupported(false);
      }
    }
    setIsLoading(false);
    setShowPrompt(true);
  };

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Stop the stream immediately, we just needed permission
      stream.getTracks().forEach(track => track.stop());
      setCameraPermission('granted');
      setShowPrompt(false);
    } catch (error) {
      console.log('Camera access denied:', error);
      setCameraPermission('denied');
      setShowPrompt(false);
    }
  };

  const skipCamera = () => {
    setCameraPermission('denied');
    setShowPrompt(false);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading experience...</p>
      </div>
    );
  }

  if (showPrompt) {
    return (
      <>
        <Head>
          <title>{CONFIG.name} | Interactive Card</title>
          <meta name="description" content={`Connect with ${CONFIG.name} in AR`} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className={styles.promptContainer}>
          <div className={styles.promptCard}>
            <div className={styles.promptIcon}>📷</div>
            <h1 className={styles.promptTitle}>Enable AR Experience?</h1>
            <p className={styles.promptText}>
              Allow camera access for an immersive augmented reality experience,
              or continue with the standard 3D view.
            </p>
            {arSupported && (
              <p className={styles.arBadge}>
                ✨ Your device supports AR!
              </p>
            )}
            <div className={styles.promptButtons}>
              <button
                onClick={requestCameraAccess}
                className={styles.primaryButton}
              >
                Enable Camera
              </button>
              <button
                onClick={skipCamera}
                className={styles.secondaryButton}
              >
                Continue Without Camera
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{CONFIG.name} | Interactive Card</title>
        <meta name="description" content={`Connect with ${CONFIG.name} in AR`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {cameraPermission === 'granted' && arSupported ? (
        <ARScene config={CONFIG} />
      ) : (
        <FallbackScene config={CONFIG} />
      )}
    </>
  );
}
