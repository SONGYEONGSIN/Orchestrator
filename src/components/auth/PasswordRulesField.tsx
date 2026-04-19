"use client";

import { useMemo } from "react";
import { IconKey, IconCircleCheck, IconCircle } from "@tabler/icons-react";
import IconField from "./IconField";

const RULES: { label: string; test: (v: string) => boolean }[] = [
  { label: "8자 이상", test: (v) => v.length >= 8 },
  { label: "대문자", test: (v) => /[A-Z]/.test(v) },
  { label: "소문자", test: (v) => /[a-z]/.test(v) },
  { label: "숫자", test: (v) => /[0-9]/.test(v) },
  {
    label: "특수문자",
    test: (v) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v),
  },
];

export default function PasswordRulesField({
  name,
  label,
  placeholder,
  value,
  onChange,
}: {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const results = useMemo(
    () => RULES.map((r) => ({ label: r.label, pass: r.test(value) })),
    [value],
  );
  const passedCount = results.filter((r) => r.pass).length;
  const allPass = passedCount === RULES.length;

  return (
    <div className="flex flex-col gap-2">
      <IconField
        name={name}
        label={label}
        placeholder={placeholder}
        type="password"
        passwordToggle
        leftIcon={<IconKey size={18} stroke={1.8} />}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="new-password"
        required
      />
      {value.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-1 ml-1">
            {results.map((r) => (
              <span
                key={r.label}
                className={
                  "inline-flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-[0.1em] " +
                  (r.pass
                    ? "text-[var(--color-success)]"
                    : "text-[var(--color-text-faint)]")
                }
              >
                {r.pass ? (
                  <IconCircleCheck size={12} stroke={2.4} />
                ) : (
                  <IconCircle size={12} stroke={2} />
                )}
                {r.label}
              </span>
            ))}
          </div>
          <div className="h-1 w-full bg-[var(--color-secondary)] rounded-full overflow-hidden mt-1">
            <div
              className={
                "h-full rounded-full transition-all duration-300 " +
                (allPass
                  ? "bg-[var(--color-success)]"
                  : passedCount >= 3
                    ? "bg-[var(--color-warning)]"
                    : "bg-[var(--color-danger)]")
              }
              style={{ width: `${(passedCount / RULES.length) * 100}%` }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
