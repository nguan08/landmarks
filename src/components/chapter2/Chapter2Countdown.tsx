import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Zap, Flame } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLiveNow: boolean;
  isConcluded: boolean;
}

export function Chapter2Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLiveNow: false,
    isConcluded: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Festival Range: 9 Nov 18:30 to 18 Nov 22:00
      const festivalStart = new Date(currentYear, 10, 9, 18, 30, 0); // Month is 0-indexed, 10 = Nov
      const festivalEnd = new Date(currentYear, 10, 18, 22, 0, 0);

      const currentTime = now.getTime();
      const startTime = festivalStart.getTime();
      const endTime = festivalEnd.getTime();

      // Check if current moment falls into the daily exhibition hours (18:30 - 22:00) during festival dates
      const currentMonth = now.getMonth();
      const currentDate = now.getDate();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeDecimal = currentHours + currentMinutes / 60;

      const isFestivalDate = currentMonth === 10 && currentDate >= 9 && currentDate <= 18;
      const isDailyLiveHours = currentTimeDecimal >= 18.5 && currentTimeDecimal <= 22.0;

      if (currentTime > endTime) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLiveNow: false,
          isConcluded: true,
        });
        return;
      }

      if (isFestivalDate && isDailyLiveHours) {
        // Event is actively live right now!
        const tonightEnd = new Date(currentYear, currentMonth, currentDate, 22, 0, 0);
        const diff = tonightEnd.getTime() - currentTime;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({
          days: 0,
          hours,
          minutes,
          seconds,
          isLiveNow: true,
          isConcluded: false,
        });
        return;
      }

      // Determine next upcoming opening time
      let nextTarget: Date;
      if (currentTime < startTime) {
        nextTarget = festivalStart;
      } else {
        // Today before 18:30, or tomorrow 18:30
        if (currentTimeDecimal < 18.5 && isFestivalDate) {
          nextTarget = new Date(currentYear, currentMonth, currentDate, 18, 30, 0);
        } else {
          nextTarget = new Date(currentYear, currentMonth, currentDate + 1, 18, 30, 0);
        }
      }

      const diff = Math.max(nextTarget.getTime() - currentTime, 0);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isLiveNow: false,
        isConcluded: false,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { labelTh: 'วัน', labelEn: 'DAYS', value: timeLeft.days, color: 'from-rose-500 to-pink-500' },
    { labelTh: 'ชั่วโมง', labelEn: 'HOURS', value: timeLeft.hours, color: 'from-pink-500 to-amber-500' },
    { labelTh: 'นาที', labelEn: 'MINUTES', value: timeLeft.minutes, color: 'from-amber-400 to-orange-500' },
    { labelTh: 'วินาที', labelEn: 'SECONDS', value: timeLeft.seconds, color: 'from-orange-400 to-rose-400' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center select-none">
      
      {/* Header Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-mono-code mb-5 shadow-[0_0_20px_rgba(255,51,102,0.2)]">
        {timeLeft.isLiveNow ? (
          <>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
            <span className="font-bold tracking-wider text-rose-200">
              ⚡ LIVE NOW: ประตูมิติเปิดแล้ว (จัดแสดงถึง 22:00 น.)
            </span>
          </>
        ) : (
          <>
            <Clock className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="font-semibold tracking-wide">
              นับถอยหลังสู่รอบการแสดง: 9–18 พฤศจิกายน (18.30–22.00 น.)
            </span>
          </>
        )}
      </div>

      {/* Countdown Digits Grid */}
      {timeLeft.isLiveNow ? (
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-amber-950/40 border border-rose-500/50 backdrop-blur-2xl text-center space-y-3 shadow-[0_0_40px_rgba(255,51,102,0.25)]">
          <div className="flex items-center justify-center gap-2 text-rose-300 font-mono-code text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-rose-400 animate-bounce" />
            <span>EXHIBITION IN PROGRESS</span>
            <Sparkles className="w-4 h-4 text-rose-400 animate-bounce" />
          </div>
          <div className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-wide">
            THE STACK LIGHT EXHIBITION
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-mono-code max-w-lg mx-auto">
            กำลังเปิดแสดงอยู่ ณ ขณะนี้ @งานงิ้ว ภายในมูลนิธิสว่างจรรยาธรรมสถาน เข้าชมฟรีตลอดงาน! (คืนนี้เหลือเวลาอีก {timeLeft.hours} ชม. {timeLeft.minutes} นาที)
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
          {timeUnits.map((unit) => (
            <div
              key={unit.labelEn}
              className="relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 hover:border-rose-500/50 transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            >
              {/* Top ambient color bar */}
              <div className={`absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r ${unit.color}`} />

              {/* Number */}
              <span className={`text-3xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight bg-gradient-to-b ${unit.color} bg-clip-text text-transparent tabular-nums`}>
                {String(unit.value).padStart(2, '0')}
              </span>

              {/* Label */}
              <div className="flex items-center gap-1.5 mt-1.5 text-slate-400 font-mono-code text-[10px] sm:text-xs uppercase tracking-wider">
                <span className="font-bold text-white">{unit.labelTh}</span>
                <span className="text-slate-600">/</span>
                <span>{unit.labelEn}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
