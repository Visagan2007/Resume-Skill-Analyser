import './Footer.css';
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import { FaXTwitter, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa6";
import Icon from './icon.png';


function Footer() {
    return (
        <footer className='Ffooter'>
            <div className='Ftop'>
                <div className='Fbrand'>
                    <div className='Flogo-box'>
                        <img src={Icon} alt="logo" className='Flogo-img' />
                    </div>
                    <div className='Fcontact'>
                        <MdLocationOn />
                        <p>50 S. 16th Street, Philadelphia, PA 19102</p>
                    </div>
                    <div className='Fcontact'>
                        <MdEmail />
                        <p>info@ritten.io</p>
                    </div>
                    <div className='Fcontact'>
                        <MdPhone />
                        <p>215-326-9369</p>
                    </div>
                    <div className='Fsocials'>
                        <a href="#"><FaXTwitter /></a>
                        <a href="#"><FaLinkedinIn /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaFacebookF /></a>
                    </div>
                </div>

                <div className='Fcol'>
                    <h4>Product</h4>
                    <ul>
                        <li><a href="#">Admissions</a></li>
                        <li><a href="#">Charting</a></li>
                        <li><a href="#">Billing</a></li>
                        <li><a href="#">Outcomes</a></li>
                    </ul>
                </div>

                <div className='Fcol'>
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Why Ritten</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Testimonials</a></li>
                    </ul>
                </div>

                <div className='Fcol'>
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
export default Footer;