import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "@/app/hooks";
import {PostAuthor} from "@/features/posts/PostAuthor";
import {TimeAgo} from "@/components/TimeAgo";
import {ReactionButtons} from "@/features/posts/ReactionButtons";
import {selectCurrentUsername} from "@/features/auth/authSlice";
import {useGetPostQuery} from "@/features/api/apiSlice";
import {Spinner} from "@/components/Spinner";
import React from "react";

export const SinglePostPage = () => {
  const {postId} = useParams()

  const currentUsername = useAppSelector(selectCurrentUsername)
  const {data: post, isFetching, isSuccess} = useGetPostQuery(postId!)

  let content: React.ReactNode

  const canEdit = currentUsername === post?.user

  if (isFetching) {
    content = <Spinner text={'Loading...'}/>
  } else if (isSuccess) {
    content = (
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
    )
  }

  return <section>{content}</section>
}
