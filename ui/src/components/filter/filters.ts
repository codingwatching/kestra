const RECENTS = "recents";
const SAVED = "saved";

export const setRecents = (prefix, value) => {
    localStorage.setItem(`${RECENTS}__${prefix}`, JSON.stringify(value));
};

export const getRecents = (prefix) => {
    const recents = localStorage.getItem(`${RECENTS}__${prefix}`);
    return recents ? JSON.parse(recents) : [];
};

export const setSaved = (prefix, value) => {
    localStorage.setItem(`${SAVED}__${prefix}`, JSON.stringify(value));
};

export const getSaved = (prefix) => {
    const saved = localStorage.getItem(`${SAVED}__${prefix}`);
    return saved ? JSON.parse(saved) : [];
};
