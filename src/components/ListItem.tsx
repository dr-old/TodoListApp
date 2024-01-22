import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../utils/Theme';

type Props = {
  item: any;
  onPress: (item: any) => void;
};

export function ListItem({item, onPress}: Props) {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.item}>
        <View style={styles.firstRow}>
          <Text style={styles.title}>{item.todo}</Text>
        </View>
        <View
          style={[
            styles.secondRow,
            item.completed ? styles.close : styles.open,
          ]}>
          <Text style={{color: colors.white}}>
            {item.completed ? 'Done' : 'Not Yet'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  firstRow: {
    marginBottom: 10,
  },
  secondRow: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    borderRadius: 15,
  },
  open: {
    backgroundColor: colors.red1,
  },
  close: {
    backgroundColor: colors.green1,
  },
  title: {fontWeight: 'bold', color: colors.darkBlue},
});
