import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { FileText, Download, ChevronRight, Edit3 } from 'lucide-react';

export default function ExamAnalysis() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isAdmin = auth.currentUser?.email === 'admin@eaglemath.com';

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, 'exam'), orderBy('date', 'desc'));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(data);
            } catch (error) {
                console.error("Error fetching exams:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            {/* Hero Section */}
            <div className="bg-slate-50 border-b border-slate-100 py-16 px-4">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">기출문제 분석</h1>
                        <p className="text-slate-500 font-medium">거점 학교별 기출문제 경향과 대비 전략을 제공합니다</p>
                    </div>
                    {isAdmin && (
                        <Link to="/admin/write/exam" className="inline-flex items-center px-6 py-3 bg-[#1e3a8a] text-white font-bold rounded-xl shadow-lg hover:bg-[#1e40af] transition-colors">
                            <Edit3 size={18} className="mr-2" /> 분석글 작성
                        </Link>
                    )}
                </div>
            </div>

            {/* List */}
            <div className="max-w-5xl mx-auto py-12 px-4">
                {isLoading ? (
                    <div className="text-center py-20 text-slate-400 font-bold">불러오는 중...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-32">
                        <FileText className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold">등록된 기출분석 자료가 없습니다.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {posts.map((post) => (
                            <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-[11px] font-extrabold text-[#1e3a8a] uppercase tracking-widest px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                                                {post.date}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900 mb-3">{post.title}</h2>
                                        <p className="text-slate-600 font-medium mb-4">{post.summary}</p>
                                        <div className="p-4 bg-slate-50 rounded-xl text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                                            {post.content}
                                        </div>
                                    </div>
                                    {post.fileUrl && (
                                        <a href={post.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center shrink-0 w-full md:w-auto px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-colors">
                                            <Download className="w-4 h-4 mr-2" />
                                            자료 다운로드 {post.fileName && `(${post.fileName})`}
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
