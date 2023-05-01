import React, { useEffect, useState, useCallback  } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { KeyboardDatePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";
import {Trans, useTranslation} from "react-i18next";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PhoneMask from "./PhoneMask";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import {format} from 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import addMonths from "date-fns/addMonths";
import dayjs from 'dayjs';
import amLocale from "../locale/am"; 
import arLocale from "date-fns/locale/ar";
import chkLocale from "date-fns/locale/en-US"; 
import deLocale from "date-fns/locale/de";
import enLocale from "date-fns/locale/en-US"; 
import esLocale from "date-fns/locale/es"; 
import faLocale from "date-fns/locale/en-US"; 
import fjLocale from "date-fns/locale/en-US"; 
import frLocale from "date-fns/locale/fr"; 
import hiLocale from "date-fns/locale/hi"; 
import hmnLocale from "date-fns/locale/en-US"; 
import jaLocale from "date-fns/locale/ja"; 
import karLocale from "date-fns/locale/en-US"; 
import kmLocale from "date-fns/locale/km"; 
import koLocale from "date-fns/locale/ko"; 
import loLocale from "date-fns/locale/en-US"; 
import mamLocale from "date-fns/locale/en-US"; 
import mhLocale from "date-fns/locale/en-US"; 
import mxbLocale from "date-fns/locale/en-US"; 
import myLocale from "../locale/my"; 
import neLocale from "date-fns/locale/en-US"; 
import omLocale from "date-fns/locale/en-US"; 
import paLocale from "date-fns/locale/en-US"; 
import prsLocale from "date-fns/locale/en-US"; 
import psLocale from "date-fns/locale/en-US"; 
import ptLocale from "date-fns/locale/pt"; 
import roLocale from "date-fns/locale/ro"; 
import ruLocale from "date-fns/locale/ru"; 
import smLocale from "date-fns/locale/en-US"; 
import soLocale from "date-fns/locale/en-US"; 
import swLocale from "date-fns/locale/en-US"; 
import taLocale from "date-fns/locale/ta"; 
import teLocale from "date-fns/locale/te"; 
import thLocale from "date-fns/locale/th"; 
import tiLocale from "date-fns/locale/en-US"; 
import tlLocale from "date-fns/locale/en-US"; 
import toLocale from "date-fns/locale/en-US"; 
import trLocale from "date-fns/locale/tr"; 
import ukLocale from "date-fns/locale/uk"; 
import urLocale from "date-fns/locale/en-US"; 
import viLocale from "date-fns/locale/vi";  
import zhLocale from "date-fns/locale/zh-CN";  
import zhtwLocale from "date-fns/locale/zh-TW";  
import { FiberNewSharp } from "@material-ui/icons";

const CovidCard = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);
  const [contactType, setContactType] = useState("Phone");
  const [isShrinkEmailLabel, setIsShrinkEmailLabel] = useState();
  const [fieldMasks, setFieldMasks] = useState({
    textmask: "(  )    -    ",
  });
  const [checked, setChecked] = useState(false);
  const [isDobGood, setIsDobGood] = useState(true);
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [responseMessage, setResponseMessage] = useState(false);
  const [error, setError] = useState({
    FirstName: false,
    LastName: false,
    Phone_Email: false,
    Pin: false,
    Date: false
  });
  const [monthOfBirth, setMonthOfBirth] = useState();
  const [dayOfBirth, setDayOfBirth] = useState();
  const [yearOfBirth, setYearOfBirth] = useState();

  const [formErrors, setFormErrors] = useState([
    {
      "id": "FirstName",
      "type": "required",
      "isInvalid": false,
      "message": "vaccineform.firstNameErrorMsg_ADA"
    },
    {
      "id": "LastName",
      "type": "required",
      "isInvalid": false,
      "message": "vaccineform.lastNameErrorMsg_ADA"
    },
    {
      "id": "Date",
      "type": "required",
      "isInvalid": false,
      "message": "vaccineform.dateOfBirthErrorMsg_ADA"
    },
    {
      "id": "Date",
      "type": "dob_format",
      "isInvalid": false,
      "message": "vaccineform.maxDateErrorMsg_ADA"
    },
    {
      "id": "Phone_Email",
      "type": "required",
      "isInvalid": false,
      "message": "vaccineform.mobileEmailErrorMsg_ADA"
    },
    {
      "id": "Phone_Email",
      "type": "phone_format",
      "isInvalid": false,
      "message": "vaccineform.mobileFormatErrorMsg_ADA"
    },
    {
      "id": "Phone_Email",
      "type": "email_format",
      "isInvalid": false,
      "message": "vaccineform.emailFormatErrorMsg_ADA"
    },
    {
      "id": "Pin",
      "isInvalid": false,
      "type": "required",
      "message": "vaccineform.pinErrorMsg8"
    },
    {
      "id": "Pin",
      "isInvalid": false,
      "type": "dup_format",
      "message": "vaccineform.pinErrorMsg2"
    },
    {
      "id": "Pin",
      "isInvalid": false,
      "type": "con_format",
      "message": "vaccineform.pinErrorMsg1"
    },
    {
      "id": "submitcheckbox",
      "isInvalid": false,
      "type": "required",
      "message": "vaccineform.consentErrorMsg_ADA"
    }
  ]
  )
  const monthMenuList = [
    t("month.january"),
    t("month.february"),
    t("month.march"),
    t("month.april"),
    t("month.may"),
    t("month.june"),
    t("month.july"),
    t("month.august"),
    t("month.september"),
    t("month.october"),
    t("month.november"),
    t("month.december"),
  ];

  const MonthList = () => {
    return <>
      {monthMenuList.map((month, index) => <option key={month} value={index + 1} aria-label={month}>{month}</option>)}
    </>;
  }

  const DayList = () => {
    const d = new Date();
    let currentYear = d.getFullYear();
    const arrErrorMonth = ['2','4','6','9','11']
    if(dayOfBirth && monthOfBirth && ((dayOfBirth === '31' && arrErrorMonth.indexOf(monthOfBirth) > -1) || (dayOfBirth === '29' && monthOfBirth === '2' && yearOfBirth && yearOfBirth % 4 !== 0) || (dayOfBirth === '30' && monthOfBirth === '2')))
    {
      setDayOfBirth('');
      setError({...error, Date: true});
      setIsDobGood(false);
      let isInvalid = true;
      formatDateField(isInvalid);
    }
    const getDaysInMonth = (month, year) => (new Array(31)).fill('').map((v, i) => new Date(year, month - 1, i + 1)).filter(v => v.getMonth() === month - 1)
    return <>
      {getDaysInMonth(monthOfBirth ?? 1, yearOfBirth ?? (monthOfBirth === '2' ? '2020' : currentYear)).map((days, index) => <option key={index + days} value={index + 1} aria-label={index + 1}>{index + 1}</option>)}
    </>;
  }

  const YearList = () => {
    const d = new Date();
    let year = d.getFullYear();
    let yearMenuList = [];
    for (year; year >= 1900; year--) {
      yearMenuList.push(<option key={year} value={year} aria-label={year}>{year}</option>)
    }
    return yearMenuList;
  }

  const history = useHistory();
  const { CREDENTIALS_API_STATUS } = window.config;
  // eslint-disable-next-line no-control-regex
  const emailRegex = new RegExp(/(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
  const noWhiteSpaceRegex = new RegExp(/^\S*$/);

  useEffect(() => {
    document.querySelectorAll(".MuiButtonBase-root")[1].setAttribute("aria-label", "Date of birth")
    document.getElementById("submitcheckbox").setAttribute("aria-label", t('vaccineform.checkboxdescription'))
    document.getElementById("partitioned").setAttribute("aria-label", t('vaccineform.pincode'))
  }, []);


  const checkFormErrors = () => {
    const hasErrors = Object.keys(error).some(k => error[k]);
    return hasErrors;
  }

  const normalize = (phone) => {
    //normalize string and remove all unnecessary characters
    phone = phone.replace(/[^\d]/g, "");

    //check if number length equals to 10
    if (phone.length === 10) {
      //reformat and return phone number
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }

    return null;
  };
  const handleChange = (e) => {
    finalCheck();
    setChecked(!checked);
    if(checked){
      document.getElementById('submitcheckbox').setAttribute("aria-invalid", "true")
    }else{
      document.getElementById('submitcheckbox').setAttribute("aria-invalid", "false")
    }
  };

  const finalCheck = () => {
    let tempErrorObj = {
      FirstName: false,
      LastName: false,
      Phone_Email: false,
      Pin: false,
      Date: false
    };
    if (document.getElementById('FirstName') ? document.getElementById('FirstName').value.trim().length < 1 : '') {
      tempErrorObj.FirstName = true;
    }
    if (document.getElementById('LastName') ? document.getElementById('LastName').value.trim().length < 1 : '') {
      tempErrorObj.LastName = true;
    }
    if (document.getElementById('contactPhone') ? document.getElementById('contactPhone').value.replace(/[^0-9]/g, "").length < 10 : '' || !(emailRegex.test(document.getElementById('contactEmail') ? document.getElementById('contactEmail').value : '') && noWhiteSpaceRegex.test(document.getElementById('contactEmail') ? document.getElementById('contactEmail').value : ''))) {
      tempErrorObj.Phone_Email = true;
    }
    if (document.getElementById('partitioned').value.length < 4) {
      tempErrorObj.Pin = true;
      const isInvalid = true;
      formatPinField(isInvalid);
    }
    if (!(monthOfBirth && dayOfBirth && yearOfBirth)) {
      tempErrorObj.Date = true;
    }

    setError(tempErrorObj);
  }
  const handleMonthChange = (e) => {
    setMonthOfBirth(e.target.value);
    if (e.target.value && dayOfBirth && yearOfBirth) {
      validateDate(e.target.value, dayOfBirth, yearOfBirth);
    }
  }
  const handleDayChange = (e) => {
    setDayOfBirth(e.target.value);
    if (monthOfBirth && e.target.value && yearOfBirth) {
      validateDate(monthOfBirth, e.target.value, yearOfBirth);
    }
  }
  const handleYearChange = (e) => {
    setYearOfBirth(e.target.value);
    if (monthOfBirth && dayOfBirth && e.target.value) {
      validateDate(monthOfBirth, dayOfBirth, e.target.value);
    }    
  }

  const handleDateFieldBlur = (event) => {
    if (!event.target.value) {
      setError({...error, Date: true});
      setIsDobGood(false);
      let isInvalid = true;
      formatDateField(isInvalid);
    } else if (monthOfBirth && dayOfBirth && yearOfBirth) {
      validateDate(monthOfBirth, dayOfBirth, yearOfBirth);
    }
  };

  function validateDate(aMonth, aDay, aYear) {
    let dob_Date = new Date(aMonth + '/' + aDay + '/' + aYear);
    let currentDate = new Date(dayjs().format('MM/DD/YYYY'));
    if (dob_Date <= currentDate) {
      setError({...error, Date: false});
      setIsDobGood(true);
      let isInvalid = false;
      formatDateField(isInvalid);
    } else {
      setError({...error, Date: true});
      setIsDobGood(false);
      let isInvalid = true;
      formatDateField(isInvalid);
    }
  }

  function formatDateField(isInvalid) {
    if (isInvalid) {
      document.getElementById('Select_Month').style.borderBottomColor = '#b30000';
      document.getElementById('Select_Day').style.borderBottomColor = '#b30000';
      document.getElementById('Select_Year').style.borderBottomColor = '#b30000';
      document.getElementById('dobLabel').style.color = '#b30000';
      document.getElementById('monthLabel').style.color = '#b30000';
      document.getElementById('dayLabel').style.color = '#b30000';
      document.getElementById('yearLabel').style.color = '#b30000';
    } else {
      document.getElementById('dobLabel').style.color = 'black';
      document.getElementById('Select_Month').style.borderBottomColor = '#727272';
      document.getElementById('Select_Day').style.borderBottomColor = '#727272';
      document.getElementById('Select_Year').style.borderBottomColor = '#727272';
      document.getElementById('monthLabel').style.color = '#727272';
      document.getElementById('dayLabel').style.color = '#727272';
      document.getElementById('yearLabel').style.color = '#727272';
    }
  }

  const handlePinBlur = (event) => {
    if (event.target.value.length < 4) {
      const isInvalid = true;
      formatPinField(isInvalid);
      setError({ ...error, Pin: isInvalid });
      document.getElementById('partitioned').setAttribute("aria-invalid", "true");
    } else {
      const isInvalid = false;
      formatPinField(isInvalid);
      setError({ ...error, Pin: isInvalid });
      document.getElementById('partitioned').setAttribute("aria-invalid", "false");
    }
  };

  function formatPinField(isInvalid) {
    if (isInvalid) {
      document.getElementById("partitioned").style.background = "repeating-linear-gradient(90deg, #b30000 0, #b30000 1ch, transparent 0, transparent 1.5ch) 0 100%/100% 2px no-repeat";
    } else {
      document.getElementById("partitioned").style.background = "repeating-linear-gradient(90deg, dimgrey 0, dimgrey 1ch, transparent 0, transparent 1.5ch) 0 100%/100% 2px no-repeat";
    }
  }

  const submitForm = async (e) => {
    e.preventDefault();
    let errorCheck = await formSubmitHandler();
    let valueOfElement = (id) => document.getElementsByName(id)[0];
    if (errorCheck) {
      const userData = {
        LastName: valueOfElement("LastName")?.value.trim(),
        FirstName: valueOfElement("FirstName")?.value.trim(),
        DateOfBirth: `${monthOfBirth < 10 ? "0" + monthOfBirth : monthOfBirth}/${dayOfBirth < 10 ? "0" + dayOfBirth : dayOfBirth}/${yearOfBirth}`,
        PhoneNumber: valueOfElement("textmask") ? normalize(valueOfElement("textmask")?.value) : "",
        EmailAddress: document.getElementById('contactEmail')?.value ? document.getElementById('contactEmail').value : "",
        Pin: valueOfElement("PIN").value,
        Language: i18n.resolvedLanguage
      };

      setLoading(true);
      fetch(
        `${CREDENTIALS_API_STATUS}/vaccineCredentialStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (response.status === 200) {
            history.push("/received");
          }
          else if (response.status === 422) {
            //setLoading(false);
            setResponseMessage({ type: 'pinErrorMsg7', message: t("vaccineform.pinErrorMsg7") });
          }
          else if (response.status === 429) {
            //setLoading(false);
            setResponseMessage({ type: 'pinErrorMsg4', message: t("vaccineform.pinErrorMsg4") });
          }
          else if (response.status !== 200) {
            //setLoading(false);
            setResponseMessage({ type: 'pinErrorMsg6', message: t("vaccineform.pinErrorMsg6") });
          }
          document.querySelector('[aria-invalid="true"]')?.scrollIntoView();
          document.querySelector('[aria-invalid="true"]')?.focus();
          setLoading(false);
        })
        .catch((error) => {
          //setLoading(false);
          setResponseMessage({ type: 'pinErrorMsg6', message: t("vaccineform.pinErrorMsg6") });
          document.querySelector('[aria-invalid="true"]')?.scrollIntoView();
      document.querySelector('[aria-invalid="true"]')?.focus();
      setLoading(false);
        });
    }
    else {
      document.querySelector('[aria-invalid="true"]')?.scrollIntoView();
      document.querySelector('[aria-invalid="true"]')?.focus();
      setLoading(false);
    }
  };

  const formSubmitHandler = async () => {
    const isEmpty = (id) => document.getElementById(id)?.value?.trim()?.length < 1;
    const isPinEmpty = (id) => document.getElementById(id)?.value?.trim()?.length < 4


    document.getElementById("FirstName").setAttribute("aria-invalid", "false");
    document.getElementById("LastName").setAttribute("aria-invalid", "false");
   
    if (contactType === 'Phone') {
      document.getElementById("contactPhone").setAttribute("aria-invalid", "false");
    }
    else {
      document.getElementById("contactEmail").setAttribute("aria-invalid", "false");
    }
    document.getElementById("partitioned").setAttribute("aria-invalid", "false");
    document.getElementById("submitcheckbox").setAttribute("aria-invalid", "false");
    //document.getElementsByClassName("MuiCheckbox-root")[0].style.color = "#3f51b5"
    //document.getElementById("pinlabel").style.color = "#000000"

    const tempFormErrors = formErrors.map(ele => {
      if (ele.type === 'required') {
        if (ele.id === 'FirstName' && isEmpty(ele.id)) {
          let isInvalid = ele.isInvalid;
          isInvalid = true;
          //document.getElementById("FirstName-label").style.color = "#b30000";
          
          setError({...error, FirstName: true});
          document.getElementById('FirstName').setAttribute("aria-invalid", "true");
          return { ...ele, isInvalid };
        }
        if (ele.id === 'LastName' && isEmpty(ele.id)) {
          let isInvalid = ele.true;
          isInvalid = true;
          //document.getElementById("LastName-label").style.color = "#b30000";
          setError({...error, LastName: true});
          document.getElementById('LastName').setAttribute("aria-invalid", "true");
          return { ...ele, isInvalid };
        }
        if (ele.id === 'Date' && !(monthOfBirth && dayOfBirth && yearOfBirth)) {
          let isInvalid = ele.isInvalid;
          isInvalid = true;
          formatDateField(isInvalid);
          setError({...error, Date: true});
          
          setIsDobGood(false);
          return { ...ele, isInvalid };
        }else if(ele.id === 'Date'){
          let isInvalid = ele.isInvalid;
          isInvalid = false;
          formatDateField(isInvalid);
          return { ...ele, isInvalid };
        }
        if (ele.id === 'Phone_Email') {
          
          if (contactType === "Phone" && document.getElementById('contactPhone').value.trim().length < 1) {
            //document.getElementById("contactPhone-label").style.color = "#b30000"
            let isInvalid = ele.isInvalid;
            isInvalid = true;
            document.getElementById('contactPhone').setAttribute("aria-invalid", "true");
            setError({...error, Phone_Email: true});
            return { ...ele, isInvalid };
          }
          else if (contactType === "Email" && document.getElementById('contactEmail').value.trim().length < 1){
            //document.getElementById("contactEmail-label").style.color = "#b30000"
            let isInvalid = ele.isInvalid;
            isInvalid = true;
            document.getElementById('contactEmail').setAttribute("aria-invalid", "true");
            setError({...error, Phone_Email: true});
            return { ...ele, isInvalid };
          }
          
          
          
        }
        if (ele.id === 'Pin' && isPinEmpty('partitioned')) {
          let isInvalid = ele.isInvalid;
          isInvalid = true;
          //document.getElementById("pinlabel").style.color = "#b30000"
          formatPinField(isInvalid);
          document.getElementById('partitioned').setAttribute("aria-invalid", "true");
          setError({...error, Pin: true});
          return { ...ele, isInvalid };
        }
        if (ele.id === 'submitcheckbox' & !checked) {
          let isInvalid = ele.isInvalid;
          isInvalid = true;
          //document.getElementsByClassName("MuiCheckbox-root")[0].style.color = "#b30000"
          document.getElementById('submitcheckbox').setAttribute("aria-invalid", "true");
          return { ...ele, isInvalid };
        }
        let isInvalid = ele.isInvalid;
        isInvalid = false;
        return { ...ele, isInvalid };
      }

      else if (ele.type === 'dob_format') {
        /*if (selectedBirthDate) {

          if (!isDobGood) {
            let isInvalid = ele.isInvalid;
            isInvalid = true;
            //document.getElementById('Select_Month').style.borderBottomColor = '#b30000';
            //document.getElementById('Select_Day').style.borderBottomColor = '#b30000';
            //document.getElementById('Select_Year').style.borderBottomColor = '#b30000';
            //document.getElementById('dob-label').style.color = '#b30000';
            setError({...error, Date: true});
            
            return { ...ele, isInvalid };
          }
          else {
            let isInvalid = ele.isInvalid;
            isInvalid = false;
            document.getElementById('dob-label').style.color = 'black';
            //document.getElementById('Select_Month').style.borderBottomColor = '#727272';
            //document.getElementById('Select_Day').style.borderBottomColor = '#727272';
            //document.getElementById('Select_Year').style.borderBottomColor = '#727272';
            setError({...error, Date: true});
            
            return { ...ele, isInvalid };
          }
        }*/
        if (yearOfBirth && monthOfBirth && dayOfBirth) {
          let dob_Date = new Date(monthOfBirth + '/' + dayOfBirth + '/' + yearOfBirth);
          let currentDate = new Date(dayjs().format('MM/DD/YYYY'));
          if (dob_Date > currentDate) {
            let isInvalid = ele.isInvalid;
            isInvalid = true;
            document.getElementById('Select_Month').style.borderBottomColor = '#b30000';
            document.getElementById('Select_Day').style.borderBottomColor = '#b30000';
            document.getElementById('Select_Year').style.borderBottomColor = '#b30000';
            document.getElementById('dobLabel').style.color = '#b30000';
            document.getElementById('monthLabel').style.color = '#b30000';
            document.getElementById('dayLabel').style.color = '#b30000';
            document.getElementById('yearLabel').style.color = '#b30000';
            setIsDobGood(false);
            return { ...ele, isInvalid };
          }
          else {
            let isInvalid = ele.isInvalid;
            isInvalid = false;
            document.getElementById('dobLabel').style.color = 'black';
            document.getElementById('Select_Month').style.borderBottomColor = '#727272';
            document.getElementById('Select_Day').style.borderBottomColor = '#727272';
            document.getElementById('Select_Year').style.borderBottomColor = '#727272';
            document.getElementById('monthLabel').style.color = '#727272';
            document.getElementById('dayLabel').style.color = '#727272';
            document.getElementById('yearLabel').style.color = '#727272';
            setIsDobGood(true);
            return { ...ele, isInvalid };
          }
        }
      }
      else if (ele.type === 'phone_format') {
        if (contactType === 'Phone' ? !isEmpty('contactPhone') && document.getElementById('contactPhone')?.value.replace(/[^0-9]/g, "").length < 10 : false) {
          let isInvalid = ele.isInvalid;
          isInvalid = true;
          //document.getElementById("contactPhone-label").style.color = "#b30000"
          document.getElementById('contactPhone').setAttribute("aria-invalid", "true");
          setError({...error, Phone_Email: true});
          return { ...ele, isInvalid };
        }
      }
      else if (ele.type === 'email_format') {
        if (contactType === 'Email' && !isEmpty('contactEmail') ? 
        (!(emailRegex.test(document.getElementById('contactEmail')?.value)) 
        || !noWhiteSpaceRegex.test(document.getElementById('contactEmail')?.value) 
        || (document.getElementById('contactEmail')?.value.split('@').length>2) 
        || (document.getElementById('contactEmail')?.value.indexOf(',') > -1)
        || (document.getElementById('contactEmail')?.value.lastIndexOf('.', 0) === 0)
        || (document.getElementById('contactEmail')?.value.substr(-1) === '.')) : false) {
          let isInvalid = ele.isInvalid;
          isInvalid = true;
          //document.getElementById("contactEmail-label").style.color = "#b30000"
          document.getElementById('contactEmail').setAttribute("aria-invalid", "true");
          setError({...error, Phone_Email: true});
          return { ...ele, isInvalid };
        }
      }
      else if (ele.type === 'dup_format') {
        if (!isPinEmpty('Pin') && containsDuplicateChar(document.getElementById('partitioned').value)) {
          let isInvalid = ele.isInvalid;
          isInvalid = true;
          //document.getElementById("pinlabel").style.color = "#b30000"
          formatPinField(isInvalid);
          document.getElementById('partitioned').setAttribute("aria-invalid", "true");
          setError({...error, Pin: true});
          return { ...ele, isInvalid }
        }
      }
      else if (ele.type === 'con_format') {
        if (!isPinEmpty('Pin') & containsAscending(document.getElementById('partitioned').value)) {
          let isInvalid = ele.isInvalid;
          isInvalid = true;
          //document.getElementById("pinlabel").style.color = "#b30000"
          formatPinField(isInvalid);
          setError({...error, Pin: true});
          return { ...ele, isInvalid }
        }
      }
      let isInvalid = ele.isInvalid;
      isInvalid = false;
      return { ...ele, isInvalid };
    })
    setResponseMessage({})
    setFormErrors(tempFormErrors)
    let isFormValid = tempFormErrors.filter(ele => ele.isInvalid).length === 0;
    return isFormValid;
  }

  const numbersOnly = (e) => {
    const isContainsDuplicate = containsDuplicateChar(e.target.value);
    const isContainsAscending = containsAscending(e.target.value);
    if (e.target.value.length === 4 && !isContainsDuplicate && !isContainsAscending) {
      const isInvalid = false;
      formatPinField(isInvalid);
      setError({ ...error, Pin: false });
      e.target.setAttribute("aria-invalid", "true");
    } else if (isContainsDuplicate) {
      const isInvalid = true;
      formatPinField(isInvalid);
      setErrorMessage({ type: 'pinErrorMsg2', message: 'PIN cannot contain 4 duplicate numbers.' });
      e.target.setAttribute("aria-invalid", "true");
    } else if (isContainsAscending) {
      const isInvalid = true;
      formatPinField(isInvalid);
      setErrorMessage({ type: 'pinErrorMsg1', message: 'PIN cannot contain 4 consecutive numbers.' });
      e.target.setAttribute("aria-invalid", "true");
    } else {
      const isInvalid = false;
      formatPinField(isInvalid);      setErrorMessage({});
      e.target.setAttribute("aria-invalid", "false");
    }
    const numsOnly = e.target.value.replace(/[^0-9]/g, "");
    setPin(numsOnly);
  };

  const containsAscending = (str) => {
    const strArr = str.split("");
    let ascendingFlag = false;
    for (let i = 0; i < str.length - 2; i++) {
      if (
        parseInt(strArr[i]) + 1 === parseInt(strArr[i + 1]) &&
        parseInt(strArr[i]) + 2 === parseInt(strArr[i + 2]) &&
        parseInt(strArr[i]) + 3 === parseInt(strArr[i + 3])
      ) {
        ascendingFlag = true;
      }
    }
    if (ascendingFlag) {
      return true;
    } else {
      return false;
    }
  };

  const containsDuplicateChar = (str) => {
    let counts = {};
    let duplicateFlag = false;
    if (str.length > 0) {
      let charArr = str.split("");
      charArr.forEach((n) => {
        counts[n] = counts[n] || 0;
        counts[n]++;
        if (counts[n] === 4) {
          duplicateFlag = true;
        }
      });
    }
    if (duplicateFlag) return true;
    else return false;
  };
  const handleContactTypeChange = (event) => {
    setError({ ...error, Phone_Email: false });
    setFieldMasks({ ...fieldMasks, textmask: '' });
    setContactType(event.target.value);
  };  

  const handleEmailLabelChange = (isShrink) => {
    setIsShrinkEmailLabel(isShrink);
  }

  const handlePhoneChange = (event) => {
    if (event.target.value.replace(/[^0-9]/g, "").length > 0) {
      setError({ ...error, Phone_Email: false });
      document.getElementById('contactPhone').setAttribute("aria-invalid", "false");
    }
    setFieldMasks({
      ...fieldMasks,
      [event.target.name]: event.target.value,
    });
  };

  const handlePhoneBlur = (event) => {
    if (event.target.value.replace(/[^0-9]/g, "").length === 10) {
      setError({ ...error, Phone_Email: false });
      document.getElementById('contactPhone').setAttribute("aria-invalid", "false");
    } else {
      setError({ ...error, Phone_Email: true });
      document.getElementById('contactPhone').setAttribute("aria-invalid", "true");
    }
  };

  const today = new Date();
  const handleDobChange = (date) => {
    setError({ ...error, Date: false });
    /*setSelectedBirthDate(date)
    if (date && date.getFullYear() && date.getFullYear() >= 1900 && date <= addMonths(today, -6)) {
     
      setIsDobGood(true);
    } else {
      setIsDobGood(false);
    }*/
  }

  const handleClickBorder = (e) => {
    e.target.classList.add('no-border');
  }

  const isValidInput = (e) => {
    e.target.setAttribute("aria-invalid", e.target.value.trim().length < 1)
    return e.target.value.trim().length < 1;
  }

  const useStyles = makeStyles({
    root: {

    },
    underline: {
      "&&&:before": {
        borderBottom: "none"
      },
      "&&:after": {
        borderBottom: "none"
      }
    }
  });
  const classes = useStyles();

  
  const localeMap = {
    am: amLocale,
    ar: arLocale,
    chk: chkLocale,
    de: deLocale,
    en: enLocale,
    es: esLocale,
    fa: faLocale,
    fj: fjLocale,
    fr: frLocale,
    hi: hiLocale,
    hmn: hmnLocale,
    ja: jaLocale,
    kar: karLocale,
    km: kmLocale,
    ko: koLocale,
    lo: loLocale,
    mam: mamLocale,
    mh: mhLocale,
    mxb: mxbLocale,
    my: myLocale,
    ne: neLocale,
    om: omLocale,
    pa: paLocale,
    prs: prsLocale,
    ps: psLocale,
    pt: ptLocale,
    ro: roLocale,
    ru: ruLocale,
    sm: smLocale,
    so: soLocale,
    sw: swLocale,
    ta: taLocale,
    te: teLocale,
    th: thLocale,
    ti: tiLocale,
    tl: tlLocale,
    to: toLocale,
    tr: trLocale,
    uk: ukLocale,
    ur: urLocale,
    vi: viLocale,
    zh: zhLocale,
    zhTW: zhtwLocale
  };
//NOTE: add line for each available locale supported
  
  const [locale, setLocale] = useState("en");

  const selectLocale = useCallback(locale => {
    setLocale(locale.replace('-', ''));
  }, []);

  return (
    <div className={"covid-card-container"}>
      <form
        id={"main"}
        onSubmit={submitForm}
      >
        <Card
          className="MuiRootCard"
          style={{ border: "none", boxShadow: "none" }}
        >
          <CardContent style={{ padding: "16px 12px" }}>
            <h2 className={"covid-card-header"}>
              <Trans i18nKey="vaccineform.filloutheader">
              Please fill out the required fields to receive a link to a QR code / digital copy of your COVID-19 Verification Record:
              </Trans>
            </h2>
            <div style={{ marginBottom: "15px" }}>
              <Typography>
                <Trans i18nKey="vaccineform.subtitle">
                Required fields marked with *
                </Trans>
              </Typography>
            </div>
            <TextField
              name="FirstName"
              label={<Trans i18nKey="vaccineform.firstname">First name</Trans>}
              variant="standard"
              className={"col-12"}
              inputProps={{
                maxLength: 30
              }}
              required              
              id="FirstName"
              onClick={(e) => handleClickBorder(e)}
              onChange={(e) => isValidInput(e) ? setError({ ...error, FirstName: true }) : setError({ ...error, FirstName: false })}
              error={error.FirstName || document.getElementById('FirstName')?.getAttribute("aria-invalid") == "true"}
              onBlur={(e) => isValidInput(e) ? setError({ ...error, FirstName: true }) : setError({ ...error, FirstName: false })}
            />
            {error.FirstName || document.getElementById('FirstName')?.getAttribute("aria-invalid") == "true" ? <label id='firstNameError' htmlFor='FirstName' style={{ color: '#b30000' }} class="MuiFormHelperText-root Mui-error"><Trans i18nKey="vaccineform.firstnameErrorMsg">Please enter your First Name</Trans></label> : ''}
            <TextField
              name="LastName"
              label={<Trans i18nKey="vaccineform.lastname">Last name</Trans>}
              variant="standard"
              className={"col-12"}
              inputProps={{
                maxLength: 30
              }}
              required
              
              id="LastName"
              onChange={(e) => isValidInput(e) ? setError({ ...error, LastName: true }) : setError({ ...error, LastName: false })}
              error={error.LastName || document.getElementById('LastName')?.getAttribute("aria-invalid") == "true"}
              onBlur={(e) => isValidInput(e) ? setError({ ...error, LastName: true }) : setError({ ...error, LastName: false })}

            />
            {error.LastName || document.getElementById('LastName')?.getAttribute("aria-invalid") == "true" ? <label id='lastNameError' htmlFor='LastName' style={{ color: '#b30000' }} class="MuiFormHelperText-root Mui-error"><Trans i18nKey="vaccineform.lastnameErrorMsg">Please enter your Last Name!</Trans></label> : ''}

            <fieldset id="dob" style={{ display: "flex", alignItems: "flexStart", flexWrap: "wrap", marginTop: '20px' }}>
                <legend id="dobLabel" style={{ fontSize: '1rem' }}><Trans i18nKey="vaccineform.dateofbirth">Date of Birth</Trans> *</legend>
                <div id="dobContainer" style={{
                  display: "flex", alignItems: "flexStart", flexWrap: "wrap"
                }}>

                  <div style={{ display: "flex", flexDirection: "column", marginRight: '0.5rem' }} className="dobDropDowns">
                    <label htmlFor="Select_Month" id="monthLabel"><Trans i18nKey="vaccineform.monthLabel">Month</Trans></label>
                    <select
                      name="Select_Month"
                      id="Select_Month"
                      value={monthOfBirth}
                      onChange={handleMonthChange}
                      onBlur={(e) => {
                        handleDateFieldBlur(e);
                      }}                      
                      aria-required="true"
                      aria-label={t("vaccineform.monthLabel")}
                      error={error.Date || !isDobGood}
                    >
                      {monthOfBirth ? <MonthList /> : <><option key={"defaultMonth"} selected disabled hidden></option><MonthList /></>}
                    </select>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", marginRight: '0.5rem' }} className="dobDropDowns">
                    <label htmlFor="Select_Day" id="dayLabel"><Trans i18nKey="vaccineform.dayLabel">Day</Trans></label>
                    <select
                      name="Select_Day"
                      id="Select_Day"
                      value={dayOfBirth}
                      onChange={handleDayChange}
                      onBlur={(e) => {
                        handleDateFieldBlur(e);
                      }}                      
                      aria-required="true"
                      aria-label={t("vaccineform.dayLabel")}
                      error={error.Date || !isDobGood}
                    >
                      {dayOfBirth ? <DayList /> : <><option key={"defaultDay"} selected disabled hidden></option><DayList /></>}
                    </select>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }} className="dobDropDowns">
                    <label htmlFor="Select_Year" id="yearLabel"><Trans i18nKey="vaccineform.yearLabel">Year</Trans></label>
                    <select
                      name="Select_Year"
                      id="Select_Year"
                      value={yearOfBirth}
                      onChange={handleYearChange}
                      onBlur={(e) => {
                        handleDateFieldBlur(e);
                      }}                      
                      aria-required="true"
                      aria-label={t("vaccineform.yearLabel")}
                      error={error.Date || !isDobGood}
                    >
                      {yearOfBirth ? <YearList /> : <><option key={"defaultYear"} selected disabled hidden></option><YearList /></>}
                    </select>
                  </div>
                </div>
                <br />
                
              </fieldset>
              {(error.Date || !isDobGood) ? <label id='dobError' htmlFor='dob' style={{ color: '#b30000' }} class="MuiFormHelperText-root Mui-error"><Trans i18nKey="vaccineform.dateofbirthErrorMsg4">Date of Birth field cannot be blank</Trans></label> : ''}

            {/*<MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
            <KeyboardDatePicker
              disableToolbar
              name="DateOfBirth"
              id={"dob"}
              value={selectedBirthDate}
              onChange={handleDobChange}
              placeholder={"MM/DD/YYYY"}
              format="MM/dd/yyyy"
              invalidDateMessage={"Required Format: MM/DD/YYYY"}
              label={<Trans i18nKey="vaccineform.dateofbirth">Date of birth</Trans>}
              className={"col-12"}
              autoOk
              disableFuture
              required
              error={error.Date || !isDobGood}
              
              maxDate={ addMonths(today, -6) }
              onClick={() => selectLocale(i18n.resolvedLanguage.toString())}
              onBlur={(e) => e.target.value.length < 1 ? setError({ ...error, Date: true }) : setError({ ...error, Date: false })}
              okLabel={<Trans i18nKey="vaccineform.ok">Ok</Trans>}
              cancelLabel={<Trans i18nKey="vaccineform.cancel">Cancel</Trans>}              
              inputProps={{
                "aria-invalid": error.Date
              }}
              onFocus={
                (e) => {
                  if(loading){
                    var prevValue = document.getElementById("dob").getAttribute("aria-invalid");
                    e.target.value.length < 1 ? setError({ ...error, Date: true }) : setError({ ...error, Date: false })
                    document.getElementById("dob").setAttribute("aria-invalid", (e.target.value.length < 1 || !isDobGood))
                    if(document.getElementById("dob").getAttribute("aria-invalid") == "false" && document.getElementById("dob").getAttribute("aria-invalid") != prevValue){
                      document.querySelector('[aria-invalid="true"]')?.scrollIntoView();
                      document.querySelector('[aria-invalid="true"]')?.focus();
                    }
                  }
                }
              }
            />
            {(error.Date || !isDobGood) && !selectedBirthDate ? <label id='dobError' htmlFor='dob' style={{ color: '#b30000' }} class="MuiFormHelperText-root Mui-error">Date of Birth field cannot be blank</label> : ''}
            </MuiPickersUtilsProvider>*/}
            {/* <Trans i18nKey="vaccineform.phoneemailinfo">Provide the phone or email that was used when you received your COVID-19 vaccine.</Trans></p> */}
            <FormControl component="fieldset" style={{ marginTop: "50px" }}>
              <FormLabel component="legend">
                <Trans i18nKey="vaccineform.phoneemailinfo">
                Provide a mobile phone or email that may be associated with your vaccine record. If you do not get a match using your mobile phone, try again using your email address.
                </Trans>
              </FormLabel>
              <RadioGroup
                aria-label="contact type"
                name="contactTypeRadio"
                value={contactType}
                onChange={handleContactTypeChange}
                
                row
              >
                <FormControlLabel
                  value="Phone"
                  name="contactType"
                  control={<Radio aria-checked={contactType === "Phone" ? 'true' : 'false'} role={"radio"} inputProps={{ 'aria-label': 'Phone' }} color={"primary"} />}
                  label={<Trans i18nKey={"vaccineform.Phone"}>Mobile Phone</Trans>}
                  aria-label={'Mobile Phone Selector'}
                  
                />
                <FormControlLabel
                  value="Email"
                  name="contactType"
                  control={<Radio aria-checked={contactType === "Email" ? 'true' : 'false'} role={"radio"} inputProps={{ 'aria-label': 'Email' }} color={"primary"} />}
                  label={<Trans i18nKey={"vaccineform.Email"}>Email</Trans>}
                  aria-label={'Email Selector'}
                  
                />
              </RadioGroup>
            </FormControl>

            {contactType === "Phone" ? (
              <FormControl className={"col-12"}>
                <TextField
                  InputProps={{
                    inputComponent: PhoneMask,
                    value: fieldMasks.textmask
                  }}


                  label={<Trans i18nKey={"vaccineform.Phone"}>Mobile Phone</Trans>}
                  placeholder={"(555) 555-5555"}
                  required
                  type='tel'
                  onChange={handlePhoneChange}
                  name="textmask"
                  id="contactPhone"
                  error={error.Phone_Email || document.getElementById('contactPhone')?.getAttribute("aria-invalid") == "true"}
                  onBlur={(e) => {
                    handlePhoneBlur(e);
                    e.target.value.replace(/[^0-9]/g, "").length < 10 ? setError({ ...error, Phone_Email: true }) : setError({ ...error, Phone_Email: false });
                  }}
                />
                {error.Phone_Email || document.getElementById('contactPhone')?.getAttribute("aria-invalid") == "true" ? <label id='phoneError' htmlFor='contactPhone' style={{ color: '#b30000' }} class="MuiFormHelperText-root Mui-error"><Trans i18nKey="vaccineform.phoneErrorMsg1">Please enter Mobile Phone in valid format</Trans></label> : ''}
              </FormControl>
            ) : (
              <FormControl className={"col-12"}>
              <TextField
                name="contactType"
                label={
                  <Trans i18nKey={`vaccineform.${contactType}`}>
                    {contactType}
                  </Trans>
                }
                placeholder={"example@domain.com"}
                variant="standard"
                className={"col-12"}
                required
                inputProps={{
                  maxLength: 65,
                  pattern: "[a-zA-ZA-Z0-9._%+-]+@[a-zA-ZA-Z0-9.-]+.[a-zA-ZA-Z]{2,}$",
                }}
                InputLabelProps={{ shrink: isShrinkEmailLabel }}
                type={"email"}
                id="contactEmail"
                onChange={(e) => {
                  e.target.value.length > 0 ? setError({ ...error, Phone_Email: false }) : setError({ ...error, Phone_Email: true })
                  noWhiteSpaceRegex.test(e.target.value) ? setError({ ...error, Phone_Email: false }) : setError({ ...error, Phone_Email: true })
                  document.getElementById('contactEmail').setAttribute("aria-invalid", error.Phone_Email);
                }}
                onFocus={(e) => {
                  handleEmailLabelChange(true);
                }}
                error={error.Phone_Email  || document.getElementById('contactEmail')?.getAttribute("aria-invalid") == "true"}
                onBlur={(e) => {
                  e.target.value.length < 1 ? setError({ ...error, Phone_Email: true }) : setError({ ...error, Phone_Email: false })
                  emailRegex.test(e.target.value) && noWhiteSpaceRegex.test(e.target.value) ? setError({ ...error, Phone_Email: false }) : setError({ ...error, Phone_Email: true })
                  document.getElementById('contactEmail').setAttribute("aria-invalid", error.Phone_Email);
                  handleEmailLabelChange(e.target.value.length > 0 ? true : false);
                }}
              />
              {error.Phone_Email || document.getElementById('contactEmail')?.getAttribute("aria-invalid") == "true" ? <label id='emailError' htmlFor='contactEmail' style={{ color: '#b30000' }} class="MuiFormHelperText-root Mui-error"><Trans i18nKey="vaccineform.emailErrorMsg1">Enter a valid email address</Trans></label> : ''}
              </FormControl>
            )}
            <FormLabel component="label" style={{ color: error.Pin ? '#b30000' : 'dimgrey', marginTop: "50px" }}>
              <Trans i18nKey="vaccineform.pincode">
                Create a 4-digit PIN number. You'll receive a link to enter the PIN number and access your digital vaccine record. *
              </Trans>
            </FormLabel>
            <div className='pinContainer'>
              <div id='divInner'>
                <TextField
                  inputProps={{
                    autoComplete: "off",
                    type: 'tel',
                    name: "PIN",
                    value: pin,
                    onChange: numbersOnly,
                    maxLength: 4,
                    minLength: 4,
                    required: true,
                    "aria-label": t("vaccineform.pincode"),
                    "aria-describedby": "pinError"
                  }}
                  InputProps={{
                    className: classes.underline
                  }}
                  id="partitioned"
                  error={error.Pin || document.getElementById('partitioned')?.getAttribute("aria-invalid") == "true"}
                  onBlur={(e) => {
                    handlePinBlur(e)
                  }}
                />

              </div>
            </div>
            {errorMessage.type ? <label id='pinError' htmlFor='partitioned' style={{ color: '#b30000' }} aria-live="polite" class="MuiFormHelperText-root Mui-error"><Trans i18nKey={`vaccineform.${errorMessage.type}`}>{errorMessage.message}</Trans></label> : ''}
            {!errorMessage.type && document.getElementById('partitioned')?.value.length < 4 && document.getElementById('partitioned')?.getAttribute("aria-invalid") == "true"? <label id='pinError' htmlFor='partitioned' style={{ color: '#b30000' }} aria-live="polite" class="MuiFormHelperText-root Mui-error"><Trans i18nKey="vaccineform.pinErrorMsg8">PIN Number must be 4 characters</Trans></label> : ''}
            <div style={{ marginBottom: "50px", marginTop: "20px", display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Trans i18nKey="vaccineform.note">
                <span
                  style={{
                    background: "#22489C",
                    borderRadius: "5px",
                    color: "#ffffff",
                    padding: "4px 5px",
                    whiteSpace: "nowrap",
                    marginRight: i18n.dir(i18n.language) !== "rtl" ? "5px": "",
                    marginLeft: i18n.dir(i18n.language) == "rtl" ? "5px": ""
                  }}
                >
                  Note:
                </span>
                {" "} Your PIN is needed to securely access your digital record.
              </Trans>
            </div>
            <div style={{ display: "flex" }}>
              <FormControlLabel
                htmlFor='submitcheckbox'
                control={
                  <Checkbox
                    style={{ alignSelf: 'start', marginTop: '-5px' }}
                    checked={checked}
                    onChange={handleChange}
                    name="submitChecked"
                    color={"primary"}
                    id='submitcheckbox'
                    error = {document.getElementById('submitcheckbox')?.getAttribute("aria-invalid") == "true"}
                    inputProps={{
                      "aria-required": true,
                      "aria-label": t("vaccineform.checkboxdescription")
                    }}
                  />
                }
                className={i18n.dir(i18n.language) == "rtl" ? "checkBoxRtl" : ""}
              />
              <div>
                <Trans i18nKey="vaccineform.checkboxdescription">
                By checking this box, you are declaring under penalty of perjury under state and federal laws that you are the Patient or Parent/Guardian of the Patient and are therefore authorized to access the Patient’s immunization record.
                </Trans>
              </div>
              
            </div>
            <p>
              {document.getElementById('submitcheckbox')?.getAttribute("aria-invalid") == "true" ? <label id='agreementError' htmlFor='submitcheckbox' style={{ color: '#b30000' }} class="MuiFormHelperText-root Mui-error"><Trans i18nKey="vaccineform.agreementErrorMsg1">Policy Agreement checkbox must be selected</Trans></label> : ''}
            </p>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Trans i18nKey="vaccineform.note24hour">
                <span
                  style={{
                    background: "#22489C",
                    borderRadius: "5px",
                    color: "#ffffff",
                    padding: "4px 5px",
                    whiteSpace: "nowrap"
                  }}
                >
                  Note:
                </span>
                <span class="SpanText-Bold-With-Indent">
                  {" "}Once you click submit, you can expect to receive your link automatically within the next 24 hours.
                </span>
              </Trans>
            </div>
          </CardContent>
          <CardActions style={{ marginBottom: "30px", padding: "8px 0px" }}>
            {loading ? (
              <CircularProgress />
            ) : (

              <button
                style={{
                  borderRadius: "20px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
								  
                  backgroundColor: "rgba(0, 0, 139, 0.85)",
                  color: "white",
                  margin: "0px",
                  display: "block",
                  display: "inline-block"
                }}
                type="submit"
                size="small"
                aria-label={t("vaccineform.submitbutton")}
                onClick={submitForm}

                
              >
                <Trans i18nKey="vaccineform.submitbutton">Submit</Trans>
              </button>

            )}
          </CardActions>
        </Card>
        <div style={{ color: '#b30000' }}>{responseMessage.message}</div>

      </form>


    </div>
  );
};

export default CovidCard;
