import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
  // Generate a JWT token with the provided payload and secret key
  return jwt.sign(payload, '12345', {
    expiresIn: '30d' // Optionally, specify the expiration time for the token
  });
};

// Example payload (you can customize this according to your needs)
const user = {
  userId: '1234',
  email: 'user@example.com',
  isAdmin: true // Example property indicating administrator status
};

// Modify the payload to include the administrator field
const payload = {
  userId: user.userId,
  email: user.email,
  administrator: user.isAdmin // Include administrator status in the token payload
};

// Generate a JWT token
const token = generateToken(payload);

console.log(token); // Output the generated token
