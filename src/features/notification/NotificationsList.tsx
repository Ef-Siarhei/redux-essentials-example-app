import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {allNotificationsRead, selectAllNotifications} from "@/features/notification/notificationsSlice";
import {PostAuthor} from "@/features/posts/PostAuthor";
import {TimeAgo} from "@/components/TimeAgo";
import {useLayoutEffect} from "react";
import classNames from "classnames";

export const NotificationsList = () => {
  const dispatch = useAppDispatch()
  const notification = useAppSelector(selectAllNotifications)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderNotifications = notification.map(notification => {
    const notificationClassname = classNames('notification', {
      new: notification.isNew
    })

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>
            <PostAuthor userId={notification.user} showPrefix={false}/>
          </b>{' '}
          {notification.message}
        </div>
        <TimeAgo timestamp={notification.date}/>
      </div>
    )
  })

  return (
    <section className={'notificationsList'}>
      <h2>Notifications</h2>
      {renderNotifications}
    </section>
  )
}
