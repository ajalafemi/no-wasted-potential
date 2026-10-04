/**
 * Ambient audio and motivational voice synthesizer for NO WASTED POTENTIAL
 */

let audioCtx: AudioContext | null = null;
let currentOsc: OscillatorNode | null = null;
let currentGain: GainNode | null = null;

export function playAmbientPulse() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Stop previous if any
    stopAudio();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Deep sub bass cinematic pulse
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, now); // A1 note
    osc.frequency.exponentialRampToValueAtTime(45, now + 1.2);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 2.1);

    currentOsc = osc;
    currentGain = gain;
  } catch (err) {
    console.debug('Audio context not initialized:', err);
  }
}

export function playSpeechQuote(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) setTimeout(onEnd, 2000);
    return;
  }

  window.speechSynthesis.cancel();
  playAmbientPulse();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.88;
  utterance.pitch = 0.85; // deep, measured, impactful tone

  // Attempt to pick a deep English voice
  const voices = window.speechSynthesis.getVoices();
  const deepVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Daniel') || v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Male')));
  if (deepVoice) {
    utterance.voice = deepVoice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopAudio() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (currentGain && audioCtx) {
    try {
      currentGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    } catch {
      // ignore
    }
  }
}
