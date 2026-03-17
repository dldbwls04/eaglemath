import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function AdminWrite() {
    const { type } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // 공통 필드
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // 성적·합격 (results) 필드
    const [student, setStudent] = useState('');
    const [resultType, setResultType] = useState('성적 우수');

    // 상담일기 (counseling) & 기출문제(exam) 필드
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');

    // 학습자료실 (resources) 필드
    const [category, setCategory] = useState('기초학습');
    const [subCategory, setSubCategory] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [fileName, setFileName] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    // 권한 체크 (관리자만)
    const isAdmin = auth.currentUser?.email === 'admin@eaglemath.com';

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 text-center">
                <div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">접근 권한이 없습니다</h2>
                    <p className="text-slate-500 mb-6">관리자 계정으로 로그인해주세요.</p>
                    <button onClick={() => navigate(-1)} className="px-6 py-2 bg-slate-900 text-white rounded-lg">돌아가기</button>
                </div>
            </div>
        );
    }

    const getTitle = () => {
        switch (type) {
            case 'results': return '성적·합격 소식 글쓰기';
            case 'counseling': return '상담일기 글쓰기';
            case 'exam': return '기출문제 분석 글쓰기';
            case 'resources': return '학습자료실 자료 등록';
            default: return '글쓰기';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const commonData = {
                title,
                date,
                selectedDate: new Date(date),
                createdAt: serverTimestamp(),
                author: 'admin',
            };

            let specifics = {};
            if (type === 'results') {
                specifics = { student, type: resultType };
            } else if (type === 'counseling') {
                specifics = { summary, content };
            } else if (type === 'exam') {
                specifics = { summary, content, fileUrl, fileName };
            } else if (type === 'resources') {
                specifics = { category, subCategory, fileUrl, files: [fileName], isPublic };
            }

            await addDoc(collection(db, type), { ...commonData, ...specifics });
            
            alert('등록이 완료되었습니다.');
            navigate(-1);
        } catch (error) {
            console.error("Error writing document: ", error);
            alert('글 등록 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-900 mb-6 font-bold">
                    <ArrowLeft size={18} className="mr-2" /> 뒤로가기
                </button>
                
                <h1 className="text-2xl font-black text-slate-900 mb-8 pb-4 border-b border-slate-100">{getTitle()}</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 공통: 제목 & 날짜 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-3">
                            <label className="block text-sm font-bold text-slate-700 mb-2">제목</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-3 border border-slate-200 rounded-xl" placeholder="제목을 입력하세요" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">날짜</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-3 border border-slate-200 rounded-xl" />
                        </div>
                    </div>

                    {/* 성적·합격 (results) */}
                    {type === 'results' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">구분</label>
                                <select value={resultType} onChange={(e) => setResultType(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl">
                                    <option value="성적 우수">성적 우수</option>
                                    <option value="합격 뉴스">합격 뉴스</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">학생 정보</label>
                                <input type="text" value={student} onChange={(e) => setStudent(e.target.value)} required className="w-full p-3 border border-slate-200 rounded-xl" placeholder="예) 대영고 1학년 윤지이" />
                            </div>
                        </div>
                    )}

                    {/* 상담일기 & 기출분석 */}
                    {(type === 'counseling' || type === 'exam') && (
                        <>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">요약</label>
                                <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} required className="w-full p-3 border border-slate-200 rounded-xl" placeholder="글의 핵심 요약을 입력하세요" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">내용</label>
                                <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={10} className="w-full p-3 border border-slate-200 rounded-xl" placeholder="상세 내용을 입력하세요..."></textarea>
                            </div>
                        </>
                    )}

                    {/* 기출분석 & 학습자료실 파일 첨부 */}
                    {(type === 'exam' || type === 'resources') && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">자료명 (확장자 명시)</label>
                                <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl" placeholder="예) PDF, HWP (생략 가능)" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">외부 파일 링크 (Google Drive 등)</label>
                                <input type="url" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl" placeholder="다운로드 가능한 URL 주소를 입력하세요" />
                            </div>
                        </div>
                    )}

                    {/* 학습자료실 전용 */}
                    {type === 'resources' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">카테고리</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl">
                                    <option value="기초학습">기초학습</option>
                                    <option value="학교별 내신대비">학교별 내신대비</option>
                                    <option value="수능대비">수능대비</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">하위 카테고리</label>
                                <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl">
                                    <option value="">없음</option>
                                    <option value="중등">중등</option>
                                    <option value="고등">고등</option>
                                </select>
                            </div>
                            <div className="flex items-center pt-8">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                    <span className="text-sm font-bold text-slate-700">비회원 공개 여부 (체크 시 누구나 열람)</span>
                                </label>
                            </div>
                        </div>
                    )}

                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                        <button type="submit" disabled={isLoading} className="flex items-center px-8 py-4 bg-[#1e3a8a] text-white font-bold rounded-xl hover:bg-[#1e40af] disabled:opacity-50">
                            {isLoading ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> 저장 중...</> : '등록하기'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
