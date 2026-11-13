/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  RotateCcw, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Play, 
  Pause,
  Plus, 
  Dice5,
  Award,
  Lock,
  Layers,
  Flame,
  Keyboard,
  KeyRound
} from 'lucide-react';

// --- Sound Synthesizer via Web Audio API ---
class SoundManager {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    // Initialized on user interaction
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  isMuted() {
    return this.muted;
  }

  playDeploy(tier: 1 | 2 | 3) {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (tier === 1) {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (tier === 2) {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.setValueAtTime(440, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      // Tier 3: Powerful cyber chord
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        if (!this.ctx) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + i * 0.03);
        g.gain.setValueAtTime(0.12, now + i * 0.03);
        g.gain.exponentialRampToValueAtTime(0.005, now + 0.35);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(now + i * 0.03);
        o.stop(now + 0.35);
      });
    }
  }

  playHit() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.09);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  playDefeat() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.14);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playBaseAlarm() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.setValueAtTime(160, now + 0.1);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playGameOver() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [392, 349.2, 329.6, 261.6];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.14);
      gain.gain.setValueAtTime(0.2, now + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.01, now + (idx + 1) * 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.14);
      osc.stop(now + (idx + 1) * 0.14);
    });
  }

  playClick() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  playEmergencyBoost() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [330, 440, 554, 659, 880, 1108];
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + idx * 0.05 + 0.18);
      gain.gain.setValueAtTime(0.18, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.05 + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.28);
    });
  }
}

const sounds = new SoundManager();

// --- Educational Word Banks for Password Generation ---
const SAMPLE_WORDS = ['dog', 'cat', 'tokyo', 'admin', 'ninja', 'secret', 'dragon', 'coffee', 'star', 'lucky'];
const SAMPLE_NUMBERS = ['123', '777', '2026', '999', '0404', '888', '314', '007', '555', '42'];
const SAMPLE_SYMBOLS = ['!?', '#$*', '@&', '$%!', '~*?', '#!', '??', '*&*', '+_/', '^#^'];

interface DefenseWall {
  id: string;
  slotIndex: number; // 0: inner, 1: mid, 2: front
  passwordText: string;
  tier: 1 | 2 | 3;
  hp: number;
  maxHp: number;
  hasWords: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  flash: boolean;
  isBoosted?: boolean;
  boostAmount?: number;
}

interface Hacker {
  id: string;
  name: string;
  emoji: string;
  xPercent: number; // 0 to 100 (100 = right spawn, 0 = data base)
  speed: number;
  hp: number;
  maxHp: number;
  attackPower: number;
  isBoss?: boolean;
  type: 'script_kiddie' | 'botnet' | 'dictionary' | 'boss';
}

interface Particle {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
}

export default function App() {
  // Game State
  const [gameState, setGameState] = useState<'TITLE' | 'PLAYING' | 'GAMEOVER'>('TITLE');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('pw_defense_highscore') || '0');
    } catch {
      return 0;
    }
  });
  const [wave, setWave] = useState(1);
  const [dataHp, setDataHp] = useState(100);
  const [isDataGlitch, setIsDataGlitch] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Password Composer Selection States
  const [hasWordSelected, setHasWordSelected] = useState(false);
  const [hasNumberSelected, setHasNumberSelected] = useState(false);
  const [hasSymbolSelected, setHasSymbolSelected] = useState(false);

  const [currentWord, setCurrentWord] = useState('dog');
  const [currentNumber, setCurrentNumber] = useState('123');
  const [currentSymbol, setCurrentSymbol] = useState('!?');

  // Builder Mode: BLOCKS (3-block composer) or CUSTOM (free typing mode)
  const [builderMode, setBuilderMode] = useState<'BLOCKS' | 'CUSTOM'>('BLOCKS');
  const [customInputText, setCustomInputText] = useState('');

  // Cooldown
  const [deployCooldown, setDeployCooldown] = useState(0); // 0 to 100%

  // Defense Walls (Up to 3 slots along the path: 0 = Inner (22%), 1 = Mid (45%), 2 = Front (68%))
  const [walls, setWalls] = useState<DefenseWall[]>([]);

  // Hackers moving on screen
  const [hackers, setHackers] = useState<Hacker[]>([]);

  // Visual effects
  const [particles, setParticles] = useState<Particle[]>([]);

  // Statistics for Game Over Summary
  const [stats, setStats] = useState({
    hackersDefeated: 0,
    wallsBuilt: 0,
    tier1Built: 0,
    tier2Built: 0,
    tier3Built: 0,
    highestTierBuilt: 1,
    emergencyBoostsUsed: 0,
  });

  // Emergency Boost (Last resort: +50% HP for 5s, 25s cooldown)
  const [boostActive, setBoostActive] = useState(false);
  const [boostDuration, setBoostDuration] = useState(0);
  const [boostCooldown, setBoostCooldown] = useState(0);
  const boostActiveRef = useRef(false);
  const boostDurationRef = useRef(0);
  const boostCooldownRef = useRef(0);

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);

  // Sound toggle
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sounds.setMuted(next);
    if (!next) sounds.playClick();
  };

  // Shuffle sample values
  const randomizeTokens = () => {
    sounds.playClick();
    setCurrentWord(SAMPLE_WORDS[Math.floor(Math.random() * SAMPLE_WORDS.length)]);
    setCurrentNumber(SAMPLE_NUMBERS[Math.floor(Math.random() * SAMPLE_NUMBERS.length)]);
    setCurrentSymbol(SAMPLE_SYMBOLS[Math.floor(Math.random() * SAMPLE_SYMBOLS.length)]);
  };

  // Determine current composed tier & stats
  const activeTypesCount = (hasWordSelected ? 1 : 0) + (hasNumberSelected ? 1 : 0) + (hasSymbolSelected ? 1 : 0);
  const currentTier: 1 | 2 | 3 = activeTypesCount >= 3 ? 3 : activeTypesCount === 2 ? 2 : 1;

  // Build password string from selection
  let composedPassword = '';
  if (hasWordSelected) composedPassword += currentWord;
  if (hasNumberSelected) composedPassword += currentNumber;
  if (hasSymbolSelected) composedPassword += currentSymbol;

  // Tier metadata
  const getTierInfo = (tier: 1 | 2 | 3, count: number) => {
    if (count === 0) {
      return {
        label: '未選択',
        title: 'ブロックを選んでください',
        hp: 0,
        crackTime: '---',
        color: 'text-slate-400',
        bg: 'bg-slate-800',
        border: 'border-slate-700',
        desc: '単語・数字・記号から1つ以上選んでください',
      };
    }
    if (tier === 1) {
      return {
        label: '弱い壁 (小)',
        title: '1要素のみ（文字数少）',
        hp: 35,
        crackTime: '約0.001秒（瞬時に解読）',
        color: 'text-rose-400',
        bg: 'bg-rose-950/40',
        border: 'border-rose-600/60',
        desc: '辞書攻撃ですぐ突破される脆弱なパスワード！',
      };
    }
    if (tier === 2) {
      return {
        label: '普通の壁 (中)',
        title: '2要素の組み合わせ',
        hp: 95,
        crackTime: '約2〜3時間',
        color: 'text-amber-400',
        bg: 'bg-amber-950/40',
        border: 'border-amber-600/60',
        desc: '単語＋数字など。多少は耐えるが安心は禁物！',
      };
    }
    return {
      label: '最強の壁 (大)',
      title: '3要素すべて複合（英数記号）',
      hp: 260,
      crackTime: '約3,000年以上！',
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-500',
      desc: '辞書・総当たり攻撃を完全に跳ね返す鉄壁！',
    };
  };

  const currentTierInfo = getTierInfo(currentTier, activeTypesCount);

  // Custom password real-time security analysis
  const customAnalysis = React.useMemo(() => {
    const text = customInputText.trim();
    const length = text.length;
    if (length === 0) {
      return {
        text: '',
        length: 0,
        hasLower: false,
        hasUpper: false,
        hasNumber: false,
        hasSymbol: false,
        typesCount: 0,
        tier: 1 as 1 | 2 | 3,
        hp: 0,
        crackTime: '---',
        strengthLabel: '未入力',
        color: 'text-slate-400',
        bg: 'bg-slate-800',
        border: 'border-slate-700',
        advice: 'パスワードを入力してください（英数記号の組み合わせを推奨）',
      };
    }

    const hasLower = /[a-z]/.test(text);
    const hasUpper = /[A-Z]/.test(text);
    const hasNumber = /[0-9]/.test(text);
    const hasSymbol = /[^a-zA-Z0-9]/.test(text);

    let typesCount = 0;
    if (hasLower || hasUpper) typesCount += 1;
    if (hasNumber) typesCount += 1;
    if (hasSymbol) typesCount += 1;
    const hasBothCases = hasLower && hasUpper;

    const lower = text.toLowerCase();
    const isCommonDictionary = ['password', '123456', 'admin', 'qwerty', 'dragon', 'tokyo', 'iloveyou', 'secret', 'monkey'].includes(lower);

    let hp = 35;
    let tier: 1 | 2 | 3 = 1;
    let crackTime = '約0.001秒（瞬時解読）';
    let strengthLabel = '脆弱';
    let color = 'text-rose-400';
    let bg = 'bg-rose-950/40';
    let border = 'border-rose-600/60';
    let advice = '短すぎるか単語のみです。数字や記号を追加しましょう！';

    if (isCommonDictionary || length < 4) {
      hp = 25;
      tier = 1;
      crackTime = '瞬時（0.0001秒）';
      strengthLabel = '極めて脆弱';
      advice = 'よく使われる単語や短すぎる文字は辞書攻撃ですぐ突破されます！';
    } else if (typesCount === 1) {
      hp = Math.min(50, 30 + length * 2);
      tier = 1;
      crackTime = length < 8 ? '約0.01秒' : '約2分';
      strengthLabel = '弱い';
      advice = '1種類の文字だけでは総当たり攻撃ですぐ解読されます！';
    } else if (typesCount === 2) {
      if (length < 8) {
        hp = 70;
        tier = 2;
        crackTime = '約10分';
        strengthLabel = 'やや弱い (短長)';
        color = 'text-amber-400';
        bg = 'bg-amber-950/40';
        border = 'border-amber-600/60';
        advice = '文字数が8文字未満です。文字数を伸ばすと防御力が上がります！';
      } else {
        hp = Math.min(145, 95 + (length - 8) * 8);
        tier = 2;
        crackTime = '約3日〜数ヶ月';
        strengthLabel = '普通';
        color = 'text-amber-400';
        bg = 'bg-amber-950/40';
        border = 'border-amber-600/60';
        advice = '記号（! @ # $ など）も混ぜると最強の壁になります！';
      }
    } else {
      // 3 or more types (Letters + Numbers + Symbols)
      if (length < 8) {
        hp = 130;
        tier = 2;
        crackTime = '約8時間';
        strengthLabel = '良好 (短長)';
        color = 'text-amber-300';
        bg = 'bg-amber-950/40';
        border = 'border-amber-500';
        advice = '記号入りですが文字数が短いです。8文字以上に伸ばしましょう！';
      } else if (length < 12) {
        hp = 230 + (length - 8) * 10;
        tier = 3;
        crackTime = '約200年〜500年';
        strengthLabel = '強固';
        color = 'text-emerald-400';
        bg = 'bg-emerald-950/40';
        border = 'border-emerald-500';
        advice = '強力なパスワードです！12文字以上で伝説級の鉄壁になります！';
      } else {
        const bonus = hasBothCases ? 40 : 0;
        hp = Math.min(360, 280 + (length - 12) * 10 + bonus);
        tier = 3;
        crackTime = '3,000年以上（解読不能）！';
        strengthLabel = hasBothCases ? '伝説の鉄壁 (神強度)' : '最強の防壁';
        color = 'text-emerald-300';
        bg = 'bg-emerald-950/50';
        border = 'border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]';
        advice = '完璧なパスワード！スパコンでも解読に数千年以上かかる無敵の壁！';
      }
    }

    return {
      text,
      length,
      hasLower,
      hasUpper,
      hasNumber,
      hasSymbol,
      typesCount,
      tier,
      hp,
      crackTime,
      strengthLabel,
      color,
      bg,
      border,
      advice,
    };
  }, [customInputText]);

  // Spawn particle
  const addParticle = (x: number, y: number, text: string, color: string) => {
    const id = Math.random().toString();
    setParticles((prev) => [...prev, { id, x, y, text, color }]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  };

  // Reset & Start Game
  const startGame = () => {
    sounds.playClick();
    setScore(0);
    setWave(1);
    setDataHp(100);
    setWalls([]);
    setHackers([]);
    setParticles([]);
    setDeployCooldown(0);
    setCustomInputText('');
    setIsPaused(false);
    setBoostActive(false);
    setBoostDuration(0);
    setBoostCooldown(0);
    boostActiveRef.current = false;
    boostDurationRef.current = 0;
    boostCooldownRef.current = 0;

    setStats({
      hackersDefeated: 0,
      wallsBuilt: 0,
      tier1Built: 0,
      tier2Built: 0,
      tier3Built: 0,
      highestTierBuilt: 1,
      emergencyBoostsUsed: 0,
    });
    // Default select 1 word for quick start
    setHasWordSelected(true);
    setHasNumberSelected(false);
    setHasSymbolSelected(false);
    setGameState('PLAYING');
    lastTimeRef.current = performance.now();
    spawnTimerRef.current = 1.0; // first hacker in 1 second
  };

  // Toggle Pause/Resume
  const togglePause = () => {
    sounds.playClick();
    setIsPaused((prev) => {
      const next = !prev;
      if (!next) {
        lastTimeRef.current = performance.now();
      }
      return next;
    });
  };

  // Emergency Boost (Last resort: +50% HP to all active walls for 5 seconds)
  const handleEmergencyBoost = () => {
    if (
      boostActiveRef.current ||
      boostCooldownRef.current > 0 ||
      walls.length === 0 ||
      gameState !== 'PLAYING'
    ) {
      return;
    }

    sounds.playEmergencyBoost();

    // Boost all active walls by 50% of current HP (minimum +15 HP)
    setWalls((curWalls) =>
      curWalls.map((w) => {
        const boostAmt = Math.max(15, Math.ceil(w.hp * 0.5));
        return {
          ...w,
          hp: w.hp + boostAmt,
          maxHp: w.maxHp + boostAmt,
          isBoosted: true,
          boostAmount: (w.boostAmount || 0) + boostAmt,
          flash: true,
        };
      })
    );

    boostActiveRef.current = true;
    boostDurationRef.current = 5.0;
    boostCooldownRef.current = 25.0; // 25s long cooldown

    setBoostActive(true);
    setBoostDuration(5.0);
    setBoostCooldown(25.0);

    setStats((s) => ({
      ...s,
      emergencyBoostsUsed: s.emergencyBoostsUsed + 1,
    }));

    addParticle(50, 42, '🚨 緊急防壁HP+50%過負荷ブースト発動！(5秒間) ⚡', '#f59e0b');
  };

  // Deploy Wall Handler
  const handleDeployWall = () => {
    if (deployCooldown > 0 || gameState !== 'PLAYING') {
      return;
    }

    let targetPassword = '';
    let targetTier: 1 | 2 | 3 = 1;
    let targetHp = 35;
    let targetHasWords = false;
    let targetHasNumbers = false;
    let targetHasSymbols = false;

    if (builderMode === 'BLOCKS') {
      if (activeTypesCount === 0) return;
      targetPassword = composedPassword || 'pass';
      targetTier = currentTier;
      targetHp = currentTierInfo.hp;
      targetHasWords = hasWordSelected;
      targetHasNumbers = hasNumberSelected;
      targetHasSymbols = hasSymbolSelected;
    } else {
      // CUSTOM mode
      if (!customAnalysis.text || customAnalysis.hp === 0) return;
      targetPassword = customAnalysis.text;
      targetTier = customAnalysis.tier;
      targetHp = customAnalysis.hp;
      targetHasWords = customAnalysis.hasLower || customAnalysis.hasUpper;
      targetHasNumbers = customAnalysis.hasNumber;
      targetHasSymbols = customAnalysis.hasSymbol;
    }

    // Determine target slot:
    // Slots are: 2 (Front ~68%), 1 (Mid ~45%), 0 (Inner ~22%)
    // Fill from front to inner, or replace weakest if full
    setWalls((currentWalls) => {
      let targetSlot = 2; // prefer front
      const hasSlot2 = currentWalls.some((w) => w.slotIndex === 2);
      const hasSlot1 = currentWalls.some((w) => w.slotIndex === 1);
      const hasSlot0 = currentWalls.some((w) => w.slotIndex === 0);

      if (!hasSlot2) {
        targetSlot = 2;
      } else if (!hasSlot1) {
        targetSlot = 1;
      } else if (!hasSlot0) {
        targetSlot = 0;
      } else {
        // All 3 occupied! Reinforce/replace the one with lowest HP
        const sorted = [...currentWalls].sort((a, b) => a.hp - b.hp);
        targetSlot = sorted[0].slotIndex;
      }

      // If emergency boost is active, also grant 50% boost to this newly deployed wall!
      const isBoosted = boostActiveRef.current;
      const boostAmount = isBoosted ? Math.max(15, Math.ceil(targetHp * 0.5)) : 0;

      const newWall: DefenseWall = {
        id: Math.random().toString(),
        slotIndex: targetSlot,
        passwordText: targetPassword,
        tier: targetTier,
        hp: targetHp + boostAmount,
        maxHp: targetHp + boostAmount,
        hasWords: targetHasWords,
        hasNumbers: targetHasNumbers,
        hasSymbols: targetHasSymbols,
        flash: true,
        isBoosted,
        boostAmount,
      };

      sounds.playDeploy(targetTier);

      // Track statistics
      setStats((s) => ({
        ...s,
        wallsBuilt: s.wallsBuilt + 1,
        tier1Built: s.tier1Built + (currentTier === 1 ? 1 : 0),
        tier2Built: s.tier2Built + (currentTier === 2 ? 1 : 0),
        tier3Built: s.tier3Built + (currentTier === 3 ? 1 : 0),
        highestTierBuilt: Math.max(s.highestTierBuilt, currentTier),
      }));

      // Return updated walls
      const remaining = currentWalls.filter((w) => w.slotIndex !== targetSlot);
      return [...remaining, newWall];
    });

    // Start Cooldown (0.8s)
    setDeployCooldown(100);
  };

  // Cooldown timer loop
  useEffect(() => {
    if (deployCooldown <= 0 || isPaused) return;
    const interval = setInterval(() => {
      setDeployCooldown((prev) => {
        const next = prev - 8;
        return next <= 0 ? 0 : next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [deployCooldown, isPaused]);

  // Main Game Loop
  useEffect(() => {
    if (gameState !== 'PLAYING' || isPaused) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    lastTimeRef.current = performance.now();

    const slotPositions: Record<number, number> = {
      0: 22, // Inner defense
      1: 45, // Mid defense
      2: 68, // Front defense
    };

    const updateGame = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // Emergency Boost timer updates
      if (boostActiveRef.current) {
        boostDurationRef.current -= dt;
        if (boostDurationRef.current <= 0) {
          boostActiveRef.current = false;
          setBoostActive(false);
          setBoostDuration(0);

          // Revert temporary 50% boost from surviving walls
          setWalls((curWalls) =>
            curWalls.map((w) => {
              if (w.isBoosted && w.boostAmount) {
                const revertHp = Math.max(1, w.hp - w.boostAmount);
                const revertMaxHp = Math.max(1, w.maxHp - w.boostAmount);
                return {
                  ...w,
                  hp: revertHp,
                  maxHp: revertMaxHp,
                  isBoosted: false,
                  boostAmount: 0,
                };
              }
              return { ...w, isBoosted: false, boostAmount: 0 };
            })
          );
          addParticle(50, 42, 'シールド過負荷ブースト終了', '#94a3b8');
        } else {
          setBoostDuration(boostDurationRef.current);
        }
      }

      if (boostCooldownRef.current > 0) {
        boostCooldownRef.current -= dt;
        if (boostCooldownRef.current <= 0) {
          boostCooldownRef.current = 0;
          setBoostCooldown(0);
        } else {
          setBoostCooldown(boostCooldownRef.current);
        }
      }

      // 1. Spawning Hackers
      spawnTimerRef.current -= dt;
      if (spawnTimerRef.current <= 0) {
        // Spawn rate scales with wave
        const spawnInterval = Math.max(1.4, 3.2 - wave * 0.28);
        spawnTimerRef.current = spawnInterval;

        // Choose hacker type
        const rand = Math.random();
        let type: Hacker['type'] = 'script_kiddie';
        let name = 'スクリプトキディ';
        let emoji = '🦹';
        let hp = 25;
        let speed = 7.5 + wave * 0.4;
        let attackPower = 28;
        let isBoss = false;

        // Boss every 10 points
        if (score > 0 && score % 10 === 0 && Math.random() < 0.6) {
          type = 'boss';
          name = '組織犯罪ボス';
          emoji = '🕵️';
          hp = 80 + wave * 10;
          speed = 4.2;
          attackPower = 80;
          isBoss = true;
        } else if (rand < 0.35) {
          type = 'dictionary';
          name = '辞書攻撃ワーム';
          emoji = '👾';
          hp = 30 + wave * 3;
          speed = 6.8 + wave * 0.3;
          attackPower = 35;
        } else if (rand < 0.7) {
          type = 'botnet';
          name = 'ブルートフォースBOT';
          emoji = '🤖';
          hp = 38 + wave * 4;
          speed = 5.5 + wave * 0.3;
          attackPower = 45;
        }

        setHackers((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            name,
            emoji,
            xPercent: 100,
            speed,
            hp,
            maxHp: hp,
            attackPower,
            isBoss,
            type,
          },
        ]);
      }

      // 2. Move Hackers & Check Collisions
      setHackers((prevHackers) => {
        let updatedHackers = [...prevHackers];
        const nextHackers: Hacker[] = [];

        setWalls((prevWalls) => {
          let updatedWalls = prevWalls.map((w) => ({ ...w, flash: false }));

          for (const hacker of updatedHackers) {
            let hackerX = hacker.xPercent - hacker.speed * dt;
            let hackerDefeated = false;

            // Check collision with walls (check front wall first, then mid, then inner)
            // Wall triggers collision when hacker is near the slot position +/- 2.5%
            const sortedWalls = [...updatedWalls].sort((a, b) => b.slotIndex - a.slotIndex);
            for (let i = 0; i < sortedWalls.length; i++) {
              const wall = sortedWalls[i];
              const wallX = slotPositions[wall.slotIndex];

              // Collision range
              if (hackerX <= wallX + 2.5 && hackerX >= wallX - 2.5) {
                // Calculate damage to wall
                let damage = hacker.attackPower;

                // Special mechanic: Dictionary worms deal extra 80% damage to word-only walls!
                if (hacker.type === 'dictionary' && wall.hasWords && !wall.hasNumbers && !wall.hasSymbols) {
                  damage = Math.floor(damage * 1.8);
                }

                // Tier 3 Cyber walls deflect and reduce incoming damage!
                if (wall.tier === 3) {
                  damage = Math.floor(damage * 0.7);
                }

                wall.hp -= damage;
                wall.flash = true;
                sounds.playHit();

                // Particle on hit
                addParticle(wallX, 50, `-${damage} HP`, '#f43f5e');

                // Hacker is defeated upon crashing into wall
                hackerDefeated = true;
                sounds.playDefeat();
                addParticle(wallX + 4, 35, 'ブロック撃退! ⚡', '#10b981');

                // Increment score
                setScore((s) => {
                  const newScore = s + 1;
                  setHighScore((h) => {
                    const top = Math.max(h, newScore);
                    try {
                      localStorage.setItem('pw_defense_highscore', top.toString());
                    } catch {
                      // ignore
                    }
                    return top;
                  });
                  if (newScore % 7 === 0) {
                    setWave((w) => w + 1);
                  }
                  return newScore;
                });

                setStats((s) => ({
                  ...s,
                  hackersDefeated: s.hackersDefeated + 1,
                }));

                break;
              }
            }

            // If wall died, filter it out
            updatedWalls = updatedWalls.filter((w) => w.hp > 0);

            // If hacker wasn't stopped by a wall and reached base (xPercent <= 6)
            if (!hackerDefeated) {
              if (hackerX <= 7) {
                // Data Base takes damage!
                setDataHp((hp) => {
                  const nextHp = Math.max(0, hp - 34); // 3 hits and game over
                  if (nextHp <= 0) {
                    // Game Over
                    setGameState('GAMEOVER');
                    sounds.playGameOver();
                  } else {
                    sounds.playBaseAlarm();
                    setIsDataGlitch(true);
                    setTimeout(() => setIsDataGlitch(false), 400);
                  }
                  return nextHp;
                });
                addParticle(7, 50, '⚠️ データ破損!', '#ef4444');
                // hacker is spent
              } else {
                nextHackers.push({
                  ...hacker,
                  xPercent: hackerX,
                });
              }
            }
          }

          return updatedWalls;
        });

        return nextHackers;
      });

      animFrameRef.current = requestAnimationFrame(updateGame);
    };

    animFrameRef.current = requestAnimationFrame(updateGame);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState, wave, score, isPaused]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Container restricted to mobile-friendly vertical format while centered on large displays */}
      <div className="w-full max-w-md md:max-w-xl flex-1 flex flex-col bg-slate-900 border-x border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Top Bar Contract (3 zones) */}
        <header className="flex items-center justify-between gap-4 px-4 py-3 bg-slate-900/90 backdrop-blur border-b border-slate-800 shrink-0 z-20">
          <div className="flex items-center gap-2 shrink-0">
            <Shield className="w-5 h-5 text-cyan-400 shrink-0" />
            <h1 className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              最強パスワード防衛戦
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 tabular-nums">
            <span>撃退: <strong className="text-cyan-300 font-bold text-sm">{score}</strong></span>
            <span aria-hidden="true">·</span>
            <span>最高: <strong className="text-amber-300 font-bold">{highScore}</strong></span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {gameState === 'PLAYING' && (
              <button
                onClick={togglePause}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  isPaused
                    ? 'bg-amber-400 text-slate-950 shadow-sm font-bold animate-pulse'
                    : 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700'
                }`}
                title={isPaused ? 'ゲームを再開' : 'ゲームを一時中断'}
                aria-label={isPaused ? 'ゲームを再開' : 'ゲームを一時中断'}
              >
                {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => setShowGuideModal(true)}
              className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
              title="セキュリティ学習ガイド"
              aria-label="セキュリティ学習ガイドを開く"
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              onClick={toggleMute}
              className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
              title={isMuted ? 'サウンドをオン' : 'サウンドをミュート'}
              aria-label={isMuted ? 'サウンドをオン' : 'サウンドをミュート'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </header>

        {/* ====================== MAIN BATTLE VIEW ====================== */}
        {gameState === 'PLAYING' && (
          <main className="flex-1 flex flex-col justify-between overflow-hidden relative">
            
            {/* Top Status & Integrity Bar */}
            <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">データ保全度:</span>
                <div className="w-24 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className={`h-full transition-all duration-300 ${
                      dataHp > 60 ? 'bg-cyan-400' : dataHp > 30 ? 'bg-amber-400' : 'bg-rose-500 animate-pulse'
                    }`}
                    style={{ width: `${dataHp}%` }}
                  />
                </div>
                <span className="tabular-nums font-semibold text-slate-200">{dataHp}%</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <span>脅威度: <span className="text-amber-400 font-bold">Lv.{wave}</span></span>
                <span aria-hidden="true">·</span>
                <span>防壁数: <span className="text-cyan-300 font-bold">{walls.length}/3</span></span>
              </div>
            </div>

            {/* Battlefield Lane (Cyber Corridor) */}
            <div className="relative flex-1 w-full min-h-[220px] max-h-[340px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-y border-cyan-950/40 overflow-hidden flex items-center">
              {/* Cyber Grid Lines */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #06b6d4 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="absolute inset-x-0 h-0.5 bg-cyan-500/20 top-1/2 -translate-y-1/2 pointer-events-none" />

              {/* Slot Indicator Guidelines */}
              {[22, 45, 68].map((pos, idx) => (
                <div
                  key={idx}
                  className="absolute top-2 bottom-2 w-px border-l border-dashed border-cyan-800/30 flex flex-col justify-between items-center pointer-events-none"
                  style={{ left: `${pos}%` }}
                >
                  <span className="text-[10px] text-cyan-600/70 font-mono tracking-tighter -translate-x-1/2">
                    {idx === 0 ? '本陣' : idx === 1 ? '中盤' : '前線'}
                  </span>
                  <span className="text-[10px] text-cyan-600/70 font-mono -translate-x-1/2">
                    {idx + 1}
                  </span>
                </div>
              ))}

              {/* Floating Flying Particles / Combat Text */}
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute font-bold text-xs pointer-events-none transition-all duration-700 animate-bounce z-40 whitespace-nowrap"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    color: p.color,
                    textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                  }}
                >
                  {p.text}
                </div>
              ))}

              {/* Left Edge: 💎 大切なデータ (Important Data Core) */}
              <div 
                className={`absolute left-2 z-10 flex flex-col items-center transition-transform ${
                  isDataGlitch ? 'animate-glitch' : ''
                }`}
              >
                <div className="relative flex items-center justify-center w-12 h-14 bg-cyan-950/80 border-2 border-cyan-400 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <span className="text-2xl select-none" role="img" aria-label="大切なデータ">💎</span>
                  <div className="absolute -bottom-2 px-1 py-0.2 bg-slate-900 border border-cyan-500/50 rounded text-[9px] text-cyan-300 font-mono">
                    DATA
                  </div>
                </div>
                <span className="text-[10px] font-medium text-cyan-400 mt-1">極秘データ</span>
              </div>

              {/* Active Defense Walls */}
              {walls.map((wall) => {
                const posX = wall.slotIndex === 0 ? 22 : wall.slotIndex === 1 ? 45 : 68;
                const hpPercent = Math.max(0, Math.round((wall.hp / wall.maxHp) * 100));

                let tierBorder = 'border-rose-500 bg-rose-950/70 shadow-[0_0_10px_rgba(244,63,94,0.3)]';
                let tierBadge = 'bg-rose-500/20 text-rose-300';
                let wallIcon = '🧱';
                let tierText = '弱 (辞書攻撃脆弱)';

                if (wall.tier === 2) {
                  tierBorder = 'border-amber-500 bg-amber-950/70 shadow-[0_0_12px_rgba(245,158,11,0.3)]';
                  tierBadge = 'bg-amber-500/20 text-amber-300';
                  wallIcon = '🛡️';
                  tierText = '中 (英数複合)';
                } else if (wall.tier === 3) {
                  tierBorder = 'border-emerald-400 bg-emerald-950/80 shadow-[0_0_18px_rgba(16,185,129,0.5)]';
                  tierBadge = 'bg-emerald-500/20 text-emerald-300';
                  wallIcon = '🏰';
                  tierText = '最強 (英数記号)';
                }

                if (wall.isBoosted) {
                  tierBorder = 'border-amber-300 bg-amber-950/80 ring-2 ring-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.7)] animate-pulse';
                }

                return (
                  <div
                    key={wall.id}
                    className={`absolute z-10 -translate-x-1/2 flex flex-col items-center transition-all duration-150 ${
                      wall.flash ? 'scale-110 brightness-150' : 'scale-100'
                    }`}
                    style={{ left: `${posX}%` }}
                  >
                    {/* Boost Badge if active */}
                    {wall.isBoosted && (
                      <div className="mb-0.5 px-1 py-0.2 bg-amber-400 text-slate-950 rounded text-[8px] font-black tracking-tight animate-bounce shadow">
                        ⚡+50% HP
                      </div>
                    )}

                    {/* Password Text Tag above wall */}
                    <div className="mb-1 px-1.5 py-0.5 bg-slate-900/90 border border-slate-700 rounded text-[10px] font-mono text-cyan-200 max-w-[80px] truncate shadow">
                      {wall.passwordText}
                    </div>

                    {/* Wall Body Structure */}
                    <div className={`w-9 h-16 rounded-md border-2 ${tierBorder} flex flex-col justify-between items-center p-1 relative overflow-hidden`}>
                      <span className="text-base select-none">{wallIcon}</span>

                      {/* Internal HP Fill effect */}
                      <div 
                        className="absolute inset-x-0 bottom-0 bg-current opacity-15 pointer-events-none transition-all duration-200"
                        style={{ height: `${hpPercent}%` }}
                      />

                      {/* HP Bar */}
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className={`h-full transition-all duration-200 ${
                            hpPercent > 50 ? 'bg-emerald-400' : hpPercent > 25 ? 'bg-amber-400' : 'bg-rose-500'
                          }`}
                          style={{ width: `${hpPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* HP Numbers */}
                    <span className={`text-[9px] tabular-nums font-mono font-bold mt-1 ${wall.isBoosted ? 'text-amber-300 font-extrabold' : 'text-slate-300'}`}>
                      {wall.hp}HP {wall.isBoosted && '⚡'}
                    </span>
                  </div>
                );
              })}

              {/* Incoming Hackers */}
              {hackers.map((hacker) => (
                <div
                  key={hacker.id}
                  className="absolute z-20 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all"
                  style={{ left: `${hacker.xPercent}%` }}
                >
                  <div className={`relative ${hacker.isBoss ? 'text-3xl' : 'text-xl'}`}>
                    <span className="select-none inline-block animate-pulse">{hacker.emoji}</span>
                  </div>

                  {/* Hacker Type Label */}
                  <span className="text-[9px] font-sans text-rose-300 bg-slate-950/80 px-1 rounded border border-rose-900/50 whitespace-nowrap mt-0.5">
                    {hacker.name}
                  </span>

                  {/* Hacker HP mini bar if damaged */}
                  {hacker.hp < hacker.maxHp && (
                    <div className="w-6 h-1 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                      <div
                        className="h-full bg-rose-500"
                        style={{ width: `${(hacker.hp / hacker.maxHp) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Right Edge: Hacker Spawn Portal */}
              <div className="absolute right-1 top-2 bottom-2 w-7 border-l border-rose-600/40 bg-gradient-to-l from-rose-950/40 to-transparent flex flex-col justify-center items-center pointer-events-none select-none">
                <div className="flex flex-col items-center text-[10px] font-sans font-bold text-rose-400/90 leading-tight tracking-wider">
                  <span>侵</span>
                  <span>入</span>
                  <span>ポ</span>
                  <span>ー</span>
                  <span>タ</span>
                  <span>ル</span>
                </div>
              </div>
            </div>

            {/* Quick Educational Feedback Banner */}
            <div className="px-4 py-1.5 bg-slate-950/80 border-t border-slate-800 text-xs flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-1.5 truncate">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">
                  {walls.length === 0 ? (
                    <strong className="text-rose-400">⚠️ 防壁がありません！今すぐ設置してください！</strong>
                  ) : walls.some((w) => w.tier === 3) ? (
                    <span className="text-emerald-300">🛡️ 最強防壁が稼働中！総当たり攻撃を完全防御中！</span>
                  ) : walls.some((w) => w.tier === 1) ? (
                    <span className="text-amber-300">💡 単語のみの壁は辞書攻撃で簡単に突破されます！</span>
                  ) : (
                    <span>記号・数字・単語の3つをすべて組み合わせると最強の壁になります！</span>
                  )}
                </span>
              </div>
            </div>

            {/* Last Resort: Emergency Defense Boost Capability */}
            <div className="px-4 py-2 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between gap-3">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <Flame className={`w-4 h-4 shrink-0 ${boostActive ? 'text-amber-400 animate-bounce' : 'text-rose-400'}`} />
                  <span className="text-xs font-bold text-slate-200">緊急過負荷ブースト</span>
                  {boostActive ? (
                    <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded text-[10px] font-mono animate-pulse font-bold">
                      +50% 稼働中 ({boostDuration.toFixed(1)}s)
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">
                      (最後の切り札)
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">
                  全防壁のHPを5秒間+50%一時ブースト（CT: 25秒）
                </span>
              </div>

              <button
                type="button"
                onClick={handleEmergencyBoost}
                disabled={boostActive || boostCooldown > 0 || walls.length === 0}
                className={`relative px-3.5 py-2 rounded-xl font-bold text-xs tracking-tight transition-all shrink-0 flex items-center gap-1.5 shadow-md overflow-hidden ${
                  boostActive
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.6)] animate-pulse cursor-default'
                    : boostCooldown > 0
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : walls.length === 0
                    ? 'bg-slate-800/80 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 bg-[length:200%_auto] hover:bg-right text-slate-950 border border-amber-300 hover:brightness-110 active:scale-95 shadow-amber-900/30 cursor-pointer'
                }`}
                title={
                  walls.length === 0
                    ? '防壁が設置されていません'
                    : boostCooldown > 0
                    ? `再装填中 (残り${Math.ceil(boostCooldown)}秒)`
                    : '全防壁のHPを5秒間50%増強'
                }
              >
                {/* Cooldown progress overlay */}
                {boostCooldown > 0 && !boostActive && (
                  <div
                    className="absolute inset-y-0 left-0 bg-slate-900/70 pointer-events-none transition-all"
                    style={{ width: `${(boostCooldown / 25) * 100}%` }}
                  />
                )}
                
                <span className="relative z-10 text-sm">
                  {boostActive ? '⚡' : boostCooldown > 0 ? '⏳' : '🚨'}
                </span>
                <span className="relative z-10 whitespace-nowrap">
                  {boostActive
                    ? `${boostDuration.toFixed(1)}s`
                    : boostCooldown > 0
                    ? `冷却中 ${Math.ceil(boostCooldown)}s`
                    : walls.length === 0
                    ? '防壁なし'
                    : 'HP 50%過負荷'}
                </span>
              </button>
            </div>

            {/* ================= BUILDER / WORKBENCH SECTION ================= */}
            <section className="bg-slate-900 border-t border-slate-800 p-4 flex flex-col gap-3 shrink-0">
              
              {/* Header with Mode Switcher (BLOCKS vs CUSTOM) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setBuilderMode('BLOCKS');
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                      builderMode === 'BLOCKS'
                        ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>ブロック合成</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setBuilderMode('CUSTOM');
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                      builderMode === 'CUSTOM'
                        ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Keyboard className="w-3.5 h-3.5" />
                    <span>自由入力</span>
                  </button>
                </div>

                {builderMode === 'BLOCKS' ? (
                  <button
                    onClick={randomizeTokens}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors"
                    title="サンプル要素をシャッフル"
                  >
                    <Dice5 className="w-3.5 h-3.5" />
                    <span>単語シャッフル</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setCustomInputText('');
                    }}
                    className="text-[11px] text-slate-400 hover:text-rose-300 transition-colors"
                  >
                    クリア
                  </button>
                )}
              </div>

              {/* MODE 1: BLOCKS BUILDER (Original 3-Block Composer) */}
              {builderMode === 'BLOCKS' && (
                <>
                  {/* 3 Block Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* 1. Words */}
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setHasWordSelected((prev) => !prev);
                      }}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-lg border-2 transition-all cursor-pointer ${
                        hasWordSelected
                          ? 'bg-blue-950/60 border-blue-400 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-sm">🔤</span>
                        <span className="text-xs font-bold">単語</span>
                      </div>
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-950/80 text-blue-300">
                        "{currentWord}"
                      </span>
                      <span className="text-[9px] text-slate-400 mt-1">
                        {hasWordSelected ? '選択中 ✓' : 'タップで選択'}
                      </span>
                    </button>

                    {/* 2. Numbers */}
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setHasNumberSelected((prev) => !prev);
                      }}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-lg border-2 transition-all cursor-pointer ${
                        hasNumberSelected
                          ? 'bg-amber-950/60 border-amber-400 text-white shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-sm">🔢</span>
                        <span className="text-xs font-bold">数字</span>
                      </div>
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-300">
                        "{currentNumber}"
                      </span>
                      <span className="text-[9px] text-slate-400 mt-1">
                        {hasNumberSelected ? '選択中 ✓' : 'タップで選択'}
                      </span>
                    </button>

                    {/* 3. Symbols */}
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setHasSymbolSelected((prev) => !prev);
                      }}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-lg border-2 transition-all cursor-pointer ${
                        hasSymbolSelected
                          ? 'bg-purple-950/60 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-sm">🔣</span>
                        <span className="text-xs font-bold">記号</span>
                      </div>
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-950/80 text-purple-300">
                        "{currentSymbol}"
                      </span>
                      <span className="text-[9px] text-slate-400 mt-1">
                        {hasSymbolSelected ? '選択中 ✓' : 'タップで選択'}
                      </span>
                    </button>
                  </div>

                  {/* Password Preview & Strength Meter */}
                  <div className={`p-2.5 rounded-lg border ${currentTierInfo.border} ${currentTierInfo.bg} flex flex-col gap-1.5`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">作成パスワード:</span>
                      <span className="font-mono font-bold text-sm text-cyan-200 tracking-wider">
                        {composedPassword ? `"${composedPassword}"` : '(未選択)'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-700/50">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">推定解読時間:</span>
                        <strong className={currentTierInfo.color}>{currentTierInfo.crackTime}</strong>
                      </div>
                      <span className={`text-xs font-bold ${currentTierInfo.color}`}>
                        HP: {currentTierInfo.hp} ({currentTierInfo.label})
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* MODE 2: CUSTOM INPUT MODE (User types custom password) */}
              {builderMode === 'CUSTOM' && (
                <div className="flex flex-col gap-2.5">
                  {/* Text Input Field */}
                  <div className="relative">
                    <input
                      type="text"
                      value={customInputText}
                      onChange={(e) => setCustomInputText(e.target.value)}
                      placeholder="パスワードを入力 (例: P@ss2026!, Sakura#99)"
                      maxLength={28}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-cyan-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                    {customInputText && (
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono">
                        {customInputText.length}文字
                      </span>
                    )}
                  </div>

                  {/* Real-time Component Detection Chips */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
                    <span className={`font-mono ${customAnalysis.hasLower ? 'text-emerald-300 font-bold' : 'text-slate-600'}`}>
                      {customAnalysis.hasLower ? '✓' : '·'} 英小
                    </span>
                    <span className={`font-mono ${customAnalysis.hasUpper ? 'text-emerald-300 font-bold' : 'text-slate-600'}`}>
                      {customAnalysis.hasUpper ? '✓' : '·'} 英大
                    </span>
                    <span className={`font-mono ${customAnalysis.hasNumber ? 'text-emerald-300 font-bold' : 'text-slate-600'}`}>
                      {customAnalysis.hasNumber ? '✓' : '·'} 数字
                    </span>
                    <span className={`font-mono ${customAnalysis.hasSymbol ? 'text-emerald-300 font-bold' : 'text-slate-600'}`}>
                      {customAnalysis.hasSymbol ? '✓' : '·'} 記号
                    </span>
                    <span className={`font-mono ${customAnalysis.length >= 12 ? 'text-emerald-300 font-bold' : 'text-slate-600'}`}>
                      {customAnalysis.length >= 12 ? '✓' : '·'} 12文字+
                    </span>
                  </div>

                  {/* Custom Password Analysis Card */}
                  <div className={`p-2.5 rounded-lg border ${customAnalysis.border} ${customAnalysis.bg} flex flex-col gap-1`}>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">強度判定:</span>
                        <strong className={customAnalysis.color}>{customAnalysis.strengthLabel}</strong>
                      </div>
                      <span className={`text-xs font-bold ${customAnalysis.color}`}>
                        {customAnalysis.hp > 0 ? `防壁HP: ${customAnalysis.hp}` : 'HP: ---'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-700/50">
                      <span className="text-slate-400">解読予測時間:</span>
                      <strong className={customAnalysis.color}>{customAnalysis.crackTime}</strong>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-tight pt-0.5">
                      💡 {customAnalysis.advice}
                    </p>
                  </div>

                  {/* Inspiration preset pills */}
                  <div className="flex items-center gap-1 overflow-x-auto text-[10px] pt-0.5">
                    <span className="text-slate-500 whitespace-nowrap">お手本:</span>
                    <button
                      type="button"
                      onClick={() => setCustomInputText('admin')}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-rose-300 whitespace-nowrap cursor-pointer"
                    >
                      脆弱: admin
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomInputText('ninja2026')}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 whitespace-nowrap cursor-pointer"
                    >
                      普通: ninja2026
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomInputText('Cyber#777!')}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 whitespace-nowrap cursor-pointer"
                    >
                      強固: Cyber#777!
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomInputText('S@kura_Super2026!')}
                      className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-600/40 text-emerald-200 font-bold whitespace-nowrap cursor-pointer"
                    >
                      伝説: S@kura_Super2026!
                    </button>
                  </div>
                </div>
              )}

              {/* Big tactile DEPLOY Button (Adapts to Active Mode) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={handleDeployWall}
                  disabled={
                    deployCooldown > 0 ||
                    (builderMode === 'BLOCKS' && activeTypesCount === 0) ||
                    (builderMode === 'CUSTOM' && customAnalysis.hp === 0)
                  }
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg relative overflow-hidden ${
                    (builderMode === 'BLOCKS' && activeTypesCount === 0) ||
                    (builderMode === 'CUSTOM' && customAnalysis.hp === 0)
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : (builderMode === 'BLOCKS' ? currentTier === 3 : customAnalysis.tier === 3)
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:brightness-110 shadow-emerald-950/50 active:scale-[0.98]'
                      : (builderMode === 'BLOCKS' ? currentTier === 2 : customAnalysis.tier === 2)
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 hover:brightness-110 active:scale-[0.98]'
                      : 'bg-gradient-to-r from-rose-700 to-rose-600 text-white hover:brightness-110 active:scale-[0.98]'
                  }`}
                >
                  {/* Cooldown progress overlay */}
                  {deployCooldown > 0 && (
                    <div 
                      className="absolute inset-y-0 left-0 bg-slate-950/60 pointer-events-none transition-all duration-75"
                      style={{ width: `${deployCooldown}%` }}
                    />
                  )}

                  <span className="text-lg">🧱</span>
                  <span className="relative z-10">
                    {deployCooldown > 0
                      ? '防壁チャージ中...'
                      : builderMode === 'BLOCKS'
                      ? activeTypesCount === 0
                        ? 'ブロックを選択してください'
                        : currentTier === 3
                        ? '🏰 最強の防壁を設置する（HP 260）'
                        : currentTier === 2
                        ? '🛡️ 普通の防壁を設置する（HP 95）'
                        : '🧱 弱い防壁を設置する（HP 35）'
                      : customAnalysis.hp === 0
                      ? 'パスワードを入力してください'
                      : `🧱 カスタム防壁を設置する（HP ${customAnalysis.hp}）`}
                  </span>
                </button>
              </div>

              {/* Quick Preset Buttons (Shown in BLOCKS mode) */}
              {builderMode === 'BLOCKS' && (
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="text-[11px]">クイック選択:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setHasWordSelected(true);
                        setHasNumberSelected(false);
                        setHasSymbolSelected(false);
                      }}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-rose-300 cursor-pointer"
                    >
                      1種 (弱)
                    </button>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setHasWordSelected(true);
                        setHasNumberSelected(true);
                        setHasSymbolSelected(false);
                      }}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-amber-300 cursor-pointer"
                    >
                      2種 (中)
                    </button>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setHasWordSelected(true);
                        setHasNumberSelected(true);
                        setHasSymbolSelected(true);
                      }}
                      className="px-2 py-1 bg-emerald-950/70 border border-emerald-500/50 hover:bg-emerald-900/80 rounded text-[11px] text-emerald-300 font-bold cursor-pointer"
                    >
                      3種すべて (最強)
                    </button>
                  </div>
                </div>
              )}
            </section>
          </main>
        )}

        {/* ====================== TITLE MENU ====================== */}
        {gameState === 'TITLE' && (
          <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
            <div className="flex flex-col items-center text-center mt-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border-2 border-cyan-400 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                <span className="text-4xl" role="img" aria-label="防衛シールド">🛡️</span>
              </div>

              <h2 className="text-2xl font-black text-white tracking-tight mb-2">
                最強パスワード防衛戦
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mb-6">
                迫りくる悪質ハッカーたちから大切なデータを守れ！
                パスワードの要素を組み合わせて強固な防衛壁を構築するセキュリティ学習ゲーム。
              </p>

              {/* Rules / Mechanics Highlights */}
              <div className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-left flex flex-col gap-3 mb-6">
                <h3 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  防壁メカニクスとパスワード強度
                </h3>

                <div className="flex items-start gap-2 text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 shrink-0 font-mono">1種のみ</span>
                  <span className="text-slate-300">
                    <strong>弱い壁 (HP小)</strong>：単語だけ。辞書攻撃で瞬時に突破されます。
                  </span>
                </div>

                <div className="flex items-start gap-2 text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 shrink-0 font-mono">2種複合</span>
                  <span className="text-slate-300">
                    <strong>普通の壁 (HP中)</strong>：単語＋数字など。ある程度持ちこたえます。
                  </span>
                </div>

                <div className="flex items-start gap-2 text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0 font-mono">3種すべて</span>
                  <span className="text-slate-300">
                    <strong>最強の壁 (HP大)</strong>：英単語＋数字＋記号！総当たり攻撃を完全に弾き返す鉄壁！
                  </span>
                </div>

                <div className="flex items-start gap-2 text-xs pt-1 border-t border-slate-800/80">
                  <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 shrink-0 font-mono">最後の切り札</span>
                  <span className="text-slate-300">
                    <strong>🚨 緊急過負荷ブースト</strong>：全防壁のHPを5秒間+50%強化（CT: 25秒）
                  </span>
                </div>
              </div>

              {/* Highest Score Record */}
              {highScore > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300 mb-4">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>自己ベスト撃退記録: <strong className="tabular-nums font-bold text-white">{highScore}</strong> 体</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pb-4">
              <button
                type="button"
                onClick={startGame}
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base rounded-xl shadow-lg shadow-cyan-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>防衛戦を開始する</span>
              </button>

              <button
                type="button"
                onClick={() => setShowGuideModal(true)}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>セキュリティ豆知識 & 解読時間シミュレーター</span>
              </button>
            </div>
          </div>
        )}

        {/* ====================== GAME OVER SUMMARY ====================== */}
        {gameState === 'GAMEOVER' && (
          <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 bg-rose-500/10 border-2 border-rose-500 rounded-2xl flex items-center justify-center mb-3">
                <ShieldAlert className="w-8 h-8 text-rose-500" />
              </div>

              <h2 className="text-xl font-black text-rose-400 tracking-tight mb-1">
                データ突破！ゲームオーバー
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                ハッカーが防壁を突破し、極秘データが漏洩してしまいました！
              </p>

              {/* Score Box */}
              <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 mb-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs text-slate-400">撃退したハッカー</span>
                  <span className="text-2xl font-black text-cyan-400 tabular-nums">{score} 体</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">到達脅威度 (Wave)</span>
                  <span className="font-bold text-amber-300">Level {wave}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">設置した防壁の数</span>
                  <span className="font-mono text-slate-200">{stats.wallsBuilt} 個</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">最強壁 (3種複合) 構築</span>
                  <span className="font-bold text-emerald-400">{stats.tier3Built} 回</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">緊急過負荷ブースト使用</span>
                  <span className="font-bold text-amber-400">{stats.emergencyBoostsUsed} 回</span>
                </div>
              </div>

              {/* Educational Assessment Advice */}
              <div className="w-full bg-slate-900 border border-cyan-900/40 rounded-xl p-3.5 text-left text-xs mb-4">
                <div className="flex items-center gap-1.5 font-bold text-cyan-300 mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>セキュリティアドバイザーの診断</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {stats.tier3Built === 0
                    ? '⚠️ 最強の壁（単語＋数字＋記号の3種複合）を一度も作成していませんでした！1種や2種のパスワードは攻撃者にすぐ破られてしまいます。次回は必ず3種類組み合わせて設置しましょう！'
                    : stats.tier1Built > stats.tier3Built
                    ? '💡 単語だけの弱い壁が多く配置されていました。文字数を増やし、記号を取り入れることで解読時間を数億倍に引き延ばすことができます！'
                    : '🎉 素晴らしい防壁構成です！英数記号の複合壁はブルートフォース攻撃を完璧に防御できました。実際の生活でもこの組み合わせを実践しましょう！'}
                </p>
              </div>
            </div>

            {/* Replay Button */}
            <div className="flex flex-col gap-2 pb-2">
              <button
                type="button"
                onClick={startGame}
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>もう一度挑戦する（リセット）</span>
              </button>
              <button
                type="button"
                onClick={() => setGameState('TITLE')}
                className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                タイトル画面へ戻る
              </button>
            </div>
          </div>
        )}

        {/* ====================== PAUSE MODAL ====================== */}
        {isPaused && gameState === 'PLAYING' && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xs sm:max-w-sm w-full p-6 flex flex-col items-center text-center shadow-2xl">
              <div className="w-14 h-14 bg-cyan-500/10 border-2 border-cyan-400 rounded-2xl flex items-center justify-center mb-3">
                <Pause className="w-7 h-7 text-cyan-400" />
              </div>

              <h3 className="text-xl font-black text-white tracking-tight mb-1">
                一時中断中
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                ゲーム進行を停止しています。
              </p>

              {/* Status summary */}
              <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 text-xs mb-5 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">撃退したハッカー</span>
                  <span className="font-bold text-cyan-400 tabular-nums">{score} 体</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">現在の脅威度</span>
                  <span className="font-bold text-amber-300">Level {wave}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">データ保全度</span>
                  <span className="font-bold text-slate-200 tabular-nums">{dataHp}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">防壁の数</span>
                  <span className="font-bold text-emerald-400">{walls.length} / 3</span>
                </div>
              </div>

              {/* Actions */}
              <div className="w-full flex flex-col gap-2">
                <button
                  type="button"
                  onClick={togglePause}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>ゲームを再開する</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowGuideModal(true)}
                  className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>セキュリティ学習帳を開く</span>
                </button>

                <button
                  type="button"
                  onClick={startGame}
                  className="w-full py-2 text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center justify-center gap-1 cursor-pointer pt-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>最初からやり直す（リセット）</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ====================== SECURITY GUIDE MODAL ====================== */}
        {showGuideModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-sm text-white">パスワード・セキュリティ学習帳</h3>
                </div>
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto space-y-4 text-xs text-slate-300">
                {/* Section 1 */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <h4 className="font-bold text-rose-400 flex items-center gap-1.5 mb-1 text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    なぜ「単語だけ」は危険なのか？
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    ハッカーは「辞書攻撃（Dictionary Attack）」と呼ばれる手法を用います。辞書に載っている単語やよく使われるパスワード（例: password, admin, dragon）を毎秒数十億回自動入力するため、単語のみだと一瞬（0.001秒）で破られてしまいます。
                  </p>
                </div>

                {/* Section 2 */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <h4 className="font-bold text-amber-400 flex items-center gap-1.5 mb-1 text-xs">
                    <Zap className="w-4 h-4 shrink-0" />
                    なぜ「数字を足すだけ」でも不十分なのか？
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    「dog123」や「tokyo2026」のように末尾に数字を足すパターンは、攻撃ツール側も既に対策済みです。辞書攻撃の派生ルールで数時間以内に解読されるリスクがあります。
                  </p>
                </div>

                {/* Section 3 */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <h4 className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1 text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    「単語＋数字＋記号」で最強になる理由
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    記号（! @ # $ % など）を混ぜると、試行すべき文字の組み合わせ数が指数関数的に跳ね上がります。12文字以上かつ英数記号を組み合わせると、最新のスーパーコンピューターでも解読に数千年〜数億年かかります！
                  </p>
                </div>

                {/* Comparison Table */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <h4 className="font-bold text-cyan-400 mb-2 text-xs">
                    コンピューターによる解読推定時間の比較
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="text-rose-400 font-bold block">小文字のみ 8文字</span>
                      <span className="text-slate-400">解読時間: <strong>瞬時（0.02秒）</strong></span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="text-amber-400 font-bold block">英字＋数字 8文字</span>
                      <span className="text-slate-400">解読時間: <strong>約22分</strong></span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="text-emerald-400 font-bold block">英数記号 8文字</span>
                      <span className="text-slate-400">解読時間: <strong>約8時間</strong></span>
                    </div>
                    <div className="p-2 bg-emerald-950/40 rounded border border-emerald-500/50">
                      <span className="text-emerald-300 font-bold block">英数記号 12文字以上</span>
                      <span className="text-emerald-200">解読時間: <strong>約3,000年以上！</strong></span>
                    </div>
                  </div>
                </div>

                {/* Security Tips */}
                <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-lg text-[11px] space-y-1">
                  <p className="font-bold text-cyan-300">💡 実生活で守るべき3つのセキュリティ原則</p>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                    <li>同じパスワードを複数のサービスで使い回さない</li>
                    <li>推測されにくい12文字以上のフレーズを設定する</li>
                    <li>二段階認証（2FA / パスキー）を必ず有効にする</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 border-t border-slate-800 bg-slate-950">
                <button
                  type="button"
                  onClick={() => setShowGuideModal(false)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold text-xs"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
