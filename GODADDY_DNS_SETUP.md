# GoDaddy DNS Configuration for HTTPS

## Problem
GitHub cannot issue an SSL certificate because your DNS records are not properly configured. You have mixed DNS records pointing to different services.

## Current DNS Issues
Your domain currently has:
- Some GitHub Pages IPs (185.199.x.x) ✅
- Other IPs from different services (76.223.105.230, 13.248.243.5) ❌

## Solution: Fix DNS Records in GoDaddy

### Step 1: Access GoDaddy DNS Management
1. Log into GoDaddy: https://www.godaddy.com
2. Go to **My Products**
3. Find **visenty.com** and click **DNS** or **Manage DNS**

### Step 2: Remove ALL Existing A Records
**IMPORTANT**: Delete ALL existing A records for the root domain (@ or blank name)

### Step 3: Add ONLY GitHub Pages A Records
Add these 4 A records (one at a time):

**Record 1:**
- **Type**: `A`
- **Name**: `@` (or leave blank)
- **Value**: `185.199.108.153`
- **TTL**: `600` (or default)

**Record 2:**
- **Type**: `A`
- **Name**: `@` (or leave blank)
- **Value**: `185.199.109.153`
- **TTL**: `600` (or default)

**Record 3:**
- **Type**: `A`
- **Name**: `@` (or leave blank)
- **Value**: `185.199.110.153`
- **TTL**: `600` (or default)

**Record 4:**
- **Type**: `A`
- **Name**: `@` (or leave blank)
- **Value**: `185.199.111.153`
- **TTL**: `600` (or default)

### Step 4: Configure www Subdomain
**Remove any existing www CNAME or A record**, then add:

- **Type**: `CNAME`
- **Name**: `www`
- **Value**: `mattttman.github.io` (or your GitHub username)
- **TTL**: `600` (or default)

### Step 5: Remove Conflicting Records
**Delete any records that have:**
- IPs other than the 4 GitHub Pages IPs above
- Any other A records pointing to different services
- Any conflicting CNAME records for the root domain

### Step 6: Verify in GitHub
1. Go to: https://github.com/MattttMan/Visenty/settings/pages
2. Under "Custom domain", make sure it shows: `visenty.com`
3. The CNAME file has been created and pushed to your repository

### Step 7: Wait for DNS Propagation
- DNS changes can take **24-48 hours** to fully propagate
- Usually works within **2-4 hours**
- GitHub needs to verify DNS before issuing SSL certificate

### Step 8: Enable HTTPS
After DNS propagates (check with `dig visenty.com`):
1. Go back to GitHub Pages settings
2. The "Enforce HTTPS" checkbox should become available
3. Check it and save

## Verify DNS Configuration

After updating DNS, verify with these commands:

```bash
# Check A records (should only show the 4 GitHub IPs)
dig visenty.com +short

# Should show:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Check www CNAME
dig www.visenty.com +short

# Should show:
# mattttman.github.io
```

## Troubleshooting

### If HTTPS still doesn't work after 24 hours:
1. **Verify DNS is correct**: Use https://dnschecker.org to check global DNS propagation
2. **Check CNAME file**: Ensure `CNAME` file exists in repository root with `visenty.com`
3. **Remove domain and re-add**: In GitHub Pages settings, clear the custom domain, wait 5 minutes, then re-add it
4. **Check for multiple CNAME files**: Make sure there's only ONE CNAME file in the repository

### Common Mistakes:
- ❌ Leaving old A records pointing to other services
- ❌ Having CNAME for root domain (@) - root domain MUST use A records
- ❌ Using wrong GitHub Pages IPs
- ❌ CNAME file has wrong domain or www prefix

### Quick Checklist:
- [ ] All 4 A records added (185.199.108-111.153)
- [ ] All old A records removed
- [ ] www CNAME points to mattttman.github.io
- [ ] CNAME file in repository with "visenty.com"
- [ ] Custom domain set in GitHub Pages settings
- [ ] Wait 24-48 hours for DNS propagation

