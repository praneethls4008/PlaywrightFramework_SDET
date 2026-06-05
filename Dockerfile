# Use Microsoft's official Playwright image.
# This image already contains:
# - Node.js
# - Chromium
# - Firefox
# - WebKit
# - Required Linux dependencies
FROM mcr.microsoft.com/playwright:v1.59.1-noble

# Set the working directory inside the container.
# All subsequent commands will execute from /app.
WORKDIR /app

# Copy package.json and package-lock.json first.
# This helps Docker cache npm dependencies.
COPY package*.json ./

# Install project dependencies.
# npm ci is preferred in CI/CD because:
# - Faster than npm install
# - Uses package-lock.json
# - Produces consistent builds
RUN npm ci

# Copy the entire Playwright project into the container.
COPY . .

# Create report folders.
# Not mandatory but keeps things organized.
RUN mkdir -p playwright-report test-results

# Default command executed when container starts.
# Runs all Playwright tests.
CMD ["npx", "playwright", "test"]