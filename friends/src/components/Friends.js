import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import FriendForm from "./FriendCard";

export default function FriendList() {
  const [friends, setFriends] = React.useState([]);
  const [editingFriend, setEditingFriend] = React.useState();

  const fetchFriends = () => {
    axiosWithAuth()
      .get("/api/friends")
      .then(res => {
        console.log(res);
        setFriends(res.data);
      })
      .catch(err => console.log(err.response));
  };

  React.useEffect(() => {
    fetchFriends();
  }, []);

  const deleteFriend = id => {
    axiosWithAuth()
      .delete(`/api/friends/${id}`)
      .then(res => {
        console.log(res);
        setFriends(res.data);
      })
      .catch(err => console.log(err.response));
  };

  const editFriend = friendObj => {
    setEditingFriend(friendObj);
  };

  return (
    <div>
      <FriendForm
        editingFriend={editingFriend}
        setFriends={setFriends}
        setEditingFriend={setEditingFriend}
      />
      {friends.map(friendObj => {
        return (
          <div key={friendObj.id}>
            {" "}
            <p className='name'>{friendObj.name}</p>
            <p className='age'>Age: {friendObj.age}</p>
            <p className='email'>Email: {friendObj.email}</p>
            <button onClick={() => editFriend(friendObj)}>Edit</button>{" "}
            <button onClick={() => deleteFriend(friendObj.id)}>Remove</button>{" "}
          </div>
        );
      })}
      <button onClick={fetchFriends}>Push me!</button>
    </div>
  );
}