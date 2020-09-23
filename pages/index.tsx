import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";
import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories";
import { API_URL } from "../lib/constants";
import { getRandomCoverImg, postsSelector } from "../lib/utils";
import { State } from "../redux/reducers";
import { wrapper } from "../redux/store";
import { default as PostType } from "../types/post";

const Index = () => {
  const allPosts = useSelector<State, PostType[]>(postsSelector);
  console.log(allPosts);

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout>
        <Head>
          <title>Your Posts-Feed</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage!}
              id={heroPost.id}
            />
          )}
          <Link href="/posts/new">
            <button
              className="mx-auto container text-lg transition
              duration-300 ease-in-out border-transparent bg-black
            hover:bg-white hover:text-black border-2 hover:border-black
              py-3 mb-10 font-bold text-white"
            >
              Create Story
            </button>
          </Link>
          {morePosts?.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  const res = await axios.get(`${API_URL}/posts`);

  let posts: State["posts"] = {};

  res.data?.forEach((p: PostType) => {
    posts[p.id] = { ...p, coverImage: getRandomCoverImg() };
  });

  store.dispatch({ type: "ALL_POSTS", payload: posts });

  return { revalidate: 1 };
});
