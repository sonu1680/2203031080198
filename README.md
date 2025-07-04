# 🔗 URL Shortener

A fullstack URL shortener app built with **Next.js** and **Node.js**, supports expiry, and detailed link tracking.

---



Send a `POST` request to short the url:
http://localhost:3001/api/v1/shorturls
![Screenshot 2025-06-23 144835](https://github.com/user-attachments/assets/4503b48b-b0e2-4e59-913e-133a87d84345)

body:
{
"url":"https://www.amazon.in",
"expiry":"2025-07-23T12:41:22.000Z"

}

response:
{
    "message": "Short URL created successfully",
    "data": {
        "fullLink": "https://www.amazon.in",
        "shortLink": "http://localhost:3001/WXnknrB",
        "expiresAt": "2025-06-23T09:48:26.652Z"
    }
}

Send a `GET` request to get history:

 http://localhost:3001/api/v1/link/id
![Screenshot 2025-06-23 144939](https://github.com/user-attachments/assets/54ddb60e-497e-4e5a-9d86-fc4b90e21541)

query:link id
resonse {
    "message": "Link details fetched successfully",
    "data": {
        "fullLink": "https://www.amazon.in",
        "shortLink": "http://localhost:3001/WXnknrB",
        "clicks": 1,
        "expiry": "2025-06-23T09:48:26.652Z",
        "clickHistory": [
            {
                "clickedAt": "2025-06-23T09:19:29.130Z",
                "ip": "::1"
            }
        ]
    }
}

