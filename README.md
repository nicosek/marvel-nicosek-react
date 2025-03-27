# 🌟 Marvel React App

A sleek, full-featured Marvel web app built with **React**, showcasing your favorite **characters** and **comics** from the Marvel Universe.

> ✅ **Live demo**: [https://marvel-react-nicosek.netlify.app](https://marvel-react-nicosek.netlify.app)

---

## 🔥 Features

- 🎨 **Responsive UI** with smooth animations and a modern design.
- 📚 **Paginated lists** of **comics** and **characters**.
- 🔍 **Search functionality** for both comics and characters.
- 👤 **Search comics by character name**, with smart **autocomplete**.
- 🧾 **Detailed views** for each **character** and **comic**.
- 🧭 **Header navigation** with clear access to pages and user controls.
- 🔐 **Authentication system** (Login / Signup with persistent cookies).
- ⭐ **Favorite system** for logged-in users (toggle comic/character as favorite).

---

## 🧪 Tech Stack

- **React** (with hooks)
- **React Router**
- **Axios** (for API calls)
- **Netlify** (for deployment)
- **Cookies** and **LocalStorage** for persistent user state
- **Custom Loader** and **Autocomplete** components

---

## 🚀 Getting Started (Local)

```bash
git clone https://github.com/your-username/marvel-react-app.git
cd marvel-react-app
npm install
npm run dev
```

Make sure you have the backend API running locally, or set the API base URL in your environment config.

A compatible backend for this project is available here:  
👉 [https://github.com/nicosek/marvel-api-nicosek](https://github.com/nicosek/marvel-api-nicosek)

By default, the frontend connects to the deployed backend at:  
`https://api--marvel-by-nicosek--597s2ywdhx54.code.run`

To use it, create a `.env` file at the root of the project with:

```env
VITE_API_URL=https://api--marvel-by-nicosek--597s2ywdhx54.code.run
```

⚠️ This public backend is currently available, but may be taken down in the future. For long-term use, consider hosting your own instance.

## 📌 Notes
This app is currently connected to a custom backend hosted on Code.run and displays live Marvel data from a third-party API (proxied through our backend).

You’ll need a valid backend token to access favorites and authentication features.
