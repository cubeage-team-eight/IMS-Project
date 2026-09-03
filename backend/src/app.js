// import express from "express";
// import cors from "cors";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "IMS Backend API is running",
//   });
// });

// export default app;

import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "IMS Backend API is running",
  });
});

app.use("/api", routes);

export default app;