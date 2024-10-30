const RECENTS = "recents";

export const setRecents = (value) => {
    localStorage.setItem(RECENTS, JSON.stringify(value));
};

export const getRecents = () => {
    const recents = localStorage.getItem(RECENTS);
    return recents ? JSON.parse(recents) : [];
};
