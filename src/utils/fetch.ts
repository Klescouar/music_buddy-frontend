export async function fetchJson<T>(
  url: string,
  options: RequestInit = { method: "GET" }
): Promise<T> {
  const response = await fetch(url, {
    method: options.method,
    headers: options.headers || {},
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data: T = await response.json();

  return data;
}
