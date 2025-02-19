import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
} from "@/configs/firebaseConfig";

export const registerUser = async ({
  email,
  password,
  fullName,
  role,
}: {
  email: string;
  password: string;
  fullName: string;
  role: string;
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
    role,
    createdAt: new Date(),
  });

  return { success: true };
};
