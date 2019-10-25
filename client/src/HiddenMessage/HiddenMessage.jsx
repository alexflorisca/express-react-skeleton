/**
 * This is just a random component to demonstrate organisation and testing
 * 
 * Components are organised in a folder with the name of the feature they represent
 * HiddenMessage is the feature, and in this case, the main component of the feature. 
 * There can be more than one component in a feature, each with a .jsx, .scss and .test.js file.
 */

import React from 'react'
import { CSSTransition } from 'react-transition-group'

/**
 * Fade component
 */
function Fade({children, ...props}) {
  return (
    <CSSTransition {...props} timeout={1000} classNames="fade">
      {children}
    </CSSTransition>
  )
}

/**
 * HiddenMessage component
 */
class HiddenMessage extends React.Component {
  static defaultProps = {
		initialShow: false
  }
  
	state = {
		show: this.props.initialShow
	}
	
  toggle = () => {
    this.setState({show: !this.state.show});
  }

  render() {
    return (
      <div>
        <button onClick={this.toggle}>Toggle</button>
        <Fade in={this.state.show}>
          <div>Hello World</div>
        </Fade>
      </div>
    )
  }
}
export { HiddenMessage }