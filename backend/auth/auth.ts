import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
} from "@/configs/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export const registerUser = async ({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    email,
    fullName,
    role: "COMMON",
    createdAt: new Date(),
  });

  return { success: true };
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return { success: true, user };
  } catch (error: string | any) {
    return { success: false, message: error.message };
  }
};
