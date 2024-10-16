import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "@/app/hooks";
import {selectPostById} from "@/features/posts/postsSlice";
import {PostAuthor} from "@/features/posts/PostAuthor";
import {TimeAgo} from "@/components/TimeAgo";
import {ReactionButtons} from "@/features/posts/ReactionButtons";
import {selectCurrentUsername} from "@/features/auth/authSlice";

export const SinglePostPage = () => {
  const {postId} = useParams()

  const post = useAppSelector(state => selectPostById(state, postId!))
  const currentUsername = useAppSelector(selectCurrentUsername)

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canEdit = currentUsername === post.user

  return (
    <section>
      <article className={'post'}>
        <h2>{post.title}</h2>
        <p className={'post-content'}>{post.content}</p>
        <PostAuthor userId={post.user} showPrefix/>
        <TimeAgo timestamp={post.date}/>
        <ReactionButtons post={post}/>
        <br/>
        {canEdit &&
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        }
      </article>
    </section>
  )
}
