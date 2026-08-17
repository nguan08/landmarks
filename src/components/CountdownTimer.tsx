import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Clock, Flame } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function CountdownTimer() {
  const getTargetDate = () => {
    const now = new Date();
    // 21st of current month at 19:00:00
    const target = new Date(now.getFullYear(), now.getMonth(), 21, 19, 0, 0);
    
    // If the 21st at 19:00 has already passed this month, target next month's 21st
    if (now.getTime() > target.getTime()) {
      return new Date(now.getFullYear(), now.getMonth() + 1, 21, 19, 0, 0);
    }
    return target;
  };

  const [targetDate] = useState<Date>(getTargetDate());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const monthNamesThai = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const targetDateFormatted = `21 ${monthNamesThai[targetDate.getMonth()]} เวลา 19:00 น.`;

  const timeUnits = [
    { labelTh: 'วัน', labelEn: 'DAYS', value: timeLeft.days, color: 'from-cyan-400 to-blue-500', glow: 'shadow-[0_0_25px_rgba(0,240,255,0.4)]' },
    { labelTh: 'ชั่วโมง', labelEn: 'HOURS', value: timeLeft.hours, color: 'from-purple-400 to-pink-500', glow: 'shadow-[0_0_25px_rgba(168,85,247,0.4)]' },
    { labelTh: 'นาที', labelEn: 'MINUTES', value: timeLeft.minutes, color: 'from-pink-400 to-rose-500', glow: 'shadow-[0_0_25px_rgba(255,46,147,0.4)]' },
    { labelTh: 'วินาที', labelEn: 'SECONDS', value: timeLeft.seconds, color: 'from-amber-400 to-orange-500', glow: 'shadow-[0_0_25px_rgba(255,176,32,0.4)]' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      
      {/* Date Header Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-mono-code mb-6 shadow-lg shadow-cyan-500/10">
        <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="font-semibold tracking-wide">นับถอยหลังสู่การเปิดม่าน: {targetDateFormatted}</span>
      </div>

      {/* Countdown Digits Grid */}
      {timeLeft.isExpired ? (
        <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/50 backdrop-blur-2xl text-center space-y-3 animate-pulse">
          <div className="text-3xl sm:text-5xl font-black font-heading text-white">
            🎉 THE FESTIVAL IS LIVE NOW!
          </div>
          <p className="text-cyan-300 font-mono-code text-sm">
            งาน Buriram Night & Glow กำลังจัดแสดงอยู่ ณ ขณะนี้ ยินดีต้อนรับทุกท่านสู่ค่ำคืนแห่งแสงไฟ!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full px-2">
          {timeUnits.map((unit) => (
            <div
              key={unit.labelEn}
              className={`relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-white/15 hover:border-cyan-400/60 transition-all duration-300 group ${unit.glow}`}
            >
              {/* Top ambient glow line */}
              <div className={`absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r ${unit.color}`} />

              {/* Number with smooth gradient & drop shadow */}
              <span className={`text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight bg-gradient-to-b ${unit.color} bg-clip-text text-transparent select-none tabular-nums`}>
                {String(unit.value).padStart(2, '0')}
              </span>

              {/* Label in Thai and English */}
              <div className="flex items-center gap-1.5 mt-2 text-slate-300 font-mono-code text-[11px] sm:text-xs uppercase tracking-wider">
                <span className="font-bold text-white">{unit.labelTh}</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-400">{unit.labelEn}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
