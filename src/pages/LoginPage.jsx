import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [loginProvider, setLoginProvider] = useState(null);
    const from = location.state?.from?.pathname || location.state?.from || "/";

    const handleLogin = (provider) => {
        setIsLoading(true);
        setLoginProvider(provider);

        // --- PRODUCTION INTEGRATION STEPS ---
        // 1. Redirect to Provider's OAuth URL
        // Example (Google): `window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&..."`
        // 2. Handle callback on a specific route
        // ------------------------------------

        // Simulation: Mimic a network delay/redirect
        setTimeout(() => {
            // Mock login: Save a token or user status to localStorage
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userProvider', provider);

            // Directly navigate to the 'from' location to ensure a full refresh
            window.location.href = from;
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 relative">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-[#1e3a8a] animate-spin mb-4" />
                    <p className="text-[#1e3a8a] font-bold text-lg">
                        {loginProvider === 'google' && 'Google'}
                        {loginProvider === 'kakao' && '카카오'}
                        {loginProvider === 'naver' && '네이버'}
                        계정으로 로그인 중...
                    </p>
                </div>
            )}

            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1e3a8a] text-white rounded-full mb-4 shadow-lg">
                        <LogIn size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">독수리수학 로그인</h2>
                    <p className="text-slate-500 mt-2 font-medium">학습자료실 이용을 위해 로그인해주세요.</p>
                </div>

                <div className="space-y-4">
                    {/* Google Login */}
                    <button
                        onClick={() => handleLogin('google')}
                        disabled={isLoading}
                        className="w-full h-14 flex items-center justify-center px-6 border border-slate-200 rounded-lg bg-white text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm group disabled:opacity-50"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
                        Google로 로그인
                    </button>

                    {/* Kakao Login */}
                    <button
                        onClick={() => handleLogin('kakao')}
                        disabled={isLoading}
                        className="w-full h-14 flex items-center justify-center px-6 rounded-lg bg-[#FEE500] text-[#3c1e1e] font-bold hover:bg-[#FADA00] transition-all shadow-sm disabled:opacity-50"
                    >
                        <div className="w-5 h-5 mr-3 flex items-center justify-center">
                            <span className="text-xl">💬</span>
                        </div>
                        카카오로 로그인
                    </button>

                    {/* Naver Login */}
                    <button
                        onClick={() => handleLogin('naver')}
                        disabled={isLoading}
                        className="w-full h-14 flex items-center justify-center px-6 rounded-lg bg-[#03C75A] text-white font-bold hover:bg-[#02b351] transition-all shadow-sm disabled:opacity-50"
                    >
                        <div className="w-5 h-5 mr-3 flex items-center justify-center">
                            <span className="font-bold text-lg">N</span>
                        </div>
                        네이버로 로그인
                    </button>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-400 leading-relaxed">
                        계정이 없으신가요? <br />
                        소셜 계정으로 로그인하시면 자동으로 회원가입이 진행됩니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
