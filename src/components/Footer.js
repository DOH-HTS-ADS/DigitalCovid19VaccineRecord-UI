import React from 'react';
import ReactGA from 'react-ga';
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import faqLinkLanguage from "../utils/faqLinkLanguage";
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
                            t("footer.home")
                        </ReactGA.OutboundLink>
                        {AppController.externalLink()}
                    </li>
                    <li>
                        <ReactGA.OutboundLink
                            eventLabel="wa_gov_use"
                            to={'https://www.doh.wa.gov/PrivacyandCopyright'}
                            target="_blank"
                        >
                            t("footer.conditionsofuse")
                        </ReactGA.OutboundLink>
                        {AppController.externalLink()}
                    </li>
                    <li>
                        <ReactGA.OutboundLink
                            eventLabel="wa_gov_privacy"
                            to={'https://www.doh.wa.gov/PrivacyandCopyright'}
                            target="_blank"
                        >
                            t("footer.privacypolicy")
                        </ReactGA.OutboundLink>
                        {AppController.externalLink()}
                    </li>
                    <li>
                        <ReactGA.OutboundLink
                            eventLabel="ca_gov_accessibility"
                            to={'https://www.doh.wa.gov/AboutUs/AccessibilityPolicyAboutInformationandData'}
                            target="_blank"
                        >
                            t("footer.accessibility")
                        </ReactGA.OutboundLink>
                        {AppController.externalLink()}
                    </li>
                    <li><a href="/faq"   rel="noopener noreferrer">t("footer.faq")</a></li>
                    <li><a href="/faq#NeedMoreHelp"  rel="noopener noreferrer">t("footer.contactus")</a></li>
                </ul>
                <p className="footerCopyright">{t("footer.copyright")} &copy; {date.getFullYear()} State of Washington</p>
            </div>
        </footer>
    )
}

export default Footer;