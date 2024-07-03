export function generatePassword() {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const specialChars = "@#$&";
  const numbers = "23456789"; // Avoiding 1 and 0 to prevent confusion with letters

  const allChars = uppercaseChars + lowercaseChars + specialChars + numbers;

  let password = "";

  // Add 1 uppercase letter
  password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];

  // Add 1 lowercase letter
  password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];

  // Add 1 special character
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Add 1 number
  password += numbers[Math.floor(Math.random() * numbers.length)];

  // Add 4 more random characters to complete the 8-character password
  for (let i = 0; i < 4; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to ensure the characters are in a random order
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
}

export function generateSchoolId(schoolName) {
  // Get the first three letters of the school name in uppercase
  const schoolCode = schoolName.substring(0, 3).toUpperCase();

  // Generate a unique ID (e.g., using a counter or a random number)
  const uniqueId = "001"; // You can replace this with actual logic to generate a unique ID

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Generate the school ID in the format 'ASC/001/currentyear'
  const schoolId = `${schoolCode}/${uniqueId}/${currentYear}`;

  return schoolId;
}
