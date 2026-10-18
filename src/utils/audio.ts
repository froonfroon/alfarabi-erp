// High-End Executive Keynote Audio Synthesizer via Web Audio API
// Studio-grade acoustic sound design: Velvet haptic clicks, cinematic sub-whooshes, harmonic chimes
// Zero external MP3 files needed - 100% reliable, zero latency

class StudioSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterVolume: number = 0.6; // Default pleasant level

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  public getVolume(): number {
    return this.masterVolume;
  }

  // 1. Cinematic Slide Transition: Warm sub-bass sweep + smooth air whoosh
  public playSlideTransition() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Master output gain node
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(this.masterVolume * 0.45, now);
      master.connect(this.ctx.destination);

      // Layer A: Deep warm sub-bass pulse
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(55, now + 0.28);
      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.3, now + 0.04);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      subOsc.connect(subGain);
      subGain.connect(master);
      subOsc.start(now);
      subOsc.stop(now + 0.35);

      // Layer B: Harmonic glassy overtone (Musical fifth)
      const chordOsc = this.ctx.createOscillator();
      const chordGain = this.ctx.createGain();
      chordOsc.type = 'sine';
      chordOsc.frequency.setValueAtTime(440, now); // A4
      chordOsc.frequency.exponentialRampToValueAtTime(659.25, now + 0.2); // E5
      chordGain.gain.setValueAtTime(0.001, now);
      chordGain.gain.linearRampToValueAtTime(0.08, now + 0.05);
      chordGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
      chordOsc.connect(chordGain);
      chordGain.connect(master);
      chordOsc.start(now);
      chordOsc.stop(now + 0.28);

      // Layer C: Filtered airy whoosh
      const bufferSize = this.ctx.sampleRate * 0.25;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.12);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.25);
      filter.Q.value = 3.0;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.07, now + 0.08);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(master);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.26);
    } catch {
      // Audio fallback
    }
  }

  // 2. Velvet Haptic Click: Ultra-subtle, premium tactile click (like modern Apple UI)
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.025);

      gain.gain.setValueAtTime(this.masterVolume * 0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Fallback
    }
  }

  // 3. Futuristic Holographic Chord Trigger (For simulation & 3D status changes)
  public playTrigger() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const master = this.ctx.createGain();
      master.gain.setValueAtTime(this.masterVolume * 0.4, now);
      master.connect(this.ctx.destination);

      // Major chord triad with lush harmonic chime: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
      const freqs = [523.25, 659.25, 783.99, 1046.50];

      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.035);

        gain.gain.setValueAtTime(0.001, now + idx * 0.035);
        gain.gain.linearRampToValueAtTime(0.18 / (idx + 1), now + idx * 0.035 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.035 + 0.45);

        osc.connect(gain);
        gain.connect(master);

        osc.start(now + idx * 0.035);
        osc.stop(now + idx * 0.035 + 0.5);
      });
    } catch {
      // Fallback
    }
  }

  // 4. Warning / Alert sound for 10-day bed exceed or food waste alert
  public playAlert() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(370, now + 0.09);

      gain.gain.setValueAtTime(this.masterVolume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Fallback
    }
  }
}

export const soundManager = new StudioSoundEngine();
