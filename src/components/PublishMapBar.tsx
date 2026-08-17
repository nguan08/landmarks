import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { publishMapData } from '@/data/publishedMap';
import type { FestivalPoint } from '@/data/festivalPoints';

interface PublishMapBarProps {
  points?: FestivalPoint[];
  zones?: any[];
}

export function PublishMapBar({ points, zones }: PublishMapBarProps) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  const handlePublish = async () => {
    if (busy) return;
    setBusy(true);
    setStatus('กำลังเผยแพร่...');
    try {
      const result = await publishMapData({ points, zones });
      setStatus(
        result.mode === 'dev'
          ? 'บันทึกข้อมูลจากเครื่องนี้แล้ว บอกให้ช่วยอัพขึ้นเว็บได้เลย'
          : 'คัดลอกข้อมูลแล้ว วางส่งมาเพื่อให้อัพขึ้นเว็บ'
      );
    } catch {
      setStatus('เผยแพร่ไม่สำเร็จ ลองรีเฟรชหน้า localhost แล้วกดอีกครั้ง');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-400/30">
      <button
        type="button"
        onClick={handlePublish}
        disabled={busy}
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold text-xs font-mono-code shadow-[0_0_16px_rgba(52,211,153,0.35)] active:scale-95 transition-all cursor-pointer disabled:opacity-60"
      >
        <Upload className="w-3.5 h-3.5" />
        <span>{busy ? 'กำลังบันทึก...' : 'เผยแพร่ขึ้นเว็บจริง'}</span>
      </button>
      <span className="text-[11px] font-mono-code text-emerald-200">
        {status || 'กดเพื่อส่งจุด pin และชื่อห้องจากเครื่องนี้ขึ้นเว็บทุกคน'}
      </span>
    </div>
  );
}

export default PublishMapBar;
