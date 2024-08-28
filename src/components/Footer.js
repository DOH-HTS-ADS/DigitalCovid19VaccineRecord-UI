import ReactGA from 'react-ga';
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import AppController from '../utils/AppController';



const Footer = () => {
    const { t, i18n } = useTranslation();
    const date = new Date();
    return (
        <footer className="footer">
            <div className="footerContainer">
                <ul style={{ paddingLeft: '0' }} className={i18n.dir(i18n.language) == "rtl"? "footerLinks footerLinksDirRtl" : "footerLinks footerLinksDirLtr"}>
                    <li><img src="/imgs/doh_logo_doh-black.png" width='240px' alt="Washington State Department of Health Logo" /></li>
                    <li>
                        <ReactGA.OutboundLink
                            eventLabel="ca_gov"
                            to={'https://www.doh.wa.gov/'}
                            target="_blank"
                        >
                            <Trans i18nKey="footer.home">doh.wa.gov home</Trans>
                        </ReactGA.OutboundLink>
                        {AppController.externalLink()}
                    </li>
                    <li>
                        <ReactGA.OutboundLink
                            eventLabel="wa_gov_use"
                            to={'https://www.doh.wa.gov/PrivacyandCopyright'}
                            target="_blank"
                        >
                            <Trans i18nKey="footer.conditionsofuse">Conditions of Use</Trans>
                        </ReactGA.OutboundLink>
                        {AppController.externalLink()}
                    </li>
                    <li>
                        <ReactGA.OutboundLink
                            eventLabel="wa_gov_privacy"
                            to={'https://www.doh.wa.gov/PrivacyandCopyright'}
                            target="_blank"
                        >
                            <Trans i18nKey="footer.privacypolicy">Privacy Policy</Trans>
                        </ReactGA.OutboundLink>
                        {AppController.externalLink()}
                    </li>
                    <li>
                        <ReactGA.OutboundLink
                            eventLabel="ca_gov_accessibility"
                            to={'https://www.doh.wa.gov/AboutUs/AccessibilityPolicyAboutInformationandData'}
                            target="_blank"
                        >
                            <Trans i18nKey="footer.accessibility">Accessibility</Trans>
                        </ReactGA.OutboundLink>
                        {AppController.externalLink()}
                    </li>
                    <li><a href="/faq"   rel="noopener noreferrer"><Trans i18nKey="footer.faq">FAQ</Trans></a></li>
                    <li><a href="/faq#NeedMoreHelp"  rel="noopener noreferrer"><Trans i18nKey="footer.contactus">Contact Us</Trans></a></li>
                </ul>
                <p className="footerCopyright">{<Trans i18nKey="footer.copyright">Copyright</Trans>} &copy; {date.getFullYear()} State of Washington</p>
            </div>
        </footer>
    )
}

export default Footer;