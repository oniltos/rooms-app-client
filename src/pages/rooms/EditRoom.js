import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextInput from "../../components/TextInput";
import TextAreaInput from "../../components/TextInput";
import apiService from "../../services/api.service";


function EditRoom() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [info, setInfo ] = useState({name, description, imageUrl })
    const [loading, setLoading] = useState(true);

    const { id } = useParams()

    useEffect(() => {
      const fetchData = async () => {
        try {
          const room = await apiService.getRoom(id);
          setInfo(room)
          setLoading(false)
        } catch (err) {
          console.log(err)
        }
      }
      fetchData()
    }, [id])


  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await apiService.editRoom(id, info);
      alert('Room was successfully edited')
    } catch (err) {
      console.error(err);
    }
  }

  if(loading) {
    return <div>Loading room info...</div>
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
        value={info.name}
        onChange={(e) => setInfo({...info, name: e.target.value})}
      />

      <TextInput
        label="Picture"
        type="text"
        id="roomFormPic"
        name="imageUrl"
        value={info.imageUrl}
        onChange={(e) => setInfo({...info, imageUrl: e.target.value})}
      />

      <TextAreaInput
        label="Description"
        type="text"
        id="roomFormDescription"
        name="description"
        value={info.description}
        onChange={(e) => setInfo({...info, description: e.target.value})}
      />

      <button type="submit">Save</button>
    </form>
    </div>
  );
}

export default EditRoom;
