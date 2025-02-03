const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = "9158a5a9-9572-4766-a392-343bc7e51734";
const CLIENT_SECRET = "QJfCXEkokFFLRK6ZQ5yv78kBJQOFunOhMWvbx4wgcmk";

app.post("/get-token", async (req, res) => {
  try {
    const response = await fetch("https://login.mypurecloud.ie/oauth/token", {
      method: "POST",
      headers: {
        "Authorization": "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve access token" });
  }
});

app.listen(3000, () => console.log("Proxy server running on port 3000"));
