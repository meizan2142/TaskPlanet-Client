export const getData = async () => {
    const res = await fetch('https://randomuser.me/api/?page=1&results=1&seed=abc')
    return res.json();
};