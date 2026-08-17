import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lock, Unlock, KeyRound, X, Check, ShieldCheck, LogOut } from 'lucide-react';

interface AdminAuthContextType {
  isAdmin: boolean;
  openLoginModal: () => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdmin: false,
  openLoginModal: () => {},
  logout: () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('thani_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const openLoginModal = () => {
    setPasscode('');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const logout = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem('thani_admin_auth');
    } catch {}
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === '5555555555') {
      setIsAdmin(true);
      try {
        sessionStorage.setItem('thani_admin_auth', 'true');
      } catch {}
      setIsModalOpen(false);
      setPasscode('');
      setErrorMsg('');
    } else {
      setErrorMsg('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, openLoginModal, logout }}>
      {children}

      {/* 🔐 Admin Passcode Login Modal 🔐 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-md bg-zinc-950/95 rounded-3xl border border-amber-500/30 p-6 sm:p-7 shadow-[0_0_50px_rgba(255,176,32,0.25)] text-slate-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Glow */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300 rounded-t-3xl shadow-[0_0_20px_#FFB020]" />

            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-white">
                    เข้าสู่ระบบผู้ดูแล (Admin Login)
                  </h3>
                  <p className="text-xs font-mono-code text-slate-400">
                    จัดการผังห้องจัดแสดง & ข้อมูลแผนที่
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono-code text-slate-300 block mb-2 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>กรอกรหัสผ่านเพื่อเข้าสู่โหมดแก้ไข:</span>
                </label>
                <input
                  type="password"
                  autoFocus
                  placeholder="กรอกรหัสผ่าน 10 หลัก..."
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full px-4 py-3 rounded-2xl bg-black/70 border border-white/[0.15] text-center text-lg font-mono-code tracking-widest text-white focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                />
                {errorMsg && (
                  <p className="text-xs font-mono-code text-rose-400 mt-2 text-center animate-shake">
                    {errorMsg}
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.10] text-slate-300 hover:text-white text-xs font-mono-code active:scale-95 transition-all cursor-pointer"
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-extrabold text-xs font-mono-code flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,176,32,0.4)] active:scale-95 transition-all cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>เข้าสู่ระบบ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminAuthContext.Provider>
  );
}
