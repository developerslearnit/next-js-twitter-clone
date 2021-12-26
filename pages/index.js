import Head from "next/head";
import Feed from "../components/Feed";
import LeftSideBar from "../components/LeftSideBar";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/logo-twitter.png" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <LeftSideBar />
        <Feed />
        {/* Main Page */}
        {/* Right SideBar */}
        {/* Modal */}
      </main>
    </div>
  );
}
