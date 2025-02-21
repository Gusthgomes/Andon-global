import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
} from "@/configs/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

// convex
import { ConvexClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const registerUser = async ({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) => {
  try {
    // Criar usuário no Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Usuário criado no Firebase:", user.uid);

    // Salvar no Firestore (opcional)
    await setDoc(doc(db, "users", user.uid), {
      email,
      fullName,
      role: "COMMON",
      createdAt: new Date(),
    });

    console.log("Usuário salvo no Firestore");

    // 🔥 Chamar a mutation do Convex corretamente
    await convex.mutation(api.users.saveUser, {
      uid: user.uid,
      email,
      fullName,
      role: "COMMON",
    });

    console.log("Usuário salvo no Convex com sucesso!");

    return { success: true };
  } catch (error: any) {
    console.error("Erro no registro:", error.message);
    return { success: false, message: error.message };
  }
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
