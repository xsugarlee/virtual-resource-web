let url: string | null = null;

export function setPostAuthRedirect(v: string | null) {
  url = v;
}

export function consumePostAuthRedirect(): string | null {
  const v = url;
  url = null;
  return v;
}
