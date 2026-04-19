"use client";

import { useActionState, useState } from "react";
import {
  IconAt,
  IconKey,
  IconUser,
  IconLoader2,
  IconAlertCircle,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react";
import TabSwitcher, { type AuthTab } from "@/components/auth/TabSwitcher";
import IconField from "@/components/auth/IconField";
import PasswordRulesField from "@/components/auth/PasswordRulesField";
import MicrosoftButton from "@/components/auth/MicrosoftButton";
import {
  signInAction,
  signUpAction,
  type AuthState,
} from "@/features/auth/actions";

export default function LoginTabs({
  active,
  oauthError,
}: {
  active: AuthTab;
  oauthError?: string;
}) {
  return (
    <>
      <TabSwitcher active={active} />
      <div className="p-8 md:p-10 space-y-7">
        {oauthError ? (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20">
            <IconAlertCircle size={18} className="text-[var(--color-danger)]" />
            <p className="text-xs font-bold text-[var(--color-danger)]">
              {oauthError}
            </p>
          </div>
        ) : null}

        <MicrosoftButton
          label={
            active === "signin"
              ? "Microsoft로 계속하기"
              : "Microsoft로 가입하기"
          }
        />

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-[var(--color-secondary)]" />
          <span className="flex-shrink mx-4 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-text-faint)]">
            {active === "signin" ? "또는 이메일로 접속" : "또는 이메일로 가입"}
          </span>
          <div className="flex-grow border-t border-[var(--color-secondary)]" />
        </div>

        {active === "signin" ? <SignInForm /> : <SignUpForm />}
      </div>
    </>
  );
}

function SubmitButton({ label, pending }: { label: string; pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full py-[14px] text-[15px] flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <IconLoader2 size={16} className="animate-spin" stroke={2.2} />
          인증 중...
        </>
      ) : (
        label
      )}
    </button>
  );
}

function FormMessage({ state }: { state: AuthState }) {
  if (!state) return null;
  if (state.error) {
    return (
      <div
        role="alert"
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20"
      >
        <IconAlertCircle size={16} className="text-[var(--color-danger)]" />
        <p className="text-xs font-bold text-[var(--color-danger)]">
          {state.error}
        </p>
      </div>
    );
  }
  if (state.message) {
    return (
      <div
        role="status"
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-success)]/10 border border-[var(--color-success)]/20"
      >
        <IconCircleCheck size={16} className="text-[var(--color-success)]" />
        <p className="text-xs font-bold text-[var(--color-success)]">
          {state.message}
        </p>
      </div>
    );
  }
  return null;
}

function SignInForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    signInAction,
    null,
  );

  return (
    <form action={formAction} className="space-y-6">
      <IconField
        label="이메일 주소"
        name="email"
        type="email"
        placeholder="name@company.com"
        leftIcon={<IconAt size={18} stroke={1.8} />}
        autoComplete="email"
        required
      />
      <IconField
        label="비밀번호"
        name="password"
        type="password"
        passwordToggle
        placeholder="••••••••••••"
        leftIcon={<IconKey size={18} stroke={1.8} />}
        autoComplete="current-password"
        required
      />
      <FormMessage state={state} />
      <SubmitButton label="로그인" pending={pending} />
      <div className="text-center">
        <a
          href="/forgot-password"
          className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
        >
          비밀번호를 잊으셨나요?
        </a>
      </div>
    </form>
  );
}

function SignUpForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    signUpAction,
    null,
  );
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const match = confirm.length > 0 && confirm === password;
  const mismatch = confirm.length > 0 && confirm !== password;

  return (
    <form action={formAction} className="space-y-6">
      <IconField
        label="이름"
        name="name"
        type="text"
        placeholder="홍길동"
        leftIcon={<IconUser size={18} stroke={1.8} />}
        autoComplete="name"
      />
      <IconField
        label="이메일 주소"
        name="email"
        type="email"
        placeholder="name@company.com"
        leftIcon={<IconAt size={18} stroke={1.8} />}
        autoComplete="email"
        required
      />
      <PasswordRulesField
        label="비밀번호"
        name="password"
        placeholder="영문(대소문자) + 숫자 + 특수문자 8자 이상"
        value={password}
        onChange={setPassword}
      />
      <div className="flex flex-col gap-2">
        <IconField
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          passwordToggle
          placeholder="비밀번호를 다시 입력하세요"
          leftIcon={<IconKey size={18} stroke={1.8} />}
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        {match ? (
          <span className="inline-flex items-center gap-1 ml-1 font-display text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-success)]">
            <IconCircleCheck size={12} stroke={2.4} />
            비밀번호가 일치합니다
          </span>
        ) : null}
        {mismatch ? (
          <span className="inline-flex items-center gap-1 ml-1 font-display text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-danger)]">
            <IconCircleX size={12} stroke={2.4} />
            비밀번호가 일치하지 않습니다
          </span>
        ) : null}
      </div>
      <FormMessage state={state} />
      <SubmitButton label="계정 생성" pending={pending} />
    </form>
  );
}
