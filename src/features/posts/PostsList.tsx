import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {Link} from "react-router-dom";
import {fetchPosts, Post, selectAllPosts, selectPostsStatus} from "@/features/posts/postsSlice";
import {PostAuthor} from "@/features/posts/PostAuthor";
import {TimeAgo} from "@/components/TimeAgo";
import {ReactionButtons} from "@/features/posts/ReactionButtons";
import {useEffect} from "react";

interface PostExcerptProps {
  post: Post
}

  function PostExcerpt({post}: PostExcerptProps) {
    return (
      <article className={'post-excerpt'}>
        <h3>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h3>
        <p className={'post-content'}>{post.content.substring(0, 100)}</p>
        <PostAuthor userId={post.user}/>
        <TimeAgo timestamp={post.date}/>
        <ReactionButtons post={post}/>
      </article>
    )
  }

const PostsList = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(selectPostsStatus)

  useEffect(() => {
    if(postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  // Сортирую посты относительно временной метки date
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))


  const renderedPosts = orderedPosts.map(post => (
    <PostExcerpt post={post} key={post.id}/>
  ))

  return (
    <section className={'posts-list'}>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList
