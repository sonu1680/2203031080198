import Link from "../schema/links";
import ClickHistory from "../schema/history";

export const handleRedirect = async (req:any, res:any) => {
  const { id: shortLink } = req.params;

  try {
    const link = await Link.findOne({ shortLink });

    if (!link) {
      res.status(404).send("Short URL not found");
      return;
    }

    link.clicks += 1;
    await link.save();

    await ClickHistory.create({
      linkId: link._id,
      clickedAt: new Date(),
      ip: req.ip,
    });

    res.redirect(link.fullLink);
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).send("Server error during redirect");
  }
};
