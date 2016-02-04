import React, {
  PropTypes,
  Component,
  View,
  Text,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import FinchReactStyles from 'finch-react-styles';
let { StyledComponent } = FinchReactStyles;
import Button from './Button'
import Link from './Link';

export default class Post extends StyledComponent {
  render() {
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const imgRatio = 500 / 900,
      imgMargin = 10,
      imgWidth = (SCREEN_WIDTH - imgMargin * 2),
      imgHeight = imgRatio * imgWidth;

    return (
      <View>
        <Text element="header">Фото: 100 тысяч человек на вокзале в Гуанчжоу</Text>
        <View>
          <Text element="text">
            <Text>Новогодний сезон поездок «Чуньюнь» в Китае, являющийся крупнейшим миграционным явлением в мире, в 2016 году значительно </Text>
            <Link href="http://ya.ru">осложнился</Link>
            <Text> неблагоприятными погодными условиями.</Text>
          </Text>
        </View>
        <View element="imagePlaceholder">
          <Image element="image" resizeMode='contain' source={{uri:'https://static39.cmtt.ru/club/0e/d0/63/10d1d953f7a872.jpg', width:imgWidth, height:imgHeight}} style={{width:imgWidth, height:imgHeight}} />
        </View>
        <View element="meta">
          <View element="buttons">
            <Button element="button" size="tiny" color="primary">/\</Button>
            <Button element="button" size="tiny" color="primary">33</Button>
            <Button element="button" size="tiny" color="primary">\/ Нравится</Button>
          </View>
          <View element="metaInfo">
            <Image element="avatar" resizeMode='cover' source={{uri:'https://static39.cmtt.ru/club/0e/d0/63/10d1d953f7a872.jpg', width:20, height:20}} style={{width:20, height:20}} />
            <Button size="tiny" color="primary">D 19</Button>
          </View>
        </View>
      </View>
    )
  }

  static styles = (T) => [
    {
      main: {
        paddingTop: 'ios' === Platform.OS ? 20 : void(0),
      },
      header: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'PT Sans',
      },
      text: {
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'PT Sans',
      },
      imagePlaceholder: {
        marginBottom: 10,
      },
      image: {
      },
      meta: {
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      buttons: {
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      button: {
        marginRight: 5,
      },
      metaInfo: {
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
      avatar: {
        marginRight: 10,
        borderRadius: 10,
      }
    }
  ];
}
