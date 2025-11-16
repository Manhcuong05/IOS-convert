type Json = Record<string, any>;

const DEFAULT_TIMEOUT = 15000; // 15s

function timeoutAbort(ms: number) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return { controller, id };
}

// Chuẩn hóa body: strip ký tự tiền tệ "10.000.000 VNĐ" -> 10000000
export function normalizeLoanPayload(raw: Json): Json {
  const stripNum = (v: any) =>
    typeof v === "string" ? Number(v.replace(/[^\d]/g, "")) : v;

  const payload = { ...raw };

  // chuẩn hóa các trường số nếu có
  if (payload.amount !== undefined) payload.amount = stripNum(payload.amount);
  if (payload.month !== undefined) payload.month = Number(payload.month);
  if (payload.rate !== undefined)
    payload.rate =
      typeof payload.rate === "string"
        ? Number(payload.rate.replace(",", ".").replace(/[^\d.]/g, ""))
        : payload.rate;
  if (payload.monthlyPayment !== undefined)
    payload.monthlyPayment = stripNum(payload.monthlyPayment);

  return payload;
}

export async function postJSON<T = any>(
  url: string,
  body: Json,
  opts?: { timeoutMs?: number; headers?: Record<string, string> }
): Promise<T> {
  const { controller, id } = timeoutAbort(opts?.timeoutMs ?? DEFAULT_TIMEOUT);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(opts?.headers || {}),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    }
    // Nếu backend trả JSON
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return (await res.json()) as T;
    }
    // Nếu không phải JSON vẫn trả về text
    return (await res.text()) as unknown as T;
  } finally {
    clearTimeout(id);
  }
}
