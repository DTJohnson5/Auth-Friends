import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

export default function FriendForm(props) {
  const [form, setForm] = React.useState({ name: "", age: "", email: "" });

  React.useEffect(() => {
    if (props.editingFriend) {
      setForm({
        name: props.editingFriend.name,
        age: props.editingFriend.age,
        email: props.editingFriend.email
      });
    } else {
      setForm({ name: "", age: "", email: "" });
    }
  }, [props.editingFriend]);

  const handleChanges = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();

    if (props.editingFriend) {
      axiosWithAuth()
        .put(`/api/friends/${props.editingFriend.id}`, form)
        .then(res => {
          console.log("EDIT", res);
          props.setFriends(res.data);
          setForm({ name: "", age: "", email: "" });
          props.setEditingFriend(null);
        });
    } else {
      axiosWithAuth()
        .post("/api/friends", form)
        .then(res => {
          console.log("POST", res);
          props.setFriends(res.data);
          setForm({ name: "", age: "", email: "" });
        })
        .catch(err => console.log(err.response));
    }
  };

  const closeEdit = e => {
    e.preventDefault();
    props.setEditingFriend(null);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        Name: <input
          required
          type="text"
          name="name"
          value={form.name}
          onChange={handleChanges}
        />
        Age:
        <input
          required
          type="number"
          name="age"
          value={form.age}
          onChange={handleChanges}
        />
        Email:
        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={handleChanges}
        />
        <button type="submit">
          {props.editingFriend ? "Apply Changes" : "Add Friend"}
        </button>
        <button onClick={closeEdit}>Cancel</button>
      </form>
    </div>
  );
}