export type AuthUser = {
  id: string;
  username: string;
  email: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export type RegisterResponse = {
  success: boolean;
  user: AuthUser;
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

async function handleResponse<T>(res: Response): Promise<T> {
  const rawBody = await res.text();
  let data: any;

  if (rawBody) {
    try {
      data = JSON.parse(rawBody);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to parse server response";
      throw new Error(message);
    }
  }

  if (!res.ok) {
    const message =
      data?.error ||
      data?.message ||
      res.statusText ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

export async function login(credentials: {
  username: string;
  password: string;
}): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return handleResponse<LoginResponse>(res);
}

export async function register(payload: {
  username: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<RegisterResponse>(res);
}

export async function logout(token: string | null) {
  if (!token) return;

  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function storeAuthToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("authToken", token);
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
}
