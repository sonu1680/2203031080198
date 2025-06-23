import Link from "../schema/links";
import ClickHistory from "../schema/history";

export const getLinkDetails = async (req: any, res: any) => {
  const { id: shortLink } = req.params;

  try {
    const link = await Link.findOne({ shortLink });

    if (!link) {
      res.status(404).json({ error: "Short link not found" });
      return;
    }

    const history = await ClickHistory.find({ linkId: link._id }).sort({
      clickedAt: -1,
    });

    res.status(200).json({
      message: "Link details fetched successfully",
      data: {
        fullLink: link.fullLink,
        shortLink: `${req.protocol}://${req.get("host")}/${link.shortLink}`,
        clicks: link.clicks,
        expiry: link.expiry.toISOString(),
        clickHistory: history.map((entry) => ({
          clickedAt: entry.clickedAt.toISOString(),
          ip: entry.ip,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching link details:", error);
    res.status(500).json({ error: "Server error fetching link details" });
  }
};
