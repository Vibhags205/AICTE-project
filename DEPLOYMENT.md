# Lecture Notes Generator - Cloud Deployment Guide

## Step-by-Step Deployment to Railway.app

### Prerequisites
- [Railway.app account](https://railway.app) (free tier available)
- GitHub account with your repo pushed
- Vercel account (frontend already deployed)

## Backend Deployment (Railway.app)

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Dockerfile for Railway deployment"
git push
```

### 2. Deploy Backend to Railway
1. Go to [railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select your `lecture_notes_generator` repository
4. Railway will auto-detect the Dockerfile
5. Click **Deploy**

### 3. Configure Environment Variables on Railway
1. Go to your Railway project
2. Click the service → **Variables**
3. Add:
   - `OLLAMA_MODEL=mistral` (or your preferred model)
   - `NOTES_MAX_CHARS=800`
   - `PORT=8000`

### 4. Get Your Backend URL
1. In Railway, click your service
2. Copy the public URL (looks like: `https://your-service-name-production.up.railway.app`)
3. Add `/upload` to test: should show an error (expected, no file)

## Frontend Deployment (Update Vercel)

### 1. Add Environment Variable to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your frontend project
3. Go to **Settings** → **Environment Variables**
4. Update or add:
   - **Name:** `VITE_API_BASE`
   - **Value:** `https://your-service-name-production.up.railway.app` (your Railway backend URL)
   - Click **Save**

### 2. Redeploy Frontend
```bash
# Option 1: Push to trigger auto-redeploy
git add .
git commit -m "Update API base URL"
git push

# Option 2: Manual redeploy from Vercel dashboard
# Click "Deployments" → "..." → "Redeploy"
```

## Testing

### 1. Test Backend Health
```
GET https://your-railway-url/health
```
Should return: `{"status":"Backend is running!"}`

### 2. Test Full Flow
- Upload an audio file in your Vercel frontend
- Should now work with Railway backend!

## Troubleshooting

### Backend won't start
- Check Railway logs: Project → Service → Logs
- Common issue: Ollama model not pulling in time
- Solution: Wait 2-3 minutes for first deployment, model pulls on startup

### CORS errors
- Already configured in FastAPI (allows all origins)
- If issues persist, check Railway logs

### Slow uploads
- Train transcription can take time
- Ensure timeout is set to 10+ minutes in frontend

## Important Notes
- ⚠️ Railway free tier has limits - check their pricing
- Ollama container is ~5GB, may hit Railway limits
- Consider upgrading Railway if it's too slow/limited
- Alternative: Use Groq API or OpenAI instead of Ollama for faster processing

## Alternative Platforms
If Railway doesn't work:
- **Render**: Similar setup, good free tier
- **Hugging Face Spaces**: Good for ML models
- **Replicate API**: Use instead of Ollama for fast inference
