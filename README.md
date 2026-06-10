# Photo Factory Rwanda

Next.js storefront for Photo Factory Rwanda, an electronics, photography, video, and content creation equipment retailer in Kigali.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS
- MongoDB for future products, orders, and admin data
- Cloudinary for product images and media
- Vercel for hosting

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in real values.

For Vercel, add these variables in Project Settings > Environment Variables:

- `MONGODB_URI`
- `MONGODB_DB`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Rotate any credentials that have been shared in chat or public channels before production deployment.

## Deploy on Vercel

1. Push this repo to GitHub.
2. In Vercel, choose **Add New > Project**.
3. Import `luckyusY/photo-factory-rwanda`.
4. Framework preset: **Next.js**.
5. Add the environment variables above.
6. Deploy.
