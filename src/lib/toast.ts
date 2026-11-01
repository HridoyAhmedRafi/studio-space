import toast from "react-hot-toast";

const FALLBACK_ERROR = "Something went wrong. Please try again.";

const LOADING_TOAST_ID = "app-loading";

const resolveMessage = (input: unknown, fallback = FALLBACK_ERROR): string => {
  if (!input) return fallback;

  if (typeof input === "string") return input.trim() || fallback;

  if (input instanceof Error) return input.message?.trim() || fallback;

  if (typeof input === "object" && "message" in input) {
    const message = (input as { message?: unknown }).message;

    return typeof message === "string" && message.trim() ? message : fallback;
  }

  return fallback;
};

/**
 * Single entry point for user feedback so every action in the app looks and
 * behaves the same. Prefer these helpers over importing `react-hot-toast`
 * directly.
 */
export const toastSuccess = (message: string) => toast.success(message);

export const toastError = (input?: unknown, fallback = FALLBACK_ERROR) =>
  toast.error(resolveMessage(input, fallback));

/** Loading toasts reuse one id, so they can never stack up. */
export const toastLoading = (message: string) =>
  toast.loading(message, { id: LOADING_TOAST_ID });

export const dismissToast = (id: string = LOADING_TOAST_ID) => toast.dismiss(id);
