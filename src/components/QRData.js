import React, { useEffect, useCallback, useRef, download } from "react";
import { Trans, useTranslation } from "react-i18next";
import ReactGA from 'react-ga';
//import AppController from "../utils/AppController";
import PrintIcon from '@material-ui/icons/Print';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// eslint-disable-next-line no-unused-vars
import html2canvas from "html2canvas";
import Canvas2Image from "../utils/canvas2image";
import { toPng } from 'html-to-image';



const QRData = ({ user, qr, apple, google, isMobile }) => {
  const { i18n, t } = useTranslation();
  const english_i18n = i18n.createInstance({
    supportedLngs: ['en-US']
  }, (err, t) => {
    if (err) return console.log('something went wrong loading', err);
    t('key');
  });
  useEffect(() => {
    const qrEl = document.getElementById("qr_img");
    qrEl.scrollIntoView();

  }, []);

  const buildPdf = () => {

    const dataItem = document.querySelectorAll(".qrDataItem");
    let printWindow = window.open('', '', 'height=400', 'width=500');
    var floatDir = i18n.dir(i18n.language) == "ltr" ? "right" : "left";

    window.setTimeout(function () {
      printWindow.addEventListener("afterprint", function () {
        printWindow.close();
      }, false);
    }, 0);

    printWindow.document.write('<html><head><title>Digital COVID-19 Vaccine Record</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(`<div style="width:300px;padding-left:10px;"><img width="100px" height="27px" src="/imgs/waverifylogo.png" /><span style="float: ${floatDir};padding-top:10px;font-family:Public Sans, sans-serif;">State of Washington</span></div>`);
    printWindow.document.write(`<img className="actual-qr-img" width = "322px" height = "322px" alt = "VaccineQrCode" src = ${qr} id = { 'id-qr-img'} /> `);
    printWindow.document.write(`<div style="width:300px;padding-left:10px;"><span style="font-size:18px;font-weight:700;font-family:Public Sans, sans-serif;">SMART Health Card</span><img src="/imgs/smart-logo.png" alt="Smart Health Card" style="width:60px;height:31.69px;float:${floatDir};" /></div>`);
    printWindow.document.write('<p style="margin: 0; padding: 0; line-height: 0;" />');

    dataItem.forEach((item, idx) => {
      printWindow.document.write(`<div style="width:700px;">${item.innerHTML}</div>`);
      printWindow.document.write('<p style="margin: 0; padding: 0; line-height: 0;" />');
      if (idx % 3 === 1) {
        printWindow.document.write('<hr />');
      }
    });

    printWindow.document.write('</body></html>');
    printWindow.document.body.dir = i18n.dir(i18n.language);
    printWindow.document.close();
    printWindow.print();
  }

  const handleImageSave = async () => {
    const qrDiv = document.getElementById('data-for-image');
    if (window.screen.width > 768) {
      qrDiv.style.padding = '20%';
    }

    //html2canvas(qrDiv).then((canvas) => Canvas2Image.saveAsPNG(canvas));

    if (qrDiv.current === null) {
      console.write('error attempting to create and download file: could not find data-for-image');
      return;
    }
    try {
      const dataUrl = await toPng(qrDiv.current);
      const link = document.createElement('qrDownload');
      link.href = dataUrl;
      link.download = 'qr-and-vaccines.png';
      document.body.appendChild(link);
      link.click();
      //document.body.removeChild(link);
      var img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    } catch (error) {
      console.error('error attempting to create and download file: ', error);
    }      


    qrDiv.style.padding = '0px';
  }

  const handlePdfSave = () => {
    buildPdf();
  }

  let isVersionGood;
  let showMessage = false;
  const userAgent = navigator.userAgent;

  if (apple === true && isMobile() === "A") {
    const indexOfOS = userAgent.indexOf('OS');
    const versionStr = userAgent.substring(indexOfOS + 2, indexOfOS + 5);
    isVersionGood = Number.parseInt(versionStr) >= 15;

    if (navigator.userAgent.match("CriOS") || navigator.userAgent.match("FxiOS")) {
      showMessage = true;
    }
  }

  const useStyles = makeStyles({
    button: {
      '&:hover': {
        color: '#ffffff'
      }
    },
    buttonLeft: {
      '&:hover': {
        color: '#ffffff'
      },
      marginLeft: '2%'
    },
    buttonRight: {
      '&:hover': {
        color: '#ffffff'
      },
      marginRight: '2%'
    }
  });
  const classes = useStyles();
  useEffect(() => {
    const qrEl = document.getElementsByTagName("h1")[0];
    qrEl.setAttribute("tabindex", "0")
    qrEl?.scrollIntoView();
    qrEl.focus();

  }, []);
  useEffect(() => {
    document.title = t("qrpage.title");

  });
  return (
    <div className={'center-w-margin'}>
      <div>
        <h1 style={{ color: "#C84C0E", fontSize: "38px", marginTop: "20px", overflowWrap: "break-word" }}>
        {i18n.language.indexOf("en") !== 0 ? (
          <>
          <Trans i18nKey="qrpage.title">
            Personal Digital COVID-19 Verification Record
          </Trans>
          &nbsp;/&nbsp;
          </>
          ) : null}
          <span dir="ltr" lang="en"><Trans i18nKey="qrpage.title" i18n={english_i18n}>
            Personal Digital COVID-19 Verification Record
          </Trans></span>
        </h1>
      </div>
      <div className={'qr-flex'} style={{ display: "flex", flexWrap: "wrap" }} id={'data-for-image'}>
        <div className={i18n.dir(i18n.language) == "rtl"? "qrDivRtl" : "qrDiv" } id="qr_img">
          <div className="qrImg" >
            <img alt={t("header.waverifylogoalt")} width="100px" src="/imgs/waverifylogo.png" />
              State of Washington
          </div>
          <img
            className={i18n.dir(i18n.language) == "rtl" ? 'actual-qr-img-rtl' : 'actual-qr-img'}
            width="322px"
            height="322px"
            alt={"VaccineQrCode"}
            src={qr}
            id={'id-qr-img'}
          />
          <div className="smarthealthcard-container d-flex justify-content-between">
            <span style={{ fontWeight: "700", fontSize: "18px" }}>
                SMART Health Card
            </span>
            <a href={'https://smarthealth.cards/'} target="_blank" rel="noopener noreferrer" style={{ margin: 'inherit' }}>
              <img
                src="/imgs/smart-logo.png"
                alt="Smart Health Card"
                style={{ alignSelf: "baseline", width: "60px", minHeight: "48px" }}
              />
            </a>
          </div>

        </div>

        <div className="dataDiv" id="data-div">
          
          <p className="qrDataItem">
            <bdi>
              {i18n.language.indexOf("en") !== 0 ? (
                <>
                <Trans i18nKey="qrpage.name">Name: </Trans>
                {' '}/{' '}
                </>
              ) : null}

              <span dir="ltr" lang="en"><Trans i18nKey="qrpage.name" i18n={english_i18n}>Name</Trans></span>:{' '}
              <span dir="ltr">{user.suffix == null ? `${user.firstName} ${user.middleName} ${user.lastName}` : `${user.firstName} ${user.middleName} ${user.lastName} ${user.suffix}`}</span>
            </bdi>
          </p>
          <p className="qrDataItem">
            <bdi>
              {i18n.language.indexOf("en") !== 0 ? (
                <>
                <Trans i18nKey="qrpage.dateofbirth">DOB: </Trans>
                {' '}/{' '}
                </>
              ) : null}

              <span dir="ltr" lang="en"><Trans i18nKey="qrpage.dateofbirth" i18n={english_i18n}>DOB</Trans></span>:{' '}
              <span dir="ltr">{user.dob}</span>
            </bdi>
          </p>
          <hr />
          <ol>
          {user.doses.map((dose, idx) => (
            <li key={`dose${idx}`}>
              <p className="qrDataItem">
                <bdi>
                  {i18n.language.indexOf("en") !== 0 ? (
                    <>
                    <Trans i18nKey="qrpage.date">Date: </Trans>
                    {' '}/{' '}
                    </>
                  ) : null}

                  <span dir="ltr" lang="en"><Trans i18nKey="qrpage.date" i18n={english_i18n}>Date</Trans></span>:{' '}
                  <span dir="ltr">{dose.doa}</span>
                </bdi>
              </p>
              <p className="qrDataItem">
                <bdi>
                  {i18n.language.indexOf("en") !== 0 ? (
                    <>
                    <Trans i18nKey="qrpage.type">Type/Mfr: </Trans>
                    {' '}/{' '}
                    </>
                  ) : null}

                  <span dir="ltr" lang="en"><Trans i18nKey="qrpage.type" i18n={english_i18n}>Type/Mfr.</Trans></span>:{' '}
                  <span dir="ltr">{dose.type}</span>
                </bdi>
              </p>
              <p className="qrDataItem">
                <bdi>
                  {i18n.language.indexOf("en") !== 0 ? (
                    <>
                    <Trans i18nKey="qrpage.flotnumber">Lot Number: </Trans>
                    {' '}/{' '}
                    </>
                  ) : null}

                  <span dir="ltr" lang="en"><Trans i18nKey="qrpage.flotnumber" i18n={english_i18n}>Lot Number</Trans></span>:{' '}
                  <span dir="ltr">{dose.lotNumber}</span>
                </bdi>
              </p>
              <hr />
            </li>
          ))}
          </ol>
          {/* <h2
            style={{
              color: "#22489c",
              margin: "20px 0px 0px 0px",
              fontSize: "130%",
            }}
            data-html2canvas-ignore="true"
            className={'mobile-save'}>
            <Trans i18nKey="qrpage.howtosave">To Save</Trans>
          </h2> */}
          <p data-html2canvas-ignore="true" id={'mobile-save'} className={'mobile-save'}><Trans i18nKey="qrpage.howtosave">To Save</Trans></p>
          <div className="save-buttons" data-html2canvas-ignore="true">
            <Button id={'print-button'} variant="contained" startIcon={<PrintIcon className={i18n.dir(i18n.language)=="rtl"?"buttonIconsRtl":""} />} color={"primary"} size={'large'} className={classes.button} onClick={handlePdfSave}><Trans i18nKey="qrpage.printrecord">Print Record</Trans></Button>
            <Button id={'save-image-button'} variant="contained" startIcon={<SaveAltIcon className={i18n.dir(i18n.language)=="rtl"?"buttonIconsRtl":""} />} color={"primary"} size={'large'} className={i18n.dir(i18n.language) == "rtl" ? classes.buttonRight : classes.buttonLeft}  onClick={handleImageSave}><Trans i18nKey="qrpage.download">Download</Trans></Button>
          </div>

          {google === true && isMobile() === "G" ? (
            <div data-html2canvas-ignore="true">
              {ReactGA.event({
                category: 'google_render',
                action: 'Rendered GPay Button'
              })}

              <ReactGA.OutboundLink
                eventLabel="google_button"
                to={`${user.walletContent}`}
                style={{ margin: 'inherit' }}
              >
                <img
                  width={"300px"}
                  src={"/imgs/google-pay-black.svg"}
                  alt={"Save to Google Pay"}
                  aria-role={"button"}
                />
              </ReactGA.OutboundLink>
              <p className={"pt-2"} style={{ fontSize: "0.75rem" }}>
                <Trans i18nKey={"qrpage.minrequirementsandroid"}>
                  Minimum requirements: Android version 5 and Google Play
                  Services version 21.18 &amp; above.
                </Trans>
              </p>{" "}
            </div>
          ) : null}
	
          {google === true && isMobile() === "G" ? (
            <div data-html2canvas-ignore="true">
              <ReactGA.OutboundLink
                eventLabel="commonhealth_button"
                to={`${user.commonHealthContent}`}
                style={{ margin: 'inherit' }}
              >
                <button>
                <img
                  width={"260px"}
                  id={"android-common-health-button"}
                  src={"/imgs/AddtoCommonHealthBlack.svg"}
                  alt={"Adds to CommonHealth application or, if CommonHealth not installed, goes to Google Play so CommonHealth can be installed."}
                  aria-role={"button"}
                />
                </button>
              </ReactGA.OutboundLink>
              <p className={"pt-2"} style={{ fontSize: "0.75rem" }}>
                <Trans i18nKey={"qrpage.minrequirementscommonhealth"}>
                  Minimum requirements: Android version 6 and above.
                </Trans>
              </p>{" "}
            </div>
          ) : null}

          {isVersionGood && apple === true && isMobile() === "A" ? (
            <div data-html2canvas-ignore="true">
              {ReactGA.event({
                category: 'apple_render',
                action: 'Rendered Apple Health Button'
              })}
              <ReactGA.OutboundLink
                eventLabel="apple_button"
                to={`${user.walletContent}`}
                style={{ margin: '5px 0px 0px 0px' }}                
              >
                <button>
                <img
                  id={"apple-health-button"}
                  src={"/imgs/add-to-apple-wallet-and-health.svg"}
                  alt={"Works with Apple Health and Apple Wallet"}
                  aria-role={"button"}
                />
                </button>
              </ReactGA.OutboundLink>
              <p className={"pt-2"} style={{ fontSize: "0.75rem" }}>
                <Trans i18nKey={"qrpage.minrequirementsios"}>
                  Minimum requirements: On an iOS device, use Safari web browser.
                </Trans>
              </p>
            </div>
          ) : null}

          <div data-html2canvas-ignore="true">
            <h2
              style={{
                color: "#22489c",
                margin: "20px 0 10px 0",
                fontSize: "130%",
              }}
            >
              <Trans i18nKey="qrpage.needhelp">Need More Help?</Trans>
            </h2>
            <p 
              style={{
                overflowWrap: "break-word"
              }}
            >
              <Trans i18nKey={"qrpage.incorrect"}>
                If the information on your digital vaccine record is incorrect or missing a dose, has wrong dates or incorrect brand, you may need to correct or update your immunization record. You can contact your provider to update your record or <a href="/faq#NeedMoreHelp" style={{ color: "#0d6efd", margin: "0", textDecoration: "underline" }}>contact us</a>. You will be notified of our findings and remediation actions within 2-3 weeks.
              </Trans>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRData;
