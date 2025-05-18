import express from "express";
import cors from 'cors';

// create express app
const akuaadanfuapp = express();

// Apply middleware
akuaadanfuapp.use(cors({ credentials: true, origin: '*' }));
akuaadanfuapp.use(express.json({ limit: "50mb" }));
akuaadanfuapp.use(express.urlencoded({ limit: "50mb", extended: true }));

// Listen for incoming requests
const port = process.env.PORT || 8080;
akuaadanfuapp.listen(port, () => {
  console.log(`AkuaAdanfu App listening on port ${port}`);
});
