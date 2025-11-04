# Deployment Guide for Visenty Website

## Step 1: Merge to Main Branch (if needed)

Your files are currently on `feat-premium-design-5OFwL`. To deploy via GitHub Pages, you'll need them on the `main` branch.

### Option A: Merge via GitHub UI
1. Go to https://github.com/MattttMan/Visenty
2. Create a Pull Request from `feat-premium-design-5OFwL` to `main`
3. Merge the PR

### Option B: Merge via Command Line
```bash
git checkout main
git merge feat-premium-design-5OFwL
git push origin main
```

## Step 2: Enable GitHub Pages

1. Go to your repository: https://github.com/MattttMan/Visenty
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Your site will be available at: `https://mattttman.github.io/Visenty/`

**Note**: It may take a few minutes for GitHub Pages to build and deploy your site.

## Step 3: Configure Custom Domain (GoDaddy)

### A. Get Your GitHub Pages URL
After enabling GitHub Pages, note your GitHub Pages URL (e.g., `mattttman.github.io`)

### B. Configure DNS in GoDaddy

1. **Log into GoDaddy** and go to your domain management
2. **Access DNS Settings**:
   - Go to "My Products" → Find your domain → Click "DNS" or "Manage DNS"

3. **Add/Update DNS Records**:
   You need to add the following records:

   **For Root Domain (e.g., visenty.com):**
   - **Type**: `A` record
   - **Name**: `@` (or leave blank for root domain)
   - **Value**: 
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **TTL**: 600 (or default)

   **For www subdomain (e.g., www.visenty.com):**
   - **Type**: `CNAME` record
   - **Name**: `www`
   - **Value**: `mattttman.github.io` (replace with your GitHub username if different)
   - **TTL**: 600 (or default)

4. **Remove conflicting records**: If you have existing A or CNAME records for the root domain, remove them first.

### C. Configure Custom Domain in GitHub

1. Go back to GitHub repository → **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `visenty.com`)
3. Check **"Enforce HTTPS"** (this will be available after DNS propagates)
4. Click **Save**

### D. Add CNAME file to repository

GitHub will automatically create a `CNAME` file, or you can create it manually:

1. Create a file named `CNAME` (no extension) in the root of your repository
2. Add your domain name inside (e.g., `visenty.com` or `www.visenty.com`)
3. Commit and push:
   ```bash
   git add CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

## Step 4: Verify DNS Propagation

DNS changes can take 24-48 hours to fully propagate, but usually work within a few hours.

To check if DNS is working:
```bash
# Check A records
dig visenty.com +nostats +nocomments +nocmd

# Check CNAME
dig www.visenty.com +nostats +nocomments +nocmd
```

Or use online tools:
- https://dnschecker.org
- https://www.whatsmydns.net

## Step 5: SSL Certificate

GitHub Pages automatically provides SSL certificates for custom domains. After DNS propagates:
1. Go to **Settings** → **Pages**
2. Enable **"Enforce HTTPS"**
3. Wait for the certificate to be issued (usually within 24 hours)

## Troubleshooting

### Site not loading:
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct
- Check GitHub Pages settings show your domain
- Ensure CNAME file is in the repository root

### HTTPS not working:
- DNS must be fully propagated first
- Wait up to 24 hours for certificate issuance
- Check that "Enforce HTTPS" is enabled in GitHub settings

### Mixed content warnings:
- Your site uses external fonts (Google Fonts), which should be fine
- All resources should load over HTTPS automatically

## Quick Reference

- **Repository**: https://github.com/MattttMan/Visenty
- **GitHub Pages URL**: https://mattttman.github.io/Visenty/
- **Custom Domain**: (Your GoDaddy domain)

