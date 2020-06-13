import * as React from 'react';
import ReadMore from 'react-native-read-more-text';
import TextComponent from './TextComponent';
import {Colors} from '../../constants/ThemeConstants';

export class ReadmoreComponent extends React.Component {
  _renderTruncatedFooter = (handlePress) => {
    return (
      <TextComponent
        style={{color: Colors.blue, marginTop: 5}}
        onPress={handlePress}>
        Read more
      </TextComponent>
    );
  };

  _renderRevealedFooter = (handlePress) => {
    return (
      <TextComponent
        style={{color: Colors.blue, marginTop: 5}}
        onPress={handlePress}>
        Show less
      </TextComponent>
    );
  };
  render() {
    let {text, lines, style} = this.props;

    return (
      <ReadMore
        numberOfLines={lines || 3}
        renderTruncatedFooter={this._renderTruncatedFooter}
        renderRevealedFooter={this._renderRevealedFooter}>
        <TextComponent style={style}>{text}</TextComponent>
      </ReadMore>
    );
  }
}
