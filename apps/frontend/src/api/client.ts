/**
 * src/api/http.ts
 * * - 표준 URLSearchParams 사용으로 쿼리 파라미터 인코딩 처리
 * - 공통 에러 핸들링 (HttpError 클래스)
 * - Content-Type 자동 설정
 */

type QueryParams = Record<string, string | number | boolean | null | undefined>

export interface RequestConfig extends Omit<RequestInit, 'body'> {
  params?: QueryParams
}

type RequestOptions = RequestInit & { params?: QueryParams }

// 응답 에러 처리를 위한 커스텀 에러 클래스
export class HttpError extends Error {
  constructor(public status: number, message: string, public payload?: unknown) {
    super(message)
    this.name = 'HttpError'
  }
}

// 환경변수에서 Base URL을 가져오거나 기본값 설정
const BASE_URL = 'http://localhost:4000/api'

const buildUrl = (path: string, params?: QueryParams): string => {
  // 상대 경로인 경우 BASE_URL과 조합
  const url = new URL(path, BASE_URL)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  return url.toString()
}

async function request<T>(path: string, config: RequestOptions = {}): Promise<T> {
  const { params, headers, method = 'GET', ...rest } = config
  const url = buildUrl(path, params)
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  }

  try {
    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      ...rest,
    })

    const contentType = response.headers.get('Content-Type')
    const data = contentType?.includes('application/json') ? await response.json() : undefined

    if (!response.ok) {
      // API 응답은 왔으나 4xx, 5xx 에러인 경우
      throw new HttpError(response.status, data?.message || response.statusText || 'Request Failed', data)
    }

    return data as T
  } catch (error) {
    // 1. 위에서 우리가 던진 HttpError인 경우 그대로 다시 던짐
    if (error instanceof HttpError) {
      throw error
    }

    // 2. fetch 자체가 실패한 경우 (네트워크 에러 등)
    throw new HttpError(0, 'Network Error: 서버와 연결할 수 없습니다.', error)
  }
}

export const http = {
  get: <T>(path: string, config?: RequestConfig) => request<T>(path, { ...config, method: 'GET' }),

  post: <T>(path: string, body: unknown, config?: RequestConfig) =>
    request<T>(path, { ...config, method: 'POST', body: JSON.stringify(body) }),

  put: <T>(path: string, body: unknown, config?: RequestConfig) =>
    request<T>(path, { ...config, method: 'PUT', body: JSON.stringify(body) }),

  patch: <T>(path: string, body: unknown, config?: RequestConfig) =>
    request<T>(path, { ...config, method: 'PATCH', body: JSON.stringify(body) }),

  delete: <T>(path: string, config?: RequestConfig) => request<T>(path, { ...config, method: 'DELETE' }),
}
