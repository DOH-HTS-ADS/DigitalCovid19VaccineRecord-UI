import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { Trans, useTranslation } from "react-i18next";

const FAQScreen = () => {
  const [expanded01, setExpanded01] = useState(false);
  const [expanded02, setExpanded02] = useState(false);
  const [expanded03, setExpanded03] = useState(false);
  const [expanded04, setExpanded04] = useState(false);
  const [expanded05, setExpanded05] = useState(false);
  const [expanded06, setExpanded06] = useState(false);
  const [expanded07, setExpanded07] = useState(false);
  const [expanded08, setExpanded08] = useState(false);
  const [expanded09, setExpanded09] = useState(false);
  const [expanded10, setExpanded10] = useState(false);
  const [expanded11, setExpanded11] = useState(false);
  const [expanded12, setExpanded12] = useState(false);
  const [expanded13, setExpanded13] = useState(false);
  const [expanded14, setExpanded14] = useState(false);
  const [expanded15, setExpanded15] = useState(false);
  const [expanded16, setExpanded16] = useState(false);
  const toggleExpanded01 = () => {
    setExpanded01(!expanded01);
  }
  const toggleExpanded02 = () => {
    setExpanded02(!expanded02);
  }
  const toggleExpanded03 = () => {
    setExpanded03(!expanded03);
  }
  const toggleExpanded04 = () => {
    setExpanded04(!expanded04);
  }
  const toggleExpanded05 = () => {
    setExpanded05(!expanded05);
  }
  const toggleExpanded06 = () => {
    setExpanded06(!expanded06);
  }
  const toggleExpanded07 = () => {
    setExpanded07(!expanded07);
  }
  const toggleExpanded08 = () => {
    setExpanded08(!expanded08);
  }
  const toggleExpanded09 = () => {
    setExpanded09(!expanded09);
  }
  const toggleExpanded10 = () => {
    setExpanded10(!expanded10);
  }
  const toggleExpanded11 = () => {
    setExpanded11(!expanded11);
  }
  const toggleExpanded12 = () => {
    setExpanded12(!expanded12);
  }
  const toggleExpanded13 = () => {
    setExpanded13(!expanded13);
  }
  const toggleExpanded14 = () => {
    setExpanded14(!expanded14);
  }
  const toggleExpanded15 = () => {
    setExpanded15(!expanded15);
  }
  const toggleExpanded16 = () => {
    setExpanded16(!expanded16);
  }

  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = t("faqpage.title");
  });
  useEffect(() => {
    const qrEl = document.getElementsByTagName("h1")[0];
    qrEl.setAttribute("tabindex", "0")
    qrEl?.scrollIntoView();
    qrEl.focus();

  }, []);

  return (
    <div className={"container"}>
      <h1 style={{ color: "#C84C0E", fontSize: "38px", marginTop: "25px", textAlign: "center" }}>
        <Trans i18nKey="faqpage.title">
          WA Verify FAQ
        </Trans>
      </h1>
      <div class="col-sm-12">
          <h2 id="NeedMoreHelp">
            <Trans i18nKey="faqpage.needhelptitle">
              Need more help?
            </Trans>
          </h2>
          <Trans i18nKey="faqpage.needhelpcontent01">
            For questions and other assistance, contact:
          </Trans>
          <ul>
            <li style={{ listStyleType: "none" }}><Trans i18nKey="faqpage.needhelpcontent02">866-397-0337 or 360-236-3595</Trans></li>
            <li style={{ listStyleType: "none" }}><Trans i18nKey="faqpage.needhelpcontent03">8AM - 5PM, Monday-Friday</Trans></li>
            <li style={{ listStyleType: "none" }}><Trans i18nKey="faqpage.needhelpcontent05">Closed state holidays</Trans></li>
          </ul>
          <p style={{ paddingTop: 40 }}>
            <Trans i18nKey="faqpage.needhelpcontent06">
              <strong>NOTE</strong>: We're unable to update your <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19 Vaccine Record</a> over the phone.
              
              <a href="https://redcap.doh.wa.gov/surveys/?s=EEPH93H9H3" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Click here if your COVID-19 vaccination record is missing or incorrect</a>
            </Trans>
          </p>
        </div>
      <div class="row">
        <div class="col-sm-12">
          <dl class="faq" style={{ width: "90%", paddingLeft: 10 }}>
            <dt>
              <button aria-expanded={expanded01} aria-controls="faq01_desc" onClick={toggleExpanded01}>
                <Trans i18nKey="faqpage.01question">
                  What is a Digital COVID 19 Verification Record?
                </Trans>
              </button>
            </dt>
            <dd>
              <p id="faq01_desc" aria-hidden={!expanded01} style={{display: expanded01 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.01answer">
                  Your <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19 Vaccine Record</a> is an electronic vaccination record drawn from the
                  data stored in the state immunization registry. The digital record shows the same
                  information as your paper CDC COVID-19 vaccine card: your name, date of birth, vaccination
                  dates and type of vaccine you received. The digital record also includes a QR code that when
                  scanned by a SMART Health Card reader will display to the reader your name, date of birth,
                  vaccine dates and vaccine type. The QR code also confirms the vaccine record as an official
                  record of your state.
                </Trans>
                <hr/>
              </p>
              
            </dd>
            
            <dt>
              <button aria-expanded={expanded02} aria-controls="faq02_desc" onClick={toggleExpanded02}>
                <Trans i18nKey="faqpage.02question">
                  How will my verification record be delivered?
                </Trans>
              </button>
            </dt>
            <dd>
              <p id="faq02_desc" aria-hidden={!expanded02} style={{display: expanded02 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.02answer">
                  When your verification record is found, you will receive a link delivered to the email or
                  mobile phone number associated with the vaccination record. After entering your four-digit
                  PIN, you will see your COVID-19 verification information including your name, date of birth,
                  vaccination date(s), and vaccine manufacturer. You will also receive a scannable QR code
                  confirming your verification record is authentic.
                </Trans>
                <hr/>
              </p>
            </dd>
            <dt>
              <button aria-expanded={expanded03} aria-controls="faq03_desc" onClick={toggleExpanded03}>
                <Trans i18nKey="faqpage.03question">
                  Can I save my digital verification record on an iPhone?
                </Trans>
              </button>
            </dt>
            <dd>
              <div id="faq03_desc" aria-hidden={!expanded03} style={{display: expanded03 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.03answer">
                  <p>You can save your Digital verification record to the Apple Health app with the iOS 15
                  operating system. You will need to use your Safari web browser to complete the process.</p>
                  
                </Trans>
                <hr/>
              </div>
            </dd>
            <dt>
              <button aria-expanded={expanded04} aria-controls="faq04_desc" onClick={toggleExpanded04}>
                <Trans i18nKey="faqpage.04question">
                  Can I save my Digital verification record on an Android device?
                </Trans>
              </button>
            </dt>
            <dd>
              <div id="faq04_desc" aria-hidden={!expanded04} style={{display: expanded04 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.04answer">
                  <p>Yes. You can save your <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19 Vaccine Record</a> to Google Pay if you have
                  Android version 5 and Google Play Services version 21.18 or above.</p>
                  
                </Trans>
                <hr/>
              </div>
            </dd>

            <dt>
              <button aria-expanded={expanded05} aria-controls="faq05_desc" onClick={toggleExpanded05}>
                <Trans i18nKey="faqpage.05question">
                  If I get additional doses, will they show on my digital verification record?
                </Trans>
              </button>
            </dt>
            <dd>
              <div id="faq05_desc" aria-hidden={!expanded05} style={{display: expanded05 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.05answer">
                  <p>No. If you receive an additional dose or booster dose, it will not automatically reflect on
                  your digital verification record. You will need to start over in the <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19 Vaccine Record</a> system to retrieve a new QR code.</p>
                  <p>We recommend waiting 3-7 days for your new dose to show up in the Immunization Registry.</p>
                </Trans>
                <hr/>
              </div>
            </dd>

            <dt>
              <button aria-expanded={expanded06} aria-controls="faq06_desc" onClick={toggleExpanded06}>
                <Trans i18nKey="faqpage.06question">
                  When will my vaccine dose be available in my digital verification record?
                </Trans>
              </button>
            </dt>
            <dd>
              <p id="faq06_desc" aria-hidden={!expanded06} style={{display: expanded06 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.06answer">
                  Clinics vary in the length of time it takes to submit dose information to the Immunization
                  Registry. We recommend waiting 3-7 days for your dose to show up in the system. If your
                  record is still not located, you may <a href="#NeedMoreHelp" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>contact us</a>.
                </Trans>
                <hr/>
              </p>
            </dd>

            <dt>
              <button aria-expanded={expanded07} aria-controls="faq07_desc" onClick={toggleExpanded07}>
                <Trans i18nKey="faqpage.07question">
                  What if my record is not found?
                </Trans>
              </button>
            </dt>
            <dd>
              <div id="faq07_desc" aria-hidden={!expanded07} style={{display: expanded07 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.07answer">
                  <p>Your vaccine provider submits your vaccination record to the Immunization Registry, but they
                  may have provided information that's incomplete. So, it's likely we have your record, but
                  not your correct information. For instance:</p>
                  <ul>
                  <li>Mobile phone number or email address was not included or does not match</li>
                  <li>Name is spelled differently</li>
                  <li>Date of birth does not match</li>
                  </ul>
                  <p>To find your record, try re-entering your information with a different email or mobile number.
                  If your record still isn't found, contact your provider to update your vaccination record or
                  <a href="https://redcap.doh.wa.gov/surveys/?s=NH77DJDXKEWCCH8H" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>contact us</a> to request a review of your record. You'll be notified of our findings and
                  remediation actions within 2-3 weeks.</p>
                  <p>If you received your vaccination from a federal agency (like the Department of Defense, Indian
                  Health Services or Veterans Affairs), you will need to contact those agencies for assistance
                  with your vaccination.</p>
                </Trans>
                <hr/>
              </div>
            </dd>

            <dt>
              <button aria-expanded={expanded08} aria-controls="faq08_desc" onClick={toggleExpanded08}>
                <Trans i18nKey="faqpage.08question">
                  What if my Digital Verification Record is incorrect?
                </Trans>
              </button>
            </dt>
            <dd>
              <p id="faq08_desc" aria-hidden={!expanded08} style={{display: expanded08 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.08answer">
                  If the information on your Digital vaccine record is incorrect or missing a dose, has wrong
                  dates or incorrect brand), you may need to correct or update your immunization record. You
                  can contact your provider to update your record or <a href="https://redcap.doh.wa.gov/surveys/?s=NH77DJDXKEWCCH8H" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>contact us</a>. You will be notified of our
                  findings and remediation actions within 2-3 weeks.
                </Trans>
                <hr/>
              </p>
            </dd>

            <dt>
              <button aria-expanded={expanded09} aria-controls="faq09_desc" onClick={toggleExpanded09}>
                <Trans i18nKey="faqpage.09question">
                  How does the Digital COVID-19 Vaccine Record system work?
                </Trans>
              </button>
            </dt>
            <dd>
              <p id="faq09_desc" aria-hidden={!expanded09} style={{display: expanded09 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.09answer">
                  The <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19 Vaccine Record</a> system draws COVID-19 records from the state’s
                  immunization systems. Enter your name, date of birth, and an email or mobile phone number
                  associated with your vaccination record, then create a four-digit PIN number. If the
                  information you submitted matches the official record, you will receive a text or email with
                  a link to your <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19 Vaccine Record</a>. Enter the PIN you created to view the
                  record.
                </Trans>
                <hr/>
              </p>
            </dd>

            <dt>
              <button aria-expanded={expanded10} aria-controls="faq10_desc" onClick={toggleExpanded10}>
                <Trans i18nKey="faqpage.10question">
                  Will my information remain private?
                </Trans>
              </button>
            </dt>
            <dd>
              <div id="faq10_desc" aria-hidden={!expanded10} style={{display: expanded10 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.10answer">
                  <p>Yes. Filling out the form on the system does not provide instant access to your verification
                  record. The link to the verification record requires a PIN that you create and is sent only
                  to the mobile phone or email that is associated with your immunization record.</p>

                  <p>The QR code is a SMART Health Card, a secure copy of your verification record. More
                  information is at&nbsp;<a href="https://smarthealth.cards" target="SmartHealth" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }} >https://smarthealth.cards</a>. To protect your privacy, the QR code
                  can only be scanned and read by a SMART Health Card-compliant device.</p>
                </Trans>
                <hr/>
              </div>
            </dd>

            <dt>
              <button aria-expanded={expanded11} aria-controls="faq11_desc" onClick={toggleExpanded11}>
                <Trans i18nKey="faqpage.11question">
                  Can I reset my PIN?
                </Trans>
              </button>
            </dt>
            <dd>
              <div id="faq11_desc" aria-hidden={!expanded11} style={{display: expanded11 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.11answer">
                  <p>Yes. You have 24 hours from the time you receive the link to enter your four-digit PIN and
                  access your <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19 Vaccine Record</a>. If you don't, the link to your digital
                  record will expire, but you can start over and reset your PIN using the <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19
                  Verification Record</a> system.</p>

                  <p>If you can't remember your PIN, after 24 hours you can use the same process and create a new
                  PIN.</p>
                  <p><i>NOTE: Once you've accessed your digital record and saved your QR code, it does not
                    expire.</i></p>
                </Trans>
                <hr/>
              </div>
            </dd>
            <dt>
              <button aria-expanded={expanded12} aria-controls="faq12_desc" onClick={toggleExpanded12}>
                <Trans i18nKey="faqpage.12question">
                  Will this provide proof of my vaccine status?
                </Trans>
              </button>
            </dt>
            <dd>
              <div id="faq12_desc" aria-hidden={!expanded12} style={{display: expanded12 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.12answer">
                  <p>Yes. It is one of
                  <ReactGA.OutboundLink eventLabel="CoronaVirusLink" to={t("faqpage.vaccineVerificationLink")} target="CoronaVirus" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>
                    several options
                  </ReactGA.OutboundLink>
                  for providing your <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19 Vaccine Record</a>
                  and can be printed or shown digitally. You may also show your CDC provided COVID-19 card or
                  your state immunization record.</p>

                  <p>You are not required to obtain a <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19 Vaccine Record</a>. It is an optional
                  means to obtain your COVID-19 verification information, and is the digital version of your
                  paper verification record. It is one of the options to show proof of vaccination. The state
                  will not be implementing a mandatory passport system.</p>
                </Trans>
                <hr/>
              </div>
            </dd>

            <dt>
              <button aria-expanded={expanded13} aria-controls="faq13_desc" onClick={toggleExpanded13}>
                <Trans i18nKey="faqpage.13question">
                  What if I need to replace my vaccination card?
                </Trans>
              </button>
            </dt>
            <dd>
              <p id="faq13_desc" aria-hidden={!expanded13} style={{display: expanded13 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.13answer">
                  The system provides a digital copy of your verification record. If you’ve lost your paper
                  verification record, you may print out your digital record and use it. If you lose your
                  <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19 Vaccine Record</a>, you can start the process over on the system.
                </Trans>
                <hr/>
              </p>
            </dd>

            <dt>
              <button aria-expanded={expanded14} aria-controls="faq14_desc" onClick={toggleExpanded14}>
                <Trans i18nKey="faqpage.14question">
                  What happens to my information after I share it?
                </Trans>
              </button>
            </dt>
            <dd>
              <p id="faq14_desc" aria-hidden={!expanded14} style={{display: expanded14 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.14answer">
                  Your <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19 Vaccine Record</a> shows the same information as your paper CDC
                  vaccine card. You can ask organizations that will scan the QR code in your <a href="/" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>Digital COVID-19
                  Verification Record</a> how they will use your data or if they will keep it. Only you can decide
                  how and when to share your record.
                </Trans>
                <hr/>
              </p>
            </dd>

            <dt>
              <button aria-expanded={expanded15} aria-controls="faq15_desc" onClick={toggleExpanded15}>
                <Trans i18nKey="faqpage.15question">
                  What if I made multiple vaccination appointments for multiple people with a single phone
                  number?
                </Trans>
              </button>
            </dt>
            <dd>
              <p id="faq15_desc" aria-hidden={!expanded15} style={{display: expanded15 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.15answer">
                  If you are a parent or guardian and have created multiple appointments with a single phone
                  number or email, enter the requests one at a time to receive separate links for each
                  verification record.
                </Trans>
                <hr/>
              </p>
            </dd>

            <dt>
              <button aria-expanded={expanded16} aria-controls="faq16_desc" onClick={toggleExpanded16}>
                <Trans i18nKey="faqpage.16question">
                  Is WA Verify free to use?
                </Trans>
              </button>
            </dt>
            <dd>
              <p id="faq16_desc" aria-hidden={!expanded16} style={{display: expanded16 ? "block" : "none"}} class={i18n.dir(i18n.language)=="rtl"?"descRtl":"desc"}>
                <Trans i18nKey="faqpage.16answer">
                  WA Verify is a free tool that can be used to access your digital COVID-19 verification 
                  record.  You should not be asked to provide any payment information.  If you are prompted 
                  to pay for this service, exit the application immediately.
                </Trans>
                <hr/>
              </p>
            </dd>
          </dl>
        </div>
        
      </div>
    </div>
  );
};

export default FAQScreen;
