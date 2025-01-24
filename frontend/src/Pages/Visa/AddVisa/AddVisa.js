import React from "react";
import { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./AddVisa.css";
import Nav from "../../../Components/Navigation/Nav";
import Footer from "../../../Components/Footer/Footer";
import { useAuthContext } from "../../../hooks/useAuthContext";

function AddVisa() {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    email: "",
    phoneNumber: "",
    country: "",
    address: "",
    postalCode: "",
    visaType: "",
    visaDuration: "",
    purpose: "",
    paymentAmount: "",
    paymentStatus: "",
    visaStatus: "",
    passportCopy: null,
    birthCertificate: null,
    policeCertificate: null,
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [errors, setErrors] = useState({});
  const { user } = useAuthContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    let updatedErrors = { ...errors };

    switch (name) {
      case "firstName":
      case "lastName":
      case "purpose":
      case "cardName":
        if (/^[A-Za-z\s]*$/.test(value)) {
          updatedErrors[name] = "";
        } else {
          updatedErrors[name] = "letters only!";
          updatedValue = formData[name]; // Prevent invalid input
        }
        break;

      case "postalCode":
      case "cvv":
      case "phoneNumber":
        if (/^\d*$/.test(value)) {
          updatedErrors[name] = "";
        } else {
          updatedErrors[name] = "numbers only!";
          updatedValue = formData[name]; // Prevent invalid input
        }
        break;

      case "email":
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          updatedErrors[name] = "";
        } else {
          updatedErrors[name] = "Enter a valid email address";
        }
        break;

      case "cardNumber":
        const formattedValue = value
          .replace(/\s/g, "")
          .replace(/(\d{4})/g, "$1 ")
          .trim();
        if (/^\d{0,16}$/.test(formattedValue.replace(/\s/g, ""))) {
          updatedValue = formattedValue;
          updatedErrors[name] = "";
        } else {
          updatedErrors[name] = "Incorrect card";
        }
        break;

      case "expiryDate":
        let cleanedExpiry = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        if (cleanedExpiry.length > 4) cleanedExpiry = cleanedExpiry.slice(0, 4); // Limit to MMYY
        let formattedExpiry = cleanedExpiry;
        if (cleanedExpiry.length >= 3) {
          formattedExpiry = `${cleanedExpiry.slice(0, 2)}/${cleanedExpiry.slice(
            2
          )}`;
        }

        // Validate the formatted date
        if (/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formattedExpiry)) {
          const currentYear = new Date().getFullYear() % 100;
          const currentMonth = new Date().getMonth() + 1;
          const [month, year] = formattedExpiry.split("/").map(Number);

          if (
            year > currentYear ||
            (year === currentYear && month >= currentMonth)
          ) {
            updatedErrors[name] = "";
          } else {
            updatedErrors[name] = "Card expiry date cannot be in the past";
          }
        } else if (formattedExpiry.length >= 5) {
          updatedErrors[name] = "Enter a valid expiry date (MM/YY)";
        } else {
          updatedErrors[name] = "";
        }

        updatedValue = formattedExpiry;
        break;

      default:
        break;
    }

    setFormData({ ...formData, [name]: updatedValue });
    setErrors(updatedErrors);
  };

  const calculateVisaFee = () => {
    const duration = parseInt(formData.visaDuration, 10);
    if (!isNaN(duration)) {
      return duration * 10; // $10 per month
    }
    return 0; // Default fee if duration is invalid or empty
  };

  const handleNext = () => {
    //Validation logic for the current section
    if (
      currentSection === 1 &&
      (!formData.firstName ||
        !formData.lastName ||
        !formData.DOB ||
        !formData.email ||
        !formData.phoneNumber ||
        !formData.country ||
        !formData.address ||
        !formData.postalCode)
    ) {
      alert("Please fill all required fields in this section.");
      return;
    }
    if (
      currentSection === 2 &&
      (!formData.visaType || !formData.visaDuration || !formData.purpose)
    ) {
      alert("Please fill all required fields in this section.");
      return;
    }
    setCurrentSection(currentSection + 1);
  };

  const handlePrevious = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setErrors({ ...errors, form: "Please login to submit visa details" });
      return;
    }

    setLoading(true); // Show the spinner when submit is clicked

    // Set payment fields before submission
    const amountToPay = calculateVisaFee();
    setFormData((prevData) => ({
      ...prevData,
      paymentAmount: amountToPay,
      paymentStatus: "Success",
      visaStatus: "Pending",
    }));

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      // Use updated values for paymentStatus and visaStatus
      if (key === "paymentStatus") {
        formDataObj.append(key, "Success");
      } else if (key === "visaStatus") {
        formDataObj.append(key, "Pending");
      } else if (key === "paymentAmount") {
        formDataObj.append(key, amountToPay);
      } else {
        formDataObj.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://Localhost:5000/api/visa",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert("Visa details submitted successfully!");
      console.log(response.data);

      // Redirect to the relevant page
      setTimeout(() => {
        navigate("/"); // Redirect to the home page
      }, 2000); // Adjust the time (in ms) for how long you want to show the spinner
    } catch (error) {
      console.error("Error submitting visa details:", error);
    }
  };

  // Spinner HTML to be injected
  const spinner = <span class="loader">Processing...</span>;

  return (
    <div class="addVisa-body">
      <Nav />
      <section class="space"></section>
      <section class="add-visa-form">
        <form class="visa-form" onSubmit={handleSubmit}>
          {currentSection === 1 && (
            <div class="form-container">
              <div class="form-section1">
                <div class="section1-header">
                  <h2>Visa Application</h2>

                  <h4 class="personal">Personal Information</h4>
                </div>
                <div class="form-name">
                  <div class="first-name">
                    <label for="first-name">
                      First Name{" "}
                      {errors.firstName && (
                        <span className="error">{errors.firstName}</span>
                      )}
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="firstName"
                      class="inputs"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="last-name">
                    <label for="last-name">
                      Last Name{" "}
                      {errors.lastName && (
                        <span className="error">{errors.lastName}</span>
                      )}
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="lastName"
                      class="inputs"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div class="form-email-DOB">
                  <div class="email">
                    <label for="email">
                      Email{" "}
                      {errors.email && (
                        <span className="error">{errors.email}</span>
                      )}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      class="inputs"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="DOB">
                    <label for="DOB">Date of Birth</label>
                    <input
                      type="date"
                      id="DOB"
                      name="DOB"
                      class="inputs"
                      value={formData.DOB}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div class="form-phone-country">
                  <div class="phone">
                    <label for="phone">
                      Phone{" "}
                      {errors.phoneNumber && (
                        <span className="error">{errors.phoneNumber}</span>
                      )}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phoneNumber"
                      class="inputs"
                      placeholder="+1234567890"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      maxlength="10"
                      required
                    />
                  </div>
                  <div class="country">
                    <label for="address">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled selected>
                        Select Country
                      </option>
                      <option value="Afghanistan">Afghanistan</option>
                      <option value="Åland Islands">Åland Islands</option>
                      <option value="Albania">Albania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="American Samoa">American Samoa</option>
                      <option value="Andorra">Andorra</option>
                      <option value="Angola">Angola</option>
                      <option value="Anguilla">Anguilla</option>
                      <option value="Antarctica">Antarctica</option>
                      <option value="Antigua and Barbuda">
                        Antigua and Barbuda
                      </option>
                      <option value="Argentina">Argentina</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Aruba">Aruba</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Bahamas">Bahamas</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Barbados">Barbados</option>
                      <option value="Belarus">Belarus</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Belize">Belize</option>
                      <option value="Benin">Benin</option>
                      <option value="Bermuda">Bermuda</option>
                      <option value="Bhutan">Bhutan</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Bosnia and Herzegovina">
                        Bosnia and Herzegovina
                      </option>
                      <option value="Botswana">Botswana</option>
                      <option value="Bouvet Island">Bouvet Island</option>
                      <option value="Brazil">Brazil</option>
                      <option value="British Indian Ocean Territory">
                        British Indian Ocean Territory
                      </option>
                      <option value="Brunei Darussalam">
                        Brunei Darussalam
                      </option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Burundi">Burundi</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Canada">Canada</option>
                      <option value="Cape Verde">Cape Verde</option>
                      <option value="Cayman Islands">Cayman Islands</option>
                      <option value="Central African Republic">
                        Central African Republic
                      </option>
                      <option value="Chad">Chad</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Christmas Island">Christmas Island</option>
                      <option value="Cocos (Keeling) Islands">
                        Cocos (Keeling) Islands
                      </option>
                      <option value="Colombia">Colombia</option>
                      <option value="Comoros">Comoros</option>
                      <option value="Congo">Congo</option>
                      <option value="Congo, The Democratic Republic of The">
                        Congo, The Democratic Republic of The
                      </option>
                      <option value="Cook Islands">Cook Islands</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Cote D'ivoire">Cote D'ivoire</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Cuba">Cuba</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Djibouti">Djibouti</option>
                      <option value="Dominica">Dominica</option>
                      <option value="Dominican Republic">
                        Dominican Republic
                      </option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Egypt">Egypt</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Equatorial Guinea">
                        Equatorial Guinea
                      </option>
                      <option value="Eritrea">Eritrea</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Falkland Islands (Malvinas)">
                        Falkland Islands (Malvinas)
                      </option>
                      <option value="Faroe Islands">Faroe Islands</option>
                      <option value="Fiji">Fiji</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="French Guiana">French Guiana</option>
                      <option value="French Polynesia">French Polynesia</option>
                      <option value="French Southern Territories">
                        French Southern Territories
                      </option>
                      <option value="Gabon">Gabon</option>
                      <option value="Gambia">Gambia</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Germany">Germany</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Gibraltar">Gibraltar</option>
                      <option value="Greece">Greece</option>
                      <option value="Greenland">Greenland</option>
                      <option value="Grenada">Grenada</option>
                      <option value="Guadeloupe">Guadeloupe</option>
                      <option value="Guam">Guam</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Guernsey">Guernsey</option>
                      <option value="Guinea">Guinea</option>
                      <option value="Guinea-bissau">Guinea-bissau</option>
                      <option value="Guyana">Guyana</option>
                      <option value="Haiti">Haiti</option>
                      <option value="Heard Island and Mcdonald Islands">
                        Heard Island and Mcdonald Islands
                      </option>
                      <option value="Holy See (Vatican City State)">
                        Holy See (Vatican City State)
                      </option>
                      <option value="Honduras">Honduras</option>
                      <option value="Hong Kong">Hong Kong</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Iceland">Iceland</option>
                      <option value="India">India</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Iran, Islamic Republic of">
                        Iran, Islamic Republic of
                      </option>
                      <option value="Iraq">Iraq</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Isle of Man">Isle of Man</option>
                      <option value="Israel">Israel</option>
                      <option value="Italy">Italy</option>
                      <option value="Jamaica">Jamaica</option>
                      <option value="Japan">Japan</option>
                      <option value="Jersey">Jersey</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Kiribati">Kiribati</option>
                      <option value="Korea, Democratic People's Republic of">
                        Korea, Democratic People's Republic of
                      </option>
                      <option value="Korea, Republic of">
                        Korea, Republic of
                      </option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                      <option value="Lao People's Democratic Republic">
                        Lao People's Democratic Republic
                      </option>
                      <option value="Latvia">Latvia</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Lesotho">Lesotho</option>
                      <option value="Liberia">Liberia</option>
                      <option value="Libyan Arab Jamahiriya">
                        Libyan Arab Jamahiriya
                      </option>
                      <option value="Liechtenstein">Liechtenstein</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Macao">Macao</option>
                      <option value="Macedonia, The Former Yugoslav Republic of">
                        Macedonia, The Former Yugoslav Republic of
                      </option>
                      <option value="Madagascar">Madagascar</option>
                      <option value="Malawi">Malawi</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Mali">Mali</option>
                      <option value="Malta">Malta</option>
                      <option value="Marshall Islands">Marshall Islands</option>
                      <option value="Martinique">Martinique</option>
                      <option value="Mauritania">Mauritania</option>
                      <option value="Mauritius">Mauritius</option>
                      <option value="Mayotte">Mayotte</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Micronesia, Federated States of">
                        Micronesia, Federated States of
                      </option>
                      <option value="Moldova, Republic of">
                        Moldova, Republic of
                      </option>
                      <option value="Monaco">Monaco</option>
                      <option value="Mongolia">Mongolia</option>
                      <option value="Montenegro">Montenegro</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Mozambique">Mozambique</option>
                      <option value="Myanmar">Myanmar</option>
                      <option value="Namibia">Namibia</option>
                      <option value="Nauru">Nauru</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Netherlands Antilles">
                        Netherlands Antilles
                      </option>
                      <option value="New Caledonia">New Caledonia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Nicaragua">Nicaragua</option>
                      <option value="Niger">Niger</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Niue">Niue</option>
                      <option value="Norfolk Island">Norfolk Island</option>
                      <option value="Northern Mariana Islands">
                        Northern Mariana Islands
                      </option>
                      <option value="Norway">Norway</option>
                      <option value="Oman">Oman</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Palau">Palau</option>
                      <option value="Palestinian Territory, Occupied">
                        Palestinian Territory, Occupied
                      </option>
                      <option value="Panama">Panama</option>
                      <option value="Papua New Guinea">Papua New Guinea</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Peru">Peru</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Pitcairn">Pitcairn</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Puerto Rico">Puerto Rico</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Reunion">Reunion</option>
                      <option value="Romania">Romania</option>
                      <option value="Russian Federation">
                        Russian Federation
                      </option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Saint Helena">Saint Helena</option>
                      <option value="Saint Kitts and Nevis">
                        Saint Kitts and Nevis
                      </option>
                      <option value="Saint Lucia">Saint Lucia</option>
                      <option value="Saint Pierre and Miquelon">
                        Saint Pierre and Miquelon
                      </option>
                      <option value="Saint Vincent and The Grenadines">
                        Saint Vincent and The Grenadines
                      </option>
                      <option value="Samoa">Samoa</option>
                      <option value="San Marino">San Marino</option>
                      <option value="Sao Tome and Principe">
                        Sao Tome and Principe
                      </option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Serbia">Serbia</option>
                      <option value="Seychelles">Seychelles</option>
                      <option value="Sierra Leone">Sierra Leone</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="Solomon Islands">Solomon Islands</option>
                      <option value="Somalia">Somalia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="South Georgia and The South Sandwich Islands">
                        South Georgia and The South Sandwich Islands
                      </option>
                      <option value="Spain">Spain</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Sudan">Sudan</option>
                      <option value="Suriname">Suriname</option>
                      <option value="Svalbard and Jan Mayen">
                        Svalbard and Jan Mayen
                      </option>
                      <option value="Swaziland">Swaziland</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Syrian Arab Republic">
                        Syrian Arab Republic
                      </option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Tajikistan">Tajikistan</option>
                      <option value="Tanzania, United Republic of">
                        Tanzania, United Republic of
                      </option>
                      <option value="Thailand">Thailand</option>
                      <option value="Timor-leste">Timor-leste</option>
                      <option value="Togo">Togo</option>
                      <option value="Tokelau">Tokelau</option>
                      <option value="Tonga">Tonga</option>
                      <option value="Trinidad and Tobago">
                        Trinidad and Tobago
                      </option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Turks and Caicos Islands">
                        Turks and Caicos Islands
                      </option>
                      <option value="Tuvalu">Tuvalu</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United Arab Emirates">
                        United Arab Emirates
                      </option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="United States Minor Outlying Islands">
                        United States Minor Outlying Islands
                      </option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Vanuatu">Vanuatu</option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Viet Nam">Viet Nam</option>
                      <option value="Virgin Islands, British">
                        Virgin Islands, British
                      </option>
                      <option value="Virgin Islands, U.S.">
                        Virgin Islands, U.S.
                      </option>
                      <option value="Wallis and Futuna">
                        Wallis and Futuna
                      </option>
                      <option value="Western Sahara">Western Sahara</option>
                      <option value="Yemen">Yemen</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                  </div>
                </div>
                <div class="form-address-postal">
                  <div class="address">
                    <label for="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      class="inputs"
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="postal">
                    <label for="postal">
                      Postal Code{" "}
                      {errors.postalCode && (
                        <span className="error">{errors.postalCode}</span>
                      )}
                    </label>
                    <input
                      type="text"
                      id="postal"
                      name="postalCode"
                      class="inputs"
                      placeholder="10345"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div class="form-btn">
                  <button type="button" class="next" onClick={handleNext}>
                    Next <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentSection === 2 && (
            <div class="form-container">
              <div class="form-section2">
                <div class="section2-header">
                  <h2>Visa Application</h2>
                  <h4>Personal Documents</h4>
                </div>
                <div class="section2-visa">
                  <div class="visa-Type">
                    <label for="first-name">Visa Type</label>
                    <select
                      id="visa-type"
                      name="visaType"
                      value={formData.visaType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Tourist">Tourist</option>
                      <option value="Business">Business</option>
                      <option value="Student">Student</option>
                      <option value="Work">Work</option>
                      <option value="Transit">Transit</option>
                    </select>
                  </div>
                  <div class="visa-duration">
                    <label for="duration">Visa Duration (months)</label>
                    <input
                      type="number"
                      id="duration"
                      name="visaDuration"
                      class="inputs"
                      value={formData.visaDuration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div class="section2-visa">
                  <div class="purpose">
                    <label for="purpose">
                      Purpose{" "}
                      {errors.purpose && (
                        <span className="error">{errors.purpose}</span>
                      )}
                    </label>
                    <input
                      type="text"
                      id="purpose"
                      name="purpose"
                      class="inputs"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="passport">
                    <label for="passport">Passport</label>
                    <input
                      type="file"
                      id="passport"
                      class="file-input"
                      name="passportCopy"
                      accept=".pdf,.jpg,.jpeg,.png"
                      // onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div class="section2-visa">
                  <div class="birth">
                    <label for="birth">Birth Certificate</label>
                    <input
                      type="file"
                      id="birth"
                      class="file-input"
                      name="birthCertificate"
                      accept=".pdf,.jpg,.jpeg,.png"
                      // onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="police">
                    <label for="police">Police Certificate</label>
                    <input
                      type="file"
                      id="police"
                      class="file-input"
                      name="policeCertificate"
                      // onChange={handleInputChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>
                <div class="form-btn2">
                  <button
                    type="button"
                    class="previous"
                    onClick={handlePrevious}
                  >
                    <i class="fa-solid fa-arrow-left"></i> Previous
                  </button>
                  <button type="button" class="next" onClick={handleNext}>
                    Submit
                  </button>{" "}
                </div>
              </div>
            </div>
          )}
          {currentSection === 3 && (
            <div class="form-container">
              <div class="form-section3">
                <div class="payment-header">
                  <h2>Make Your Payment Here</h2>
                  <i class="fa-brands fa-cc-visa"></i>
                  <i class="fa-brands fa-cc-mastercard"></i>
                  {/* <h3>Amount to Pay: ${calculateVisaFee()}</h3> */}
                </div>
                <div class="card-details">
                  <div class="card-name">
                    <label for="cardName">
                      Cardholder Name{" "}
                      {errors.cardName && (
                        <span className="error">{errors.cardName}</span>
                      )}
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      class="inputs"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="card-number">
                    <label for="cardNumber">
                      Card Number{" "}
                      {errors.cardNumber && (
                        <span className="error">{errors.cardNumber}</span>
                      )}
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      class="inputs"
                      placeholder="1234 5678 9012 3456"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxlength="19"
                    />
                  </div>
                </div>
                <div class="card-details">
                  <div class="expiry">
                    <label for="expiryDate">
                      Expiry Date{" "}
                      {errors.expiryDate && (
                        <span className="error">{errors.expiryDate}</span>
                      )}
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      class="inputs"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      maxlength="5"
                    />
                  </div>
                  <div class="cvv">
                    <label for="cvv">
                      CVV{""}
                      {errors.cvv && (
                        <span className="error">{errors.cvv}</span>
                      )}
                    </label>
                    <input
                      type="password"
                      id="cvv"
                      name="cvv"
                      class="inputs"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      maxlength="3"
                    />
                  </div>
                </div>
                <div class="amount">
                  <label for="amount">Amount</label>
                  <input
                    type="text"
                    id="amount"
                    name="paymentAmount"
                    class="inputs"
                    value={`$${calculateVisaFee()}`}
                    disabled
                  />
                </div>
                <div class="submit-btn">
                  <button type="submit" class="submit">
                    Pay Now
                  </button>
                </div>
              </div>
              <div class="loading-spinner-section">
                {loading && spinner}{" "}
                {/* Conditionally render spinner when loading */}
              </div>
            </div>
          )}
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default AddVisa;
