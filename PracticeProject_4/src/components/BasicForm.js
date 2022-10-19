import useInput from "../hooks/useInput";

const BasicForm = (props) => {
  const {
    value: firstNameInputValue,
    isValid: firstNameInputIsValid,
    hasError: firstNameInputHasError,
    valueChangedHandler: firstNameValueChangedHandler,
    blurChangedHandler: firstNameBlurChangedHandler,
    reset: firstNameReset
  } = useInput((value) => value.trim().length > 0);

  const {
    value: lastNameInputValue,
    isValid: lastNameInputIsValid,
    hasError: lastNameInputHasError,
    valueChangedHandler: lastNameValueChangedHandler,
    blurChangedHandler: lastNameBlurChangedHandler,
    reset: lastNameReset
  } = useInput((value) => value.trim().length > 0);

  const {
    value: emailInputValue,
    isValid: emailInputIsValid,
    hasError: emailInputHasError,
    valueChangedHandler: emailValueChangedHandler,
    blurChangedHandler: emailBlurChangedHandler,
    reset: emailReset
  } = useInput((value) => value.includes("@"));

  const formIsValid = firstNameInputIsValid && lastNameInputIsValid && emailInputIsValid;

  const firstNameClasses = (firstNameInputHasError ? "form-control invalid" : "form-control");
  const lastNameClasses = (lastNameInputHasError ? "form-control invalid" : "form-control");
  const emailClasses = (emailInputHasError ? "form-control invalid" : "form-control");

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    firstNameReset();
    lastNameReset();
    emailReset();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='firstName' value={firstNameInputValue} onChange={firstNameValueChangedHandler} onBlur={firstNameBlurChangedHandler} />
          {firstNameInputHasError && <p className="error-text">Please enter a first name.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='lastName' value={lastNameInputValue} onChange={lastNameValueChangedHandler} onBlur={lastNameBlurChangedHandler} />
        {lastNameInputHasError && <p className="error-text">Please enter a last name.</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='email' value={emailInputValue} onChange={emailValueChangedHandler} onBlur={emailBlurChangedHandler} />
        {emailInputHasError && <p className="error-text">Please enter a valid email address.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
