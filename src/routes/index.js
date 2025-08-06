import express from 'express';
const router = express.Router();
import userRouter from "./user.routes"
import noteRouter from './notes.routes'
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
  
  router.use("/notes",noteRouter)
  return router;
};

export default routes;
