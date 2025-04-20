import React from 'react';
import styles from "./Loader.module.css";

class Loader extends React.Component {
  render() {
    return (
      <>
        {this.props.show && (
          <div className={`${styles.loader} ${!this.props.show && "hidden"}`} role="status">
            <div className={styles.circle}></div>
          </div>
        )}
      </>
    );
  }
}

export default Loader;