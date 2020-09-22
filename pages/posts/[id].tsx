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
import { API_URL, CMS_NAME } from "../../lib/constants";
import { getRandomCoverImg } from "../../lib/utils";
import PostType from "../../types/post";

type Props = {
  post: PostType;
  preview?: boolean;
};

const Post = ({ post, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
              </Head>
              <PostHeader title={post.title} coverImage={post.coverImage!} />
              <PostBody content={post.body} />
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
