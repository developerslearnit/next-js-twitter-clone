import Image from "next/image";
import { signIn } from "next-auth/react";

const Login = ({ providers }) => {
  return (
    <div className="flex items-center flex-col h-screen space-y-[100px] pt-48">
      <Image
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
        objectFit="contain"
      />

      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="login-with-google-btn"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
