import React, { useEffect } from 'react';

export default function IntroAnimation({ onComplete }) {
  useEffect(() => {
    if (onComplete) onComplete();
  }, [onComplete]);

  return null;
}
