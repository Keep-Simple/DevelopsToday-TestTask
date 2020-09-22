import axios from "axios";
import Head from "next/head";
import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories";
import { API_URL } from "../lib/constants";
import { getRandomCoverImg } from "../lib/utils";
import { default as Post, default as PostType } from "../types/post";

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
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
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const res = await axios.get(`${API_URL}/posts`);

  const allPosts = res.data?.map((p: PostType) => ({
    ...p,
    coverImage: getRandomCoverImg(),
  }));

  return {
    props: { allPosts },
  };
};
