# compression() compresses Brotli at quality 11

`compression()` passes no Brotli quality to `node:zlib`, so every response is compressed at Node's default, quality 11. That's the slowest setting, meant for compressing files once ahead of time. On each response it can take longer than generating the page.

This is the default app from `npx remix@3.3.0 new`, with `compression()` added in front of the router middleware and a `/list` page of about 100 KB of HTML.

## Reproduce

```sh
npm install
npm start
```

In another terminal, request the page with Brotli and with gzip:

```sh
for encoding in br gzip br gzip; do
  curl -s -o /dev/null -H "Accept-Encoding: $encoding" \
    -w "$encoding: %{time_total}s, %{size_download} bytes\n" http://localhost:44100/list
done
```

## Expected

Brotli takes about as long as gzip.

## Actual

Brotli takes tens of milliseconds longer than gzip on every request.
