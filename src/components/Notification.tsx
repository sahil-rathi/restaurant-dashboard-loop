import React from "react";
import { Toast } from "react-bootstrap";

type NotificationProps = {
  message: string;
};
function Notification(props: NotificationProps) {
  return (
    <Toast show={true}>
      <Toast.Header>
        <strong className="me-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>{props.message}</Toast.Body>
    </Toast>
  );
}
export default Notification;
