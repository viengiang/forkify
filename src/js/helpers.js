export const getRecipe = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    return data;
  } catch (err) {
    throw err;
  }
};
