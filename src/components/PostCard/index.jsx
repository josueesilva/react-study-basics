import  './styles.css'
export const PostCard = ({ id, cover, title, body }) => (
<div key={id} className="post-card">
    <img src={cover} alt="alt" />
    <div className="post-content">
        <h1>{title} - {id}</h1>
        <p>{body}</p>
    </div>
</div>
)