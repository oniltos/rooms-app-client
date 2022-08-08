import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import TextAreaInput from "../../components/TextInput";
import apiService from "../../services/api.service";


function NewRoom() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate()


  async function handleSubmit(event) {
    event.preventDefault();

    const room = {
        name, description, imageUrl
    }

    try {
      const response = await apiService.createRoom(room);
      console.log(response);
      navigate('/')
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="m-2">
      <h1>New Room</h1>
      <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        type="text"
        id="roomFormName"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextInput
        label="Picture"
        type="text"
        id="roomFormPic"
        name="imageUrl"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <TextAreaInput
        label="Description"
        type="text"
        id="roomFormDescription"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Save</button>
    </form>
    </div>
  );
}

export default NewRoom;
