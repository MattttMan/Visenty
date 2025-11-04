# FIX HTTPS Issue - Step by Step Guide

## 🔴 CURRENT PROBLEM
Your DNS still has **2 extra IP addresses** that are blocking HTTPS:
- `76.223.105.230` ❌ DELETE THIS
- `13.248.243.5` ❌ DELETE THIS

GitHub cannot issue SSL certificates when there are conflicting DNS records.

## ✅ SOLUTION - Do This Now:

### STEP 1: Remove Extra DNS Records in GoDaddy

1. **Login to GoDaddy**: https://www.godaddy.com
2. **Go to**: My Products → visenty.com → **DNS** (or "Manage DNS")
3. **Find and DELETE these 2 A records**:
   - The one with IP: `76.223.105.230`
   - The one with IP: `13.248.243.5`
4. **Keep ONLY these 4 A records**:
   - `185.199.108.153` ✅
   - `185.199.109.153` ✅
   - `185.199.110.153` ✅
   - `185.199.111.153` ✅

### STEP 2: Verify DNS is Fixed

After deleting, wait 5 minutes, then check:
```bash
dig visenty.com +short
```

**Should show ONLY these 4 IPs:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

If you still see `76.223.105.230` or `13.248.243.5`, they weren't deleted properly.

### STEP 3: Reset Domain in GitHub (IMPORTANT!)

This forces GitHub to re-check your DNS:

1. Go to: https://github.com/MattttMan/Visenty/settings/pages
2. **Clear the custom domain field** (delete "visenty.com")
3. **Click Save**
4. **Wait 5 minutes**
5. **Re-enter** `visenty.com` in the custom domain field
6. **Click Save**

This triggers GitHub to re-verify your DNS configuration.

### STEP 4: Wait for DNS Propagation

After fixing DNS:
- **Minimum**: 2-4 hours
- **Maximum**: 24-48 hours
- GitHub needs to verify DNS from multiple locations worldwide

### STEP 5: Check HTTPS Status

After waiting:
1. Go to: https://github.com/MattttMan/Visenty/settings/pages
2. Check if "Enforce HTTPS" checkbox is now available
3. If yes → Check it and save ✅
4. If no → Wait longer and repeat Step 3

## 🔍 Verify DNS is Correct

Use this command to verify:
```bash
dig visenty.com A +noall +answer
```

**CORRECT output should show:**
```
visenty.com.    600    IN    A    185.199.108.153
visenty.com.    600    IN    A    185.199.109.153
visenty.com.    600    IN    A    185.199.110.153
visenty.com.    600    IN    A    185.199.111.153
```

**WRONG output (what you have now):**
```
visenty.com.    600    IN    A    185.199.108.153
visenty.com.    600    IN    A    185.199.109.153
visenty.com.    600    IN    A    185.199.110.153
visenty.com.    600    IN    A    185.199.111.153
visenty.com.    600    IN    A    76.223.105.230  ← DELETE THIS
visenty.com.    600    IN    A    13.248.243.5    ← DELETE THIS
```

## 🚨 Common Mistakes

- ❌ Leaving the extra 2 IP addresses
- ❌ Not waiting long enough after DNS changes
- ❌ Forgetting to remove and re-add domain in GitHub
- ❌ Checking too soon (DNS takes time)

## ✅ Checklist

- [ ] Deleted `76.223.105.230` A record
- [ ] Deleted `13.248.243.5` A record
- [ ] Only 4 GitHub IPs remain
- [ ] Removed and re-added domain in GitHub Pages settings
- [ ] Waited at least 2-4 hours
- [ ] Verified DNS with `dig` command
- [ ] Checked "Enforce HTTPS" is now available

## 📞 Still Not Working?

If after 48 hours it's still not working:
1. Verify DNS is 100% correct (only 4 IPs)
2. Check CNAME file exists in repository (it does ✅)
3. Try removing domain, waiting 1 hour, then re-adding
4. Contact GitHub Support with your repository URL

