import React, { useState } from "react";
import "../styles/PassGenerator.css";

const PassGenerator = () => {
  const [password, setPassword] = useState("");
  const [copyText, setCopyText] = useState("Copy");
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeSymbol, setIncludeSymbol] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let chars = "";
    let strength = "";

    setCopyText("Copy");

    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumber) chars += numberChars;
    if (includeSymbol) chars += symbolChars;

    if (chars.length === 0) {
      chars = `${uppercaseChars}${lowercaseChars}${numberChars}${symbolChars}`;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setPassword(generatedPassword);

    //#region Password Strength Calculate
    if (generatedPassword.length < 6) {
      strength = "Very Poor";
    } else if (generatedPassword.length < 8) {
      strength = "Poor";
    } else if (generatedPassword.length < 12) {
      strength = "Fair";
    } else if (generatedPassword.length < 16) {
      strength = "Good";
    } else {
      strength = "Very Good";
    }
    //#endregion

    setPasswordStrength(strength);
  };

  const handleCopyPassword = () => {
    if (password != "") {
      navigator.clipboard.writeText(password);
      alert("Password copied!");
      setCopyText("Copied");
    }
    else alert("Click on 'Generate' to generate password")
  };

  const getStrengthBarColor = () => {
    switch (passwordStrength) {
      case "Very Poor":
        return { color: "red", width: '10%' };
      case "Poor":
        return { color: "orange", width: '30%' };
      case "Fair":
        return { color: "yellow", width: '50%' };
      case "Good":
        return { color: "lightgreen", width: '80%' };
      case "Very Good":
        return { color: "green", width: '100%' };
      default:
        return { color: "gray", width: '0%' };
    }
  };

  return (
    <div className="password-generator">
      <div className="password-container">
        {password ? (
          <b style={{ fontSize: 18, color: "#fff" }}>{password}</b>
        ) : (
          <b style={{ fontSize: 12, color: "#fff" }}>
            Click button to generate password
          </b>
        )}
        <button onClick={handleCopyPassword}>{copyText}</button>
      </div>
      <div className="length-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <h2 style={{ color: "rgb(128, 128, 128)" }}>Character Length:</h2>
          <span style={{ color: "#fff" }}>{length}</span>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="character-types-container">
        <div className="checkbox-container">
          <label style={{ color: "rgb(128, 128, 128)" }}>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            Include Uppercase Letters
          </label>
          <label style={{ color: "rgb(128, 128, 128)" }}>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            Include Lowercase Letters
          </label>
          <label style={{ color: "rgb(128, 128, 128)" }}>
            <input
              type="checkbox"
              checked={includeNumber}
              onChange={() => setIncludeNumber(!includeNumber)}
            />
            Include Numbers
          </label>
          <label style={{ color: "rgb(128, 128, 128)" }}>
            <input
              type="checkbox"
              checked={includeSymbol}
              onChange={() => setIncludeSymbol(!includeSymbol)}
            />
            Include Symbols
          </label>
        </div>
      </div>
      <div className="strength-container">
        <h2 style={{ color: "rgb(128, 128, 128)" }}>Strength</h2>
        <div className="strength-bar">
          <div
            className="strength-level"
            style={{ backgroundColor: getStrengthBarColor().color, width: getStrengthBarColor().width }}
          ></div>
          {/* <input type="text" value={passwordStrength} readOnly /> */}
        </div>
      </div>
      <button className="generate-btn" onClick={generatePassword}>
        Generate
      </button>
    </div>
  );
};

export default PassGenerator;
