export default function defaultLoader({ src }: { src: string }) {
  if (src.startsWith("http")) return src;
  return `/Website${src}`;
}
