import bcrypt from "bcrypt";
import { connectDB } from "../database/ConnectDB.js";

const registerUser = async (request, response) => {
  const client = await connectDB();

  const { firstName, lastName, userName, password, mobileNumber, email } =
    request.body;

  const existingUsername = await client
    .collection("USERS")
    .findOne({ usernName: userName });
  const existingEmail = await client
    .collection("USERS")
    .findOne({ email: email });
  const existingNumber = await client
    .collection("USERS")
    .findOne({ contactInfo: mobileNumber });

  // checking username and password and email
  if (existingUsername) {
    return response.status(400).json({ notice: "User already registered" });
  }
  if (existingEmail) {
    return response.status(400).json({
      notice:
        "Email is already used please login or use different email address",
    });
  }
  if (existingNumber) {
    return response
      .status(400)
      .json({ notice: "Mobile number already registered" });
  }

  if (password === undefined || password === "") {
    return response
      .status(400)
      .json({ notice: "Password field can't be empty" });
  }

  // Hashing Password
  const hashedPassword = await bcrypt.hash(password, 15);

  //creating new user object
  const newUserObj = {
    firstName: firstName,
    lastName: lastName,
    contactInfo: mobileNumber,
    email: email,
    username: userName,
    password: hashedPassword,
    createdAt: new Date(),
  };

  // inserting into databse
  await client.collection("USERS").insertOne(newUserObj);

  // sending response
  response.status(200).json({ notice: "User Added Successfully" });
};

const loginUser = async (request, response) => {};
const logoutUser = async (request, response) => {};

export { registerUser, loginUser, logoutUser };
