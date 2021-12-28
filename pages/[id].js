import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import LeftSideBar from "../components/LeftSideBar";
//import Widgets from "../components/Widgets";
import Post from "../components/Post";
import { firebaseDb } from "../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Comment from "../components/Comment";
import Head from "next/head";
import Login from "../components/Login";
import Widgets from "../components/Widgets";

const PostPage = ({ trendingResults, followResults, providers }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  useEffect(
    () =>
      onSnapshot(doc(firebaseDb, "tweets", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [firebaseDb, "tweets"]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(firebaseDb, "tweets", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [firebaseDb, "tweets", id]
  );

  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <Head>
        <title>
          {post?.username} on Twitter: "{post?.text}"
        </title>
        <link rel="icon" href="/logo-twitter.png" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <LeftSideBar />
        <div
          className="flex-grow border-l border-r border-gray-700 
        max-w-2xl sm:ml-[73px] xl:ml-[370px]"
        >
          <div
            className="flex items-center px-1.5 py-2 border-b border-gray-700 m
            text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black"
          >
            <div
              onClick={() => router.push("/")}
              className="hover-animation w-9 h-9 flex items-center justify-center xl:p-0"
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Tweet
          </div>
          <Post id={id} post={post} postPage={true} />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment.data()} />
              ))}
            </div>
          )}
        </div>

        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {isOpen && <Modal />}
      </main>
    </div>
  );
};

export default PostPage;

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
