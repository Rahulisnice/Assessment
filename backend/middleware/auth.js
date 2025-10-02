import JWT from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "unauthorized user",
        });
      } else {
        req.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Please provide Auth token",
      error,
    });
  }
};
