export const getFromStorage = function (key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  };
  
  export const addToStorage = function (obj, key) {
    const storageData = getFromStorage(key);
    storageData.push(obj);
    localStorage.setItem(key, JSON.stringify(storageData));
  };
  
  export const generateTestUser = function (User) {
    localStorage.clear();
    const testUser = new User("login", "password");
    User.save(testUser);
  };
  
  export const getTasks = function () {
    return getFromStorage("tasks");
  };