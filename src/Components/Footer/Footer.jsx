import './Footer.css';
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import { FaXTwitter, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Icon from './icon.png';


function Footer() {
    return (
        <footer className='Ffooter'>
            <div className='Ftop'>
                <div className='Fbrand'>
                    <div className='Flogo-box'>
                        <img src={Icon} alt="Resume Skill Analyser logo" className='Flogo-img' />
                    </div>
                    <div className='Fcontact'>
                        <MdLocationOn />
                        <p>50 S. 16th Street, Philadelphia, PA 19102</p>
                    </div>
                    <div className='Fcontact'>
                        <MdEmail />
                        <p>info@rsa.io</p>
                    </div>
                    <div className='Fcontact'>
                        <MdPhone />
                        <p>215-326-9369</p>
                    </div>
                    <div className='Fsocials'>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (Twitter)"><FaXTwitter /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn"><FaLinkedinIn /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram"><FaInstagram /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook"><FaFacebookF /></a>
                    </div>
                </div>

                <div className='Fcol'>
                    <h4>Product</h4>
                    <ul>
                        <li><Link to="/Analyze">Analyze</Link></li>
                        <li><Link to="/AboutUs">About Us</Link></li>
                    </ul>
                </div>

                <div className='Fcol'>
                    <h4>Company</h4>
                    <ul>
                        <li><Link to="/#features">Features</Link></li>
                        <li><Link to="/AboutUs">Why RSA</Link></li>
                    </ul>
                </div>

                <div className='Fcol'>
                    <h4>Support</h4>
                    <ul>
                        <li><Link to="/AboutUs">Contact Us</Link></li>
                        <li><a href="#privacy" aria-label="Privacy Policy">Privacy Policy</a></li>
                        <li><a href="#terms" aria-label="Terms of Service">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
export default Footer;