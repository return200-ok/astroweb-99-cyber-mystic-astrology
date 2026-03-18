# Docker Deployment Guide

## Quick Start

```bash
# Navigate to the project directory (IMPORTANT!)
cd /Users/cao.lv/gitlab.citigo.com.vn/local/astroweb-99-cyber-mystic-astrology

# Build and run
docker compose up --build

# App will be available at: http://localhost
```

## Docker Commands

### Build
```bash
cd /Users/cao.lv/gitlab.citigo.com.vn/local/astroweb-99-cyber-mystic-astrology
docker compose up --build
```

### View logs
```bash
cd /Users/cao.lv/gitlab.citigo.com.vn/local/astroweb-99-cyber-mystic-astrology
docker compose logs -f
```

### Stop containers
```bash
cd /Users/cao.lv/gitlab.citigo.com.vn/local/astroweb-99-cyber-mystic-astrology
docker compose down
```

### Rebuild without cache
```bash
cd /Users/cao.lv/gitlab.citigo.com.vn/local/astroweb-99-cyber-mystic-astrology
docker compose down
docker compose up --build --no-cache
```

## Troubleshooting

**Port 80 already in use:**
```bash
cd /Users/cao.lv/gitlab.citigo.com.vn/local/astroweb-99-cyber-mystic-astrology
# Edit docker-compose.yml ports section
# Change: "80:80" to "8080:80"
# Then rebuild
```

**Container won't start:**
```bash
cd /Users/cao.lv/gitlab.citigo.com.vn/local/astroweb-99-cyber-mystic-astrology
docker compose logs astroweb-app
```

**Clear all Docker data:**
```bash
cd /Users/cao.lv/gitlab.citigo.com.vn/local/astroweb-99-cyber-mystic-astrology
docker compose down -v
docker system prune -a
```
