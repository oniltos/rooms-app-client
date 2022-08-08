import { useState, useEffect } from "react";
import apiService from "../services/api.service";

import RoomPost from "../components/RoomPost";
import Spinner from "../components/Spinner";

function Homepage() {
  const [roomPosts, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const rooms = await apiService.getRooms()
      setRooms(rooms)
      setLoading(false)
    }
    fetchData()
  }, [refresh]);

  const deleteRoom = async (id) => {
    await apiService.deleteRoom(id)
    setRefresh(!refresh)
  }

  return (
    <div className="container mt-20 d-flex justify-content-center">
      {loading ? (
        <Spinner className="mt-5" color="text-secondary" />
      ) : (
        <div className="row">
          {roomPosts.map((post) => (
            <RoomPost post={post} key={post._id} deleteRoom={deleteRoom} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Homepage;
