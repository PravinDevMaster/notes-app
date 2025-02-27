//function to validate the email format
export const validateEmail = (email) => {
  // Regular expression to check a valid email pattern
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Returns true if the email matches the pattern, otherwise false
  return regex.test(email);
};

// function to get the initials from given name
export const getInitials = (name) => {
  // validate is empty; if empty return empty string
  if (!name) return "";

  //split the name into array of words
  const words = name.split(" ");
  let initials = ""; // variable to store the initials

  //   Loop through the word and get the first letter of the each words(max 2 words)
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0]; // append the first character of the word
  }

  //return the initials in uppercase
  return initials.toUpperCase();
};
