"use client";

import { useActionState, useState } from "react";
import {
  IconKey,
  IconLoader2,
  IconAlertCircle,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react";
import IconField from "@/components/auth/IconField";
import PasswordRulesField from "@/components/auth/PasswordRulesField";
import { resetPasswordAction, type AuthState } from "@/features/auth/actions";

export default function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    resetPasswordAction,
    null,
  );
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const match = confirm.length > 0 && confirm === password;
  const mismatch = confirm.length > 0 && confirm !== password;

  return (
    <form action={formAction} className="space-y-5">
      <PasswordRulesField
        label="새 비밀번호"
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

      {state?.error ? (
        <div
          role="alert"
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20"
        >
          <IconAlertCircle size={16} className="text-[var(--color-danger)]" />
          <p className="text-xs font-bold text-[var(--color-danger)]">
            {state.error}
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full py-[14px] text-[15px] flex items-center justify-center gap-2"
      >
        {pending ? (
          <>
            <IconLoader2 size={16} className="animate-spin" stroke={2.2} />
            변경 중...
          </>
        ) : (
          "비밀번호 변경"
        )}
      </button>
    </form>
  );
}
