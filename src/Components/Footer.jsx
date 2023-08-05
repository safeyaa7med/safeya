import logo from "../img/logo.png";
import facebook from "../img/facebook.png";
import instagram from "../img/instagram.png";
import linkedin from "../img/linkedin.png";
import twitter from "../img/twitter.png";
function Footer () {
    return (
        <div className="w-full bg-gray-800">
        <div className="container mx-auto py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img className="w-8" src={logo} alt="" />
            <span className="text-2xl font-bold text-white">Portwind.</span>
          </div>
          <span className="hidden md:block font-medium text-white">
            © 2023 Portwind. Design with ♥️ by a7med abdulshafi.
          </span>
          <div className="flex gap-2">
            <img className="w-4 cursor-pointer" src={facebook} alt="" />
            <img className="w-4 cursor-pointer" src={instagram} alt="" />
            <img className="w-4 cursor-pointer" src={twitter} alt="" />
            <img className="w-4 cursor-pointer" src={linkedin} alt="" />
          </div>
        </div>
      </div>
    )
}
export default Footer;