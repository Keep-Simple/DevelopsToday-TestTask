import axios from "axios";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import PostTitle from "../../components/post-title";
import { API_URL } from "../../lib/constants";
import { getRandomCoverImg } from "../../lib/utils";
import PostType from "../../types/post";

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{post.title} | Blog Example</title>
              </Head>
              <PostHeader title={post.title} coverImage={post.coverImage!} />
              <PostBody body={post.body} comments={post.comments} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

export async function getStaticProps({ params: { id } }: any) {
  const res = await axios.get(`${API_URL}/posts/${id}?_embed=comments`);
  const post = { ...res.data, coverImage: getRandomCoverImg() };

  return {
    props: { post },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const res = await axios.get(`${API_URL}/posts`);
  const ids = res.data?.map((p: PostType) => ({
    params: {
      id: p.id.toString(),
    },
  }));

  return {
    paths: ids,
    fallback: true,
  };
}
