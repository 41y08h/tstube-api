import IUser from "../../interfaces/IUser";
import handler from "../../lib/handler";
import AuthService from "../../services/Auth";

const completeOAuth = handler((req, res) => {
  const token = AuthService.serializeUser(req.user as IUser);
  res.redirect(`${process.env.AUTH_REDIRECT_URL}?token=${token}`);
});

export default completeOAuth;
