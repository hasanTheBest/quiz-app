// import initialQuiz from "./../../markup/quizapi.json"

export const fetchQuiz = async (endpoint) => {
  const url = new URL("https://quizapi.io/api/v1/questions");
  // const url = new URL("http://localhost:3000/markup/quizapi.json");

  const { category, difficulty, limit, tags } = Boolean(endpoint)
    ? endpoint
    : {};

  url.search = new URLSearchParams({
    ...(Boolean(category) && { category }),
    ...(Boolean(difficulty) && { difficulty }),
    ...(Boolean(limit) && { limit }),
    ...(Boolean(tags) && { tags }),
  });

  let data;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": "WlqoaMyMJic3DPBp4MJ49XcyKXPKJL6MMCKXQ1vF",
        // "X-Auth-Token": "WlqoaMyMJic3DPBp4MJ49XcyKXPKJL6MMCKXQ1vF",
      },
    });
    // const response = await fetch(url);

    data = await response.json();
  } catch (error) {
    console.log("fetch error = ", error);
  }

  return data;
};
