import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TextAreaInput from "../../components/TextAreaInput"
import apiService from "../../services/api.service"

const RoomDetail = () => {
    const [room, setRoom] = useState(null)
    const [loading, setLoading] = useState(true)
    const [reviewComment, setReviewComment] = useState('')
    const [reviewFormOpen, setReviewFormOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const room = await apiService.getRoom(id)
            console.log(room)
            setRoom(room)
            setLoading(false)
        }

        fetchData()
    }, [id, refresh])

    const sendReview = async (e) => {
        e.preventDefault()

        const review = {
            comment: reviewComment,
            roomId: id
        }
        await apiService.createReview(id, review)
        setRefresh(!refresh)
        setReviewFormOpen(false)
        setReviewComment('')
    }

    if(loading) { return <p>Loading...</p>}

    return (
        <div className="ml-3 mt-4">
        <div className="row">
          <div className="d-flex flex-column m-5">
                <h1>{ room.name }</h1>
                <img src={ room.imageUrl} alt={ room.name } />
                <p>{ room.description }</p>
                <div className="reviews">
                    <h2>Reviews</h2>
                    {
                        room.reviews.length ? room.reviews.map(review => {
                            return (
                                <div className="review-item">
                                    <p>{ review.comment }</p>
                                </div>
                            )
                        }) : <p>Room has no reviews</p>
                    }
                </div>
                <div className="new-review">
                    <button class="btn btn-primary" onClick={() => setReviewFormOpen(true)}>Add Review</button>
                    { reviewFormOpen && (
                        <div className="new-review-form flex">
                            <form onSubmit={sendReview}>
                                <TextAreaInput 
                                    name="comment"
                                    value={ reviewComment }
                                    onChange={ e => setReviewComment(e.target.value)}
                                    placeholder="Type your comment..."
                                />
                                <button type="submit" className="btn btn-success">Send Review</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    )
}

export default RoomDetail