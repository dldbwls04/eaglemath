import React from 'react';
import { Users, Briefcase, GraduationCap, Trophy, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function Recruitment() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-[#172554] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-200 uppercase bg-blue-900/50 rounded-full border border-blue-700/50">
            Recruitment
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            독수리수학과 함께할 <span className="text-blue-400">인재</span>를 모집합니다
          </h1>
          <p className="text-base md:text-lg text-blue-200/80 max-w-2xl mx-auto font-normal leading-relaxed">
            최고의 학습 시스템과 열정적인 동료들이 있는 곳에서<br />
            꿈을 함께 실현해 나갈 역량 있는 선생님들을 기다립니다.
          </p>
        </div>
      </section>

      {/* Recruitment Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">채용 절차</h2>
            <div className="w-20 h-1.5 bg-[#172554] mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 -translate-y-1/2 z-0"></div>
            
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: "01", title: "서류전형", desc: "이력서 및 자기소개서 검토" },
                { step: "02", title: "1차면접", desc: "인성 및 기본 역량 평가" },
                { step: "03", title: "2차면접(시범강의)", desc: "교수 역량 및 시현 테스트" },
                { step: "04", title: "최종합격", desc: "처우 협의 및 입사 확정" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#172554] text-white rounded-full flex items-center justify-center text-xl font-black mx-auto mb-6 border-4 border-white shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Qualification Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <div className="pt-8">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">지원 자격 및 우대사항</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-blue-100 p-1 rounded-full text-[#172554]">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">지원 자격</h4>
                    <p className="text-slate-600 font-medium">4년제 대학 졸업 이상 (졸업예정자 가능)</p>
                    <p className="text-slate-600 font-medium">해당 분야 및 과목의 교과 분석 및 학생 지도 가능자</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-blue-100 p-1 rounded-full text-[#172554]">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">우대 사항</h4>
                    <p className="text-slate-600 font-medium">유관업무 경력자</p>
                    <p className="text-slate-600 font-medium">학생 관리에 강점이 있으며 열정이 넘치시는 분</p>
                    <p className="text-slate-600 font-medium">기초부터 심화까지 수준별 맞춤 지도 역량 보유자</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center space-x-2">
                <Mail className="text-[#172554]" />
                <span>선생님 지원서</span>
              </h3>
              <form className="space-y-5">
                {/* 사진 업로드 */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2">사진 업로드</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-32 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 text-slate-400">
                      <Users size={32} />
                    </div>
                    <input type="file" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer" accept="image/*" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">성함</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="성함 입력" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">생년월일</label>
                    <input type="date" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="010-0000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">지원 과목</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white">
                      <option value="">선택하세요</option>
                      <option value="math">수학</option>
                      <option value="korean">국어</option>
                      <option value="english">영어</option>
                      <option value="science">과학</option>
                      <option value="admin">행정</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">지원 분야 (중복 선택 가능)</label>
                  <div className="flex flex-wrap gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    {['초등', '중등', '고등', '행정'].map((field) => (
                      <label key={field} className="flex items-center space-x-2 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-[#172554] focus:ring-[#172554] transition-all" />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{field}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">주소</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="거주지 주소 입력" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">학력 사항</label>
                  <textarea rows="3" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none" placeholder="대학교 / 전공 / 졸업 여부 등"></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-[#172554] text-white font-black rounded-lg hover:bg-black transition-all shadow-lg active:scale-[0.98]">
                  지원서 제출하기
                </button>
                <p className="text-center text-xs text-slate-400 font-medium">
                  제출해주신 개인정보는 채용 목적으로만 사용되며 안전하게 보호됩니다.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
          <div className="flex items-center space-x-2 text-slate-600 font-bold">
            <Phone size={18} className="text-[#172554]" />
            <span>채용 문의: 010-8229-7963</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600 font-bold">
            <Mail size={18} className="text-[#172554]" />
            <span>이메일: eaglemath@naver.com</span>
          </div>
        </div>
      </section>
    </div>
  );
}
