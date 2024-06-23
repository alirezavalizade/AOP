import { Component, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  rootID?: string;
  className?: string;
}

export default class Portal extends Component<PortalProps> {
  el: HTMLDivElement;

  static defaultProps = {
    rootID: "root",
  };

  constructor(props: PortalProps) {
    super(props);

    this.el = document.createElement("div");

    if (props.className) {
      this.el.className = props.className;
    }
  }

  componentDidMount() {
    const { rootID, className } = this.props;
    const root = document.getElementById(rootID!);

    if (root) {
      root.appendChild(this.el);

      if (className) {
        root.classList.add(...className.split(" "));
      }
    }
  }

  componentWillUnmount() {
    const { rootID } = this.props;
    const root = document.getElementById(rootID!);
    if (root) {
      root.removeChild(this.el);
    }
  }

  render() {
    const { children } = this.props;

    return createPortal(children, this.el);
  }
}
