export let MESSAGES = {
  required: 'This field is required.',
  email: 'Please enter a valid email ID.',
  validname: 'Please enter valid name.',
  password: 'Enter min 4 character combination of letters (using upper and lower case) and a special character (@#$%).',
  equalTo: 'New password and confirm password do not match.',
  number: 'Please enter valid number.',
  zipcode: 'Please enter valid zip code.',
  passwordLengthError: 'Password should not be less than 5 characters.',
  passwordSuccessfullysent: 'Password has been successfully sent to the registered phone number.',
  addressselect: 'Please select an address from dropdown menu.',
  day: 'Please select day of operation.',
  time: 'Please select hours of operation.',
  timeday: 'Please enter hours of operation for days you selected.',
  timediff: 'From hours and to hours should not be equal.',
  location: 'Please enter valid number of location.'
};

export let PATTERN = {
  password: /^[!$@#\w\s]*$/,
  email: /^[_a-zA-Z0-9+-]+(\.[_a-zA-Z0-9+-]+)*@[a-zA-Z0-9-]+(\.[a-z0-9-]+)*(\.[a-zA-Z]{2,24})$/,
  number: /^[0-9]*$/,
  zip: /^\d{5}$/,
  location: /^(?!00)[0-9]*$/,
  name: /^[a-zA-Z ]*$/,
};
