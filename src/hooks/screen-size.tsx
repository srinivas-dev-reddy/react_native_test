import {useWindowDimensions} from 'react-native';

export function useScreenSize() {
  const {width} = useWindowDimensions();
  if (width < 480) {
    return 'sm';
  } else if (width < 768) {
    return 'md';
  } else if (width < 1600) {
    return 'lg';
  } else {
    return 'xl';
  }
}
