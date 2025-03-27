const USER_DATA_KEY = "userData";

// 🔁 Lire userData
export const getUserDataFromStorage = () => {
  try {
    const raw = localStorage.getItem(USER_DATA_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Error parsing userData from localStorage:", err);
    return null;
  }
};

// 💾 Mettre à jour userData complet
export const setUserDataToStorage = (userData) => {
  try {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } catch (err) {
    console.error("Error saving userData to localStorage:", err);
  }
};

// ➕ Ajouter un favori (objet)
export const addFavoriteToUserStorage = (favoriteObj) => {
  const user = getUserDataFromStorage();
  if (!user) return null;

  const alreadyExists = user.favorites?.some(
    (f) => f.marvelId === favoriteObj.marvelId
  );
  if (!alreadyExists) {
    const updatedFavorites = [...(user.favorites || []), favoriteObj];
    const updatedUser = { ...user, favorites: updatedFavorites };
    setUserDataToStorage(updatedUser);
    return updatedUser;
  }

  return user;
};

// ➖ Supprimer un favori (par marvelId)
export const removeFavoriteFromUserStorage = (favoriteId) => {
  try {
    const raw = localStorage.getItem(USER_DATA_KEY);
    if (!raw) return null;

    const user = JSON.parse(raw);
    const updatedFavorites = user.favorites.filter(
      (fav) => fav._id !== favoriteId
    );

    const updatedUser = { ...user, favorites: updatedFavorites };
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));

    return updatedUser;
  } catch (err) {
    console.error("Error removing favorite from localStorage:", err);
    return null;
  }
};
