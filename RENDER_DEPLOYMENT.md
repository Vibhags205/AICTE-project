# Deploy to Render + Vercel

## Quick Deployment Guide

### Part 1: Backend on Render.com

#### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Add Docker config for Render deployment"
git push
```

#### 2. Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub (easiest)

#### 3. Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `lecture_notes_generator`
3. Configure:
   - **Name:** `lecture-notes-backend` (or your choice)
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** Leave blank
   - **Runtime:** **Docker**
   - **Instance Type:** **Free** (or paid for better performance)

#### 4. Add Environment Variables
In the Environment section, add:
```
OLLAMA_HOST=http://127.0.0.1:11434
OLLAMA_MODEL=mistral
NOTES_MAX_CHARS=800
PORT=8000
```

#### 5. Deploy!
- Click **"Create Web Service"**
- Wait 10-15 minutes for first deployment (Ollama downloads ~4GB model)
- Watch the logs to see progress

#### 6. Get Your Backend URL
- Once deployed, copy the URL (looks like: `https://lecture-notes-backend.onrender.com`)
- Test it: `https://your-url.onrender.com/health`
- Should return: `{"status":"Backend is running!"}`

---

### Part 2: Frontend on Vercel

#### 1. Go to Vercel Dashboard
- Visit [vercel.com/dashboard](https://vercel.com/dashboard)
- Find your frontend project

#### 2. Update Environment Variable
1. Click your project → **Settings** → **Environment Variables**
2. Find or add `VITE_API_BASE`
3. Set value to: `https://your-render-backend-url.onrender.com`
4. Click **Save**

#### 3. Redeploy Frontend
**Option A - Auto redeploy (from VS Code):**
```bash
git add .
git commit -m "Update API URL for Render backend"
git push
```
Vercel will auto-deploy when it detects the push.

**Option B - Manual redeploy:**
1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** tab
3. Click **"..."** on latest deployment → **Redeploy**

---

## Testing Your Deployment

### 1. Test Backend Health
```
GET https://your-render-url.onrender.com/health
```
Expected: `{"status":"Backend is running!"}`

### 2. Test Frontend
- Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
- Upload an audio file
- Should generate notes successfully! 🎉

---

## Important Notes

### ⚠️ Render Free Tier Limitations
- **Spins down after 15 min of inactivity**
- First request after spin-down takes ~1-2 minutes (cold start)
- Solution: Upgrade to paid tier ($7/month) for always-on service

### 🚀 Performance Tips
- **Render Paid Plan** recommended for production use
- Free tier is fine for testing/portfolio projects
- Ollama container is ~5GB, may take time on first deploy

### 🐛 Troubleshooting

#### "Application failed to respond"
- Check Render logs: Click your service → **Logs** tab
- Common issue: Ollama still downloading model
- Wait 10-15 minutes on first deploy

#### CORS errors
- Already configured in FastAPI (`allow_origins=["*"]`)
- If issues persist, check backend logs

#### Backend URL not working
- Make sure you copied the HTTPS URL (not HTTP)
- Ensure `/health` endpoint works before testing full app
- Check environment variables are set correctly

---

## Cost Summary

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Render** | ✅ 750 hrs/month (spins down) | $7/month (always on) |
| **Vercel** | ✅ Unlimited (hobby projects) | $20/month (pro) |

**Total Cost:** $0 (with limitations) or $7/month (recommended)

---

## Alternative: Keep Backend Running 24/7

If you want to avoid cold starts on Render free tier:

### Option 1: Use Cron Job Ping Service
- [Uptime Robot](https://uptimerobot.com) (free)
- Ping your backend every 14 minutes
- Keeps it from spinning down

### Option 2: Upgrade to Render Paid
- $7/month for always-on instance
- Faster performance, no cold starts

---

## Need Help?

Common issues:
1. **Backend won't start:** Check Render logs for errors
2. **Ollama connection failed:** Ensure `OLLAMA_HOST=http://127.0.0.1:11434`
3. **Frontend can't reach backend:** Double-check `VITE_API_BASE` URL in Vercel
4. **Slow first request:** Normal on free tier (cold start)

Good luck! 🚀
