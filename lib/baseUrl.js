export default function getUrl(path) {
  const baseUrl =
    process.env.NEXT_PUBLIC_NODE_ENV === "local"
      ? process.env.NEXT_PUBLIC_URL
      : "https://".concat(process.env.NEXT_PUBLIC_VERCEL_URL);
  return new URL(path, baseUrl).toString();
}
