export function absoluteUrl(path: string) {
  return `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }${path}`;
}

export function generatePostDetailsLink(
  post: any,
  _isLoggedIn: any,
  _isSubscribed: boolean | undefined,
) {
  return `/blog/${post.slug.current}`;
}
