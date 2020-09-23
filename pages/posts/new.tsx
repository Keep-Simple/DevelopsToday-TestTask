import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { API_URL } from "../../lib/constants";
import { getRandomCoverImg } from "../../lib/utils";
import { ADD_POST } from "../../redux/types";

const PostCreator: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(async (dispatch) => {
      const res = await axios.post(`${API_URL}/posts`, { body, title });
      dispatch({
        type: ADD_POST,
        payload: { ...res.data, coverImage: getRandomCoverImg() },
      });
      router.push("/");
    });
  }

  return (
    <Layout>
      <Head>
        <title>Story Creator</title>
      </Head>
      <Container>
        <Header />
        <form
          onSubmit={onSubmit}
          className="shadow-xl mt-16 overflow-hidden mx-28"
        >
          <input
            className="block w-11/12 mx-auto mt-4 p-2 font-bold text-6xl outline-none"
            value={title}
            placeholder="Type title..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            className="my-4 mx-auto w-11/12 block p-3 font-semibold text-xl outline-none"
            value={body}
            rows={20}
            name="Body"
            placeholder="Write your story here..."
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="m-4">
            <button type="submit" className={`btn p-4 w-full mx-auto`}>
              Create
            </button>
          </div>
        </form>
      </Container>
    </Layout>
  );
};

export default PostCreator;
