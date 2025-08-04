import express from 'express';
const router = express.Router();
import userRouter from "../routes/user.routes"
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use("/user",userRouter)
  return router;
};

export default routes;
