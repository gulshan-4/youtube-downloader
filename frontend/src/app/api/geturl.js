export default function handler(req, res) {
    // Get the URL from the request object
    const url = req.url;
  
    // Respond with the URL or process it as needed
    res.status(200).json({ url });
  }