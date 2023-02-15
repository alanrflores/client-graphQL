import React from "react";
import "./footer.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

const Footer = () => {
  return (
    <div className="div-footer">
    <div className="footerPadre">
      <div className="footerContainer">
        <div className="footerRegister">
          <h4>Local más cercano</h4>
          <h4>Regístrese para recibir noticias</h4>
        </div>
        <div className="footerAbout">
          <h4>Acerca de las zapatillas</h4>
          <span>Noticias</span>
        </div>
        <div className="footerSocialRed">
          <div className="divSocialRed">
            <TwitterIcon sx={{ fontSize: 26, color: "white", margin: "4px" }} />
            <InstagramIcon
              sx={{ fontSize: 26, color: "white", margin: "4px" }}
            />
            <FacebookIcon
              sx={{ fontSize: 26, color: "white", margin: "4px" }}
            />
            <LinkedInIcon
              sx={{ fontSize: 26, color: "white", margin: "4px" }}
            />
          </div>
        </div>
      </div>
      <div className="divTerms">
        <div className="divTitle">
          <span style={{ marginLeft: 10, padding: 2, color: "white" }}>
            {" "}
            <FmdGoodIcon /> Argentina
          </span>
          <span style={{ marginLeft: 10, padding: 10 }}>
            © 2023 SNKRS, Inc. Reservados todos los derechos.
          </span>
        </div>
        <div className="divSubTitle">
          <span style={{ marginRight: 20, padding: 10 }}>Condiciones de uso</span>
          <span style={{ marginRight: 20, padding: 10 }}>Política de privacidad</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer;
