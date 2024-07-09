import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { verifyMessage } from "ethers";
import { mongodbConnect } from "./MongoDb/connect";
import User from "./MongoDb/schema/userSchema";
import Cerficate from "@/MongoDb/schema/certificateSchema";
import CertificateStatus from "@/MongoDb/schema/certificateStatusSchema";

// error msg
class InvalidMetamaskLogin extends CredentialsSignin {
  code = "您無法被授權使用發證者登入";
}

class InvalidEmail extends CredentialsSignin {
  code = "您的輸入的電子郵件或密碼錯誤";
}

class SystemError extends CredentialsSignin {
  code = "請再重新登入一次";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },

  //configure  metamaskLogin & email
  providers: [
    CredentialProvider({
      name: "Email",
      id: "Email",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Email", type: "text", placeholder: "" },
      },
      //@ts-ignore
      async authorize(
        credentials: { email: string; password: string },
        request
      ) {
        if (credentials) {
          const { email, password } = credentials;
          try {
            await mongodbConnect();
            const user = await User.findOne({ email });
            if (user) {
              const correctPassword = await user.comparePassword(password);
              if (correctPassword) {
                // console.log(user);
                if (user.role === "教師") {
                  const storeData = await handleTeacherCerficate(user);
                  if (storeData) {
                    return user;
                  } else {
                    throw new SystemError();
                  }
                }
              } else {
                throw new InvalidEmail();
              }
            } else {
              throw new InvalidEmail();
            }
          } catch (e) {
            throw new SystemError();
          }
        } else {
          throw new SystemError();
        }
      },
    }),
    CredentialProvider({
      name: "Metamask",
      id: "Metamask", // be mapped to SignIn("Metamask") on the frontend.
      credentials: {
        message: { label: "Message", type: "text", placeholder: "" },
        signature: { label: "Signature", type: "text", placeholder: "" },
      },
      //@ts-ignore
      async authorize(
        credentials: { message: string; signature: string },
        request
      ) {
        if (credentials) {
          const { message, signature } = credentials;
          const signerAddress = verifyMessage(message, signature);
          console.log("signerAddress", signerAddress);
          try {
            await mongodbConnect();
            const user = await User.findOne({ address: signerAddress });
            if (user) {
              console.log(user);
            }
            console.log(user.isIssuerAddress, user.isIssuer);

            if (user.isIssuerAddress || user.isIssuer) {
              return user;
            } else {
              console.log("error1");
              throw new InvalidMetamaskLogin();
            }
          } catch (error) {
            console.log("error2");
            throw new SystemError();
          }
        } else {
          console.log("error3");
          throw new SystemError();
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user._id;
        token.role = user.role;
        token.email = user.email;
        token.username = user.username;
        token.kingdergarten = user.kingdergarten;
        token.address = user.address;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.kingdergarten = token.kingdergarten;
      session.user.address = token.address;
      return session;
    },
  },
});

// Function to handle adding teacher to certificate and managing certificate status
async function handleTeacherCerficate(user: any) {
  const certificates = await Cerficate.find({});
  for (const cert of certificates) {
    // console.log("cert", cert);
    // console.log("user", user);

    const existingStatus = await CertificateStatus.findOne({
      certificate: cert._id,
      teacher: user._id,
    });
    if (!existingStatus) {
      const newStatus = new CertificateStatus({
        certificate: cert._id,
        teacher: user._id,
        makeStatus: false,
        verifyStatus: false,
      });
      try {
        await newStatus.save();
        await Cerficate.updateOne(
          { _id: cert._id },
          {
            $addToSet: { teachers: user._id },
          }
        );
        console.log("success");
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
  return true;
}
