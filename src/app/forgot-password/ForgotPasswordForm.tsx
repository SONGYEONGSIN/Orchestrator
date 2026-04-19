"use client";

import { useActionState } from "react";
import {
  IconAt,
  IconLoader2,
  IconAlertCircle,
  IconCircleCheck,
} from "@tabler/icons-react";
import IconField from "@/components/auth/IconField";
import { forgotPasswordAction, type AuthState } from "@/features/auth/actions";

export default function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    forgotPasswordAction,
    null,
  );

  return (
    <form action={formAction} className="space-y-5">
      <IconField
        label="이메일 주소"
        name="email"
        type="email"
        placeholder="name@company.com"
        leftIcon={<IconAt size={18} stroke={1.8} />}
        autoComplete="email"
        required
      />

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
      {state?.message ? (
        <div
          role="status"
          className="flex items-start gap-2 px-4 py-3 rounded-xl bg-[var(--color-success)]/10 border border-[var(--color-success)]/20"
        >
          <IconCircleCheck
            size={16}
            className="text-[var(--color-success)] mt-0.5 shrink-0"
          />
          <p className="text-xs font-bold text-[var(--color-success)] leading-relaxed">
            {state.message}
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
            전송 중...
          </>
        ) : (
          "재설정 링크 보내기"
        )}
      </button>
    </form>
  );
}
