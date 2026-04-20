import { useState } from 'react';
import { IconMail, IconLock, IconArrowRight, IconChecks, IconCheck, IconX } from '@tabler/icons-react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [email, setEmail] = useState('admin@syncflow.com');
  const [password, setPassword] = useState('SyncFlow123!');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Password validation break down
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;
  
  const isPasswordMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isForgotPassword) {
      if (!email || email.trim() === '') {
        alert('이메일 주소를 입력해주세요.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
        setIsForgotPassword(false);
      }, 1000);
      return;
    }
    
    if (isSignUp) {
      if (!isPasswordValid) {
        alert('비밀번호 조건을 확인해주세요. (영문 대문자 포함, 숫자, 특수문자 조합 8자리 이상)');
        return;
      }
      if (!isPasswordMatch) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
    } else {
      if (email !== 'admin@syncflow.com' || password !== 'SyncFlow123!') {
        alert('테스트 계정(admin@syncflow.com / SyncFlow123!)으로 로그인해 주세요.');
        return;
      }
    }
    
    setIsLoading(true);
    // Simulate authentication / registration process
    setTimeout(() => {
      setIsLoading(false);
      onLogin(); // Normally you'd register/login and proceed
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-surface)] p-4 relative overflow-hidden font-sans">
      {/* Background decorations for modern depth feel */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md flex flex-col gap-6 relative z-10 transition-all duration-300">
        
        {/* Tab Switcher (Out of the main card) */}
        {!isForgotPassword && (
          <div className="flex p-1.5 bg-[#E2E8F0] bg-opacity-60 backdrop-blur-md rounded-2xl shadow-[var(--shadow-neu-inset-soft)] border border-white/40 animate-in fade-in zoom-in-95 duration-300">
            <button 
              type="button"
              className={`flex-1 py-3 text-[14px] font-extrabold rounded-xl transition-all duration-300 ${!isSignUp ? 'bg-white shadow-[var(--shadow-neu-soft)] text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
              onClick={() => setIsSignUp(false)}
            >
              로그인
            </button>
            <button 
              type="button"
              className={`flex-1 py-3 text-[14px] font-extrabold rounded-xl transition-all duration-300 ${isSignUp ? 'bg-white shadow-[var(--shadow-neu-soft)] text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
              onClick={() => setIsSignUp(true)}
            >
              계정 생성
            </button>
          </div>
        )}

        <div className="card-base w-full p-8 md:p-10 flex flex-col gap-6 shadow-[var(--shadow-neu-strong)] relative overflow-hidden transition-all duration-300">
          <div className="flex flex-col items-center mb-2 animate-in fade-in duration-300">
            {/* Logo element */}
            <div className="w-16 h-16 rounded-3xl bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-primary)] mb-5 shadow-[var(--shadow-neu-soft)] border-2 border-white">
               <IconChecks size={32} stroke={2.5} />
            </div>
            <h1 className="text-2xl font-black text-[var(--color-text)] tracking-tight">
              {isForgotPassword ? "비밀번호 찾기" : (isSignUp ? "계정 생성하기" : "환영합니다")}
            </h1>
            <p className="text-[var(--color-text-muted)] text-[13px] font-semibold mt-2 text-center whitespace-nowrap">
              {isForgotPassword ? "가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다." : (isSignUp ? "원활한 서비스 이용을 위해 SyncFlow 계정을 생성해 주세요." : "테스트용 관리자 계정(admin@syncflow.com)으로 로그인해 보세요.")}
            </p>
          </div>

          {!isForgotPassword && (
            <div className="animate-in fade-in duration-300 flex flex-col gap-6">
              <button 
                type="button" 
                className="w-full bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] text-[var(--color-text)] font-bold py-3.5 rounded-xl flex justify-center items-center gap-3 transition-all duration-200 shadow-[var(--shadow-neu-soft)] hover:shadow-[var(--shadow-neu-strong)] hover:-translate-y-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21">
                  <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                  <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                  <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                  <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                </svg>
                <span className="text-[14px]">Microsoft로 계속하기</span>
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-[#CBD5E1]"></div>
                <span className="flex-shrink-0 mx-4 text-[var(--color-text-faint)] text-[11px] font-bold tracking-widest uppercase">또는 이메일로 진행</span>
                <div className="flex-grow border-t border-[#CBD5E1]"></div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[var(--color-text-muted)] ml-1">이메일 주소</label>
              <div className="relative flex items-center group">
                <IconMail className="absolute left-4 text-[var(--color-text-faint)] group-focus-within:text-[var(--color-primary)] transition-colors" size={20} stroke={2.5}/>
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@syncflow.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F1F5F9] border border-transparent rounded-xl text-[14px] font-bold text-[var(--color-text)] placeholder-[var(--color-text-faint)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]/30 transition-all duration-200 shadow-[var(--shadow-neu-inset-soft)]"
                />
              </div>
            </div>

            {!isForgotPassword && (
              <div className="flex flex-col gap-2 animate-in fade-in duration-300">
                 <div className="flex items-center justify-between ml-1">
                   <label className="text-[13px] font-bold text-[var(--color-text-muted)]">비밀번호</label>
                   {!isSignUp && (
                     <button type="button" onClick={() => setIsForgotPassword(true)} className="text-[12px] text-[var(--color-primary)] font-bold hover:underline focus:outline-none focus:underline transition-colors mt-0.5">비밀번호 찾기</button>
                   )}
                 </div>
                 <div className="relative flex items-center group">
                  <IconLock className="absolute left-4 text-[var(--color-text-faint)] group-focus-within:text-[var(--color-primary)] transition-colors" size={20} stroke={2.5}/>
                  <input 
                    type="password"
                    required={!isForgotPassword}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-10 py-3.5 bg-[#F1F5F9] border ${isSignUp && password.length > 0 ? (isPasswordValid ? 'border-[var(--color-success)] bg-white focus:ring-[var(--color-success)]/20 focus:border-[var(--color-success)]' : 'border-[var(--color-danger)]/50 bg-white focus:ring-[var(--color-danger)]/20 focus:border-[var(--color-danger)]/70') : 'border-transparent focus:bg-white focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]/30'} rounded-xl text-[14px] font-bold text-[var(--color-text)] placeholder-[var(--color-text-faint)] focus:outline-none focus:ring-2 transition-all duration-200 shadow-[var(--shadow-neu-inset-soft)]`}
                  />
                  {isSignUp && password.length > 0 && (
                    <div className="absolute right-4 flex items-center">
                      {isPasswordValid ? <IconCheck size={18} stroke={3} className="text-[var(--color-success)] drop-shadow-sm" /> : <IconX size={18} stroke={3} className="text-[var(--color-danger)] drop-shadow-sm" />}
                    </div>
                  )}
                </div>
                {isSignUp && (
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 px-1">
                    {/* 8자리 이상 */}
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold transition-colors ${password.length === 0 ? 'text-[var(--color-text-muted)]' : hasMinLength ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                      <div className="w-3.5 flex justify-center">
                        {password.length === 0 ? <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-faint)] opacity-40"></div> : hasMinLength ? <IconCheck size={16} stroke={4} /> : <IconX size={16} stroke={3} />}
                      </div>
                      8자리 이상
                    </div>
                    {/* 특수문자 */}
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold transition-colors ${password.length === 0 ? 'text-[var(--color-text-muted)]' : hasSpecialChar ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                      <div className="w-3.5 flex justify-center">
                        {password.length === 0 ? <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-faint)] opacity-40"></div> : hasSpecialChar ? <IconCheck size={16} stroke={4} /> : <IconX size={16} stroke={3} />}
                      </div>
                      특수문자 포함
                    </div>
                    {/* 영문 대문자 */}
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold transition-colors ${password.length === 0 ? 'text-[var(--color-text-muted)]' : hasUpperCase ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                      <div className="w-3.5 flex justify-center">
                        {password.length === 0 ? <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-faint)] opacity-40"></div> : hasUpperCase ? <IconCheck size={16} stroke={4} /> : <IconX size={16} stroke={3} />}
                      </div>
                      대문자 포함
                    </div>
                    {/* 숫자 */}
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold transition-colors ${password.length === 0 ? 'text-[var(--color-text-muted)]' : hasNumber ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                      <div className="w-3.5 flex justify-center">
                        {password.length === 0 ? <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-faint)] opacity-40"></div> : hasNumber ? <IconCheck size={16} stroke={4} /> : <IconX size={16} stroke={3} />}
                      </div>
                      숫자 포함
                    </div>
                  </div>
                )}
              </div>
            )}

            {isSignUp && !isForgotPassword && (
              <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[13px] font-bold text-[var(--color-text-muted)] ml-1">비밀번호 확인</label>
                <div className="relative flex items-center group">
                  <IconLock className="absolute left-4 text-[var(--color-text-faint)] group-focus-within:text-[var(--color-primary)] transition-colors" size={20} stroke={2.5} />
                  <input 
                    type="password"
                    required={isSignUp && !isForgotPassword}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-10 py-3.5 bg-[#F1F5F9] border ${confirmPassword.length > 0 ? (isPasswordMatch ? 'border-[var(--color-success)] bg-white focus:ring-[var(--color-success)]/20 focus:border-[var(--color-success)]' : 'border-[var(--color-danger)]/50 bg-white focus:ring-[var(--color-danger)]/20 focus:border-[var(--color-danger)]/70') : 'border-transparent focus:bg-white focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]/30'} rounded-xl text-[14px] font-bold text-[var(--color-text)] placeholder-[var(--color-text-faint)] focus:outline-none focus:ring-2 transition-all duration-200 shadow-[var(--shadow-neu-inset-soft)]`}
                  />
                  {confirmPassword.length > 0 && (
                    <div className="absolute right-4 flex items-center">
                      {isPasswordMatch ? <IconCheck size={18} stroke={3} className="text-[var(--color-success)] drop-shadow-sm" /> : <IconX size={18} stroke={3} className="text-[var(--color-danger)] drop-shadow-sm" />}
                    </div>
                  )}
                </div>
                <div className="h-4">
                  {confirmPassword.length > 0 && (
                    <p className={`text-[11px] font-semibold ml-1 transition-colors ${isPasswordMatch ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                      {isPasswordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                    </p>
                  )}
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading || (!isForgotPassword && isSignUp && (!isPasswordValid || !isPasswordMatch))}
              className={`mt-4 w-full bg-[var(--color-primary)] bg-gradient-to-r hover:from-[var(--color-primary)] hover:to-[#0284C7] from-[#0EA5E9] to-[#2563EB] text-white font-extrabold py-4 rounded-xl flex justify-center items-center gap-2 transition-all duration-300 shadow-[0_8px_20px_rgba(14,165,233,0.3)] hover:shadow-[0_12px_25px_rgba(14,165,233,0.4)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed group overflow-hidden relative ${isForgotPassword ? 'mt-6' : ''}`}
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
              
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin z-10"></div>
              ) : (
                <div className="flex items-center gap-2 z-10">
                  <span className="text-[15px]">{isForgotPassword ? "재설정 링크 받기" : (isSignUp ? "계정 생성하기" : "로그인하기")}</span>
                  <IconArrowRight size={20} stroke={2.5} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              )}
            </button>
          </form>

          <div className="text-center mt-2">
            <p className="text-[13px] font-semibold text-[var(--color-text-faint)] flex items-center justify-center gap-1 transition-all duration-300">
              {isForgotPassword ? (
                <button 
                  type="button"
                  className="text-[var(--color-primary)] font-bold hover:underline focus:outline-none focus:underline transition-colors"
                  onClick={() => setIsForgotPassword(false)}
                >
                  로그인 화면으로 돌아가기
                </button>
              ) : (
                <>
                  {isSignUp ? "이미 계정이 있으신가요?" : "계정이 없으신가요?"}
                  <button 
                    type="button"
                    className="text-[var(--color-primary)] font-bold hover:underline focus:outline-none focus:underline transition-colors"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? "로그인" : "계정 생성"}
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
