import Link from "../schema/links";
import { generateShortCode } from "../lib/generateShortCode";


export const createShortUrl = async (req:any,res:any) => {
  try {
    const { url, expiryIn } = req.body;

    if (!url) {
      res.status(400).json({ error: "URL is required." });
      return;
    }

    // Check if the URL already exists
    const existingLink = await Link.findOne({ fullLink: url });

    if (existingLink) {
      return res.status(200).json({
        message: "Short URL already exists",
        data: {
          fullLink: existingLink.fullLink,
          shortLink: `${req.protocol}://${req.get("host")}/${
            existingLink.shortLink
          }`,
          expiresAt: existingLink.expiry,
        },
      });
    }

    const shortLink = generateShortCode(7); // Generate new short link
    const expiryDate = expiryIn
      ? new Date(Date.now() + expiryIn * 60 * 1000)
      : new Date(Date.now() + 30 * 60 * 1000);

    const newLink = await Link.create({
      fullLink: url,
      shortLink,
      expiry: expiryDate,
    });

    res.status(201).json({
      message: "Short URL created successfully",
      data: {
        fullLink: newLink.fullLink,
        shortLink: `${req.protocol}://${req.get("host")}/${newLink.shortLink}`,
        expiresAt: newLink.expiry,
      },
    });
  } catch (err) {
    console.error("Error creating short URL:", err);
    res.status(500).json({ error: "Server error while creating short URL." });
  }
};
