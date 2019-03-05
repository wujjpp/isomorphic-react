import React, { Component, MouseEvent, ReactNode } from "react";
import avatar from "./images/avatar.jpg";

export interface ICatProps {
  mouse: IStates;
}

export interface IMouseProps{
  render: (mouse: IStates) => ReactNode;
}

export interface IStates {
  x: number;
  y: number;
}

class Cat extends Component<ICatProps> {
  public render() {
    const mouse = this.props.mouse;
    return (
      <img src={avatar} style={{ position: "absolute", left: mouse.x, top: mouse.y, width: "40px;", height:"40px" }} />
    );
  }
}

class Mouse extends Component<IMouseProps, IStates> {
  constructor(props: IMouseProps) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  public handleMouseMove(event: MouseEvent) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  }

  public render() {
    return (
      <div style={{ height: "150px", border: "1px solid #f00" }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}

const WithMouse = withMouse(Cat)

export default class MouseTracker extends Component {
  public render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (<Cat mouse={mouse} />)}/>
        <WithMouse />
      </div>
    );
  }
}
