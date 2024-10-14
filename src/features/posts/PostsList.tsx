import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {Link} from "react-router-dom";
import {
  fetchPosts,
  selectPostById,
  selectPostIds,
  selectPostsError,
  selectPostsStatus
} from "@/features/posts/postsSlice";
import {PostAuthor} from "@/features/posts/PostAuthor";
import {TimeAgo} from "@/components/TimeAgo";
import {ReactionButtons} from "@/features/posts/ReactionButtons";
import React, {useEffect} from "react";
import {Spinner} from "@/components/Spinner";

interface PostExcerptProps {
  postId: string
}

let PostExcerpt =  ({postId}: PostExcerptProps) => {
  const post = useAppSelector(state => selectPostById(state, postId))
  return (
    <article className={'post-excerpt'}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className={'post-content'}>{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.user} showPrefix/>
      <TimeAgo timestamp={post.date}/>
      <ReactionButtons post={post}/>
    </article>
  )
}

const PostsList = () => {
  const dispatch = useAppDispatch()
  const orderedPostIds = useAppSelector(selectPostIds)
  const postStatus = useAppSelector(selectPostsStatus)
  const postError = useAppSelector(selectPostsError)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <Spinner text={'Loading...'}/>
  } else if (postStatus === 'succeeded') {
       content = orderedPostIds.map(postId => (
      <PostExcerpt postId={postId} key={postId}/>
    ))
  } else if (postStatus === 'rejected') {
    content = <div>{postError}</div>
  }

  return (
    <section className={'posts-list'}>
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
