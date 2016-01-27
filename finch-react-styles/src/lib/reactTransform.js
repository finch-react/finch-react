import React from 'react-native';
import warning from 'fbjs/lib/warning';

export default function reactTransform(element, callback, isMain=true) {
  warning(isMain && element.props.element && "main" !== element.props.element,
    "Main element can't have any element property, except 'main'");

  let extraProps = callback(element, isMain);

  let newChildren =
    React.isValidElement(element.props.children)
      ?
      reactTransform(React.Children.only(element.props.children), callback, false)
      :
      React.Children.map(element.props.children, childElement =>
        React.isValidElement(childElement)
          ?
          reactTransform(childElement, callback, false)
          :
          childElement
      );

  return React.cloneElement(element, extraProps, newChildren);
};
