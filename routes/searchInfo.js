const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const axios = require("axios");
const router = express.Router();

router.use(body_parser.json(), cors());

router.post("/foundHouse", async (req, res) => {
  try {
    console.log("toto");
    const response = await axios.post(
      "https://api.leboncoin.fr/finder/search",
      {
        limit: 35,
        limit_alu: 3,
        filters: {
          category: { id: "9" },
          enums: { ad_type: ["offer"], real_estate_type: ["1", "2"] },
          location: {
            locations: [
              {
                locationType: "department",
                label: "Seine-Saint-Denis (93)",
                department_id: "93",
                region_id: "12"
              }
            ]
          },
          keywords: {},
          ranges: {
            price: {
              min: Number(req.body.prixMin),
              max: Number(req.body.prixMax)
            },
            square: {
              min: Number(req.body.surfaceMin),
              max: Number(req.body.SurfaceMax)
            },
            rooms: {
              min: Number(req.body.nbrPieceMin),
              max: Number(req.body.nbrPieceMax)
            }
          }
        }
      },
      {
        headers: {
          "content-type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
          Origin: "https://www.leboncoin.fr",
          Referer: "https://www.leboncoin.fr/annonces/offres/ile_de_france/",
          "Content-Length": 362,
          "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
          "Accept-Encoding": "gzip, deflate, br",
          Accept: "*/*",
          api_key: "ba0c2dad52b3ec",
          Connection: "keep-alive",
          Host: "api.leboncoin.fr",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site"
        }
      }
    );
    console.log(response.data.ads);

    res.json(response.data.ads);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

module.exports = router;
