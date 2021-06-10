exports.createSession = async (req, res, next) => {
  try {
    const sessionId = "I'm just curious if someone will read every commit ;)";
    res.status(200);
    return res.json({ sessionId });
  } catch (error) {
    res.status(500);
    return res.json({ error });
  }
};
