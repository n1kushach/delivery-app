import React from 'react';

type ErrorVariant = 'inline' | 'page' | 'banner';

type DashboardErrorProps = {
  message?: string;
  variant?: ErrorVariant;
  onRetry?: () => void;
};

const DashboardError = ({
  message = 'Something went wrong. Please try again.',
  variant = 'inline',
  onRetry,
}: DashboardErrorProps) => {
  if (variant === 'banner') {
    return (
      <div className="flex items-center justify-between gap-4 border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        <div className="flex items-center gap-2">
          <ErrorIcon />
          <span>{message}</span>
        </div>
        {onRetry && <RetryButton onRetry={onRetry} />}
      </div>
    );
  }

  if (variant === 'page') {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
          <ErrorIcon size={32} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Something went wrong
          </h2>
          <p className="mt-1 text-sm text-gray-500">{message}</p>
        </div>
        {onRetry && <RetryButton onRetry={onRetry} />}
      </div>
    );
  }

  // inline (default)
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
      <div className="flex items-center gap-2">
        <ErrorIcon />
        <span>{message}</span>
      </div>
      {onRetry && <RetryButton onRetry={onRetry} />}
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const ErrorIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const RetryButton = ({ onRetry }: { onRetry: () => void }) => (
  <button
    onClick={onRetry}
    className="shrink-0 rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
  >
    Try again
  </button>
);

export default DashboardError;
