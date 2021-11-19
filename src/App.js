import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { storage } from "./base";
import {  setDoc,doc,addDoc, collection ,getDocs} from "firebase/firestore";
const db = getFirestore();

function App() {
  const [fileUrl, setFileUrl] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [users, setUsers] = useState([]);
  const [fileError, setFileError] = useState(null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const fileRef =  await ref(storage, file.name);
    await uploadBytes(fileRef, file);
    const x = await getDownloadURL(fileRef)

    if (x != null) {
      setFileUrl(x);
      setDisabled(false);
    } else {
      setFileError("something went wrong");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    console.log(username)
    if (disabled || !username) {
      return;
    }else {
      await addDoc(collection(db, "users"),{
        name: username,
        avatar: fileUrl,
      });
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await getDocs(collection(db,"users"));
        setUsers( usersCollection.docs.map((doc) => { return doc.data() }) );
    };
    fetchUsers();
  }, []);

  return (
    <>
      {fileError != null && fileError}
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <input type="text" name="username" placeholder="NAME" />
        <button disabled={disabled}>submit</button>
      </form>
      <ul>
        { users?.map((user) => {
          return (
            <li key={user.name}>
              <img width="100" height='100' src={user.avatar} alt={user.name} />
              <p>{user.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;