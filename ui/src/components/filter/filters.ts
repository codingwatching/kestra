const RECENTS = "recent";
const SAVED = "saved";

export const setRecent = (prefix, value) => {
    localStorage.setItem(`${RECENTS}__${prefix}`, JSON.stringify(value));
};

export const getRecents = (prefix) => {
    const recents = localStorage.getItem(`${RECENTS}__${prefix}`);
    return recents ? JSON.parse(recents) : [];
};

export const removeRecent = (prefix, element) => {
    let recents = getRecents(prefix).filter((item) => JSON.stringify(item) !== JSON.stringify(element));
    setRecent(prefix, recents);
};

export const setSaved = (prefix, value) => {
    localStorage.setItem(`${SAVED}__${prefix}`, JSON.stringify(value));
};

export const getSaved = (prefix) => {
    const saved = localStorage.getItem(`${SAVED}__${prefix}`);
    return saved ? JSON.parse(saved) : [];
};

export const removeSaved = (prefix, element) => {
    let saved = getSaved(prefix).filter((item) => JSON.stringify(item) !== JSON.stringify(element));
    setSaved(prefix, saved);
};
