import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function NoticePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const STORAGE_KEY = 'notice_popup_hide_until';

    useEffect(() => {
        const hideUntil = localStorage.getItem(STORAGE_KEY);
        const now = new Date().getTime();

        if (!hideUntil || now > parseInt(hideUntil)) {
            // Show popup with a short delay for better UX
            const timer = setTimeout(() => setIsOpen(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => setIsOpen(false);

    const hideFor7Days = () => {
        const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
        const expiry = new Date().getTime() + sevenDaysInMs;
        localStorage.setItem(STORAGE_KEY, expiry.toString());
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="absolute inset-x-0 top-10 z-[100] flex items-start justify-center p-4 animate-in fade-in duration-500 pointer-events-none">
            <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-lg w-full overflow-hidden animate-in zoom-in-95 slide-in-from-top-10 duration-500 pointer-events-auto">
                {/* Close Button (Top Corner) */}
                <button
                    onClick={closePopup}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Poster Content */}
                <a
                    href="https://blog.naver.com/eaglescience/224158885650"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative"
                >
                    <img
                        src="/notice-poster.png"
                        alt="Notice Poster"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/600x800?text=Notice+Poster+Missing';
                        }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </a>

                {/* Action Bar */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-t border-slate-800">
                    <button
                        onClick={hideFor7Days}
                        className="text-xs md:text-sm font-medium hover:text-blue-400 transition-colors flex items-center gap-2"
                    >
                        <span className="w-4 h-4 border border-white/30 rounded flex items-center justify-center text-[10px]">✓</span>
                        7일간 보지 않기
                    </button>
                    <button
                        onClick={closePopup}
                        className="text-xs md:text-sm font-bold hover:text-slate-300 transition-colors px-4 py-1"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
