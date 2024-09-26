import {useAppSelector} from "@/app/hooks";
import {Link} from "react-router-dom";
import {selectAllPosts} from "@/features/posts/postsSlice";
import {PostAuthor} from "@/features/posts/PostAuthor";
import {TimeAgo} from "@/components/TimeAgo";

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts)

  const renderedPosts = posts.map(post => (
    <article className={'post-excerpt'} key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className={'post-content'}>{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.user}/>
      <TimeAgo timestamp={post.date}/>
    </article>
  ))

  return (
    <section className={'posts-list'}>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList
