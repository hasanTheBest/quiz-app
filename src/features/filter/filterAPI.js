export const fetchFilteredQuiz = async (cat, diffi, limit) => {
  // const response = await fetch(
  // `https://quizapi.io/api/v1/questions?apiKey=WlqoaMyMJic3DPBp4MJ49XcyKXPKJL6MMCKXQ1vF&limit=${limit}&category=${cat}&difficulty=${diffi}`
  // );

  // const response = await fetch( "https://v2.jokeapi.dev/joke/Any?amount=8"
  //     ).then(res => res.json());
  // // console.log(response)
  
  let data;
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?amount=8");
    data = await response.json();
  } catch (err) {
    console.log(err);
  }
  return data;
};
