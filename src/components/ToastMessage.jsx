import React from 'react';
import styles from './ToastMessage.module.css';

class ToastMessage extends React.Component {
  render() {
    const { message = "toast Message", type = "info", show = false } = this.props;

    const colorMap = {
      info: styles.info,
      success: styles.success,
      warning: styles.warning,
      error: styles.error,
    };

    return (
      <div
        className={`${styles.toastMessage} ${colorMap[type]} ${!show ? "hidden" : ""}`}
        role="alert"
      >
        <span>{message}</span>
      </div>
    );
  }
}

export default ToastMessage;