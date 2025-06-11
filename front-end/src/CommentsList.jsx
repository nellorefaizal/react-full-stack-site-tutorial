export default function commentsList({comments}){
    return(
        <>
            <h3>Comments:</h3>
            {comments.map(comments => <div key={comments.text}>
                <h4>{comments.postedBy}</h4>
                <p>{comments.text}</p>
            </div>)}
        </>
    )
}