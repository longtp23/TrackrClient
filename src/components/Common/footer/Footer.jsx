import { ExpandLess, Facebook, Instagram, Twitter } from "@mui/icons-material"
import "./footer.scss"

export const Footer = () => {
  return (
    <div className="footerContainer">
        <div className="footerLine1">
            <div className="left">
                <span>Contact Us</span>
                <span>Privacy Policy</span>
                <span>Status</span>
            </div>
            <div className="right">Back to top <ExpandLess/></div>
        </div>
        <div className="footerLine2">
            <span>Join our community</span>
            <span><Facebook fontSize="large"/></span>
            <span><Instagram fontSize="large"/></span>
            <span><Twitter fontSize="large"/></span>
        </div>
        <p>© Trackr 2023. All rights reserved.</p>
    </div>
  )
}
