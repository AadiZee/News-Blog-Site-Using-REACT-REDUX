import axios from "axios";

const URL_SERV = "http://localhost:3004";

export const getPosts = async (
  prevState,
  page = 1,
  order = "asc",
  limit = "10"
) => {
  try {
    const response = await axios.get(
      `${URL_SERV}/posts?_page=${page}&_limit=${limit}&_order=${order}&_sort=id`
    );
    return {
      posts: prevState.posts
        ? [...prevState.posts, ...response.data]
        : response.data,
      page: page,
      end: response.data.length === 0 ? true : false,
    };
  } catch (error) {
    throw error;
  }
};

export const addNewsLetter = async (email) => {
  try {
    const findUser = await axios.get(
      `${URL_SERV}/newsletter?email=${email.email}`
    );
    if (!Array.isArray(findUser.data) || !findUser.data.length) {
      //add user
      const response = await axios({
        method: "POST",
        url: `${URL_SERV}/newsletter`,
        data: {
          email: email.email,
        },
      });
      return {
        newsletter: "added",
        email: response.data,
      };
    } else {
      //already exists
      return {
        newsletter: "failed",
      };
    }
  } catch (error) {
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${URL_SERV}/posts/${id}`);
    return response.data;
  } catch (error) {
    return "404";
  }
};

export const sendMessage = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${URL_SERV}/contact`,
      data: data,
    });
    return true;
  } catch (error) {
    return false;
  }
};
