# Use browserless/chromium as the base image
FROM ghcr.io/browserless/chromium

# Set environment variables - TODO: set them in Fly.io? <https://fly.io/docs/apps/secrets/#setting-secrets>
ENV CONCURRENT=10
ENV TOKEN=XXXXX

# The base image already exposes port 3000, but we can make it explicit
EXPOSE 3000

# The base image already has an entrypoint/cmd set up,
# so we don't need to specify them again
