import * as React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useQuery} from '@tanstack/react-query';

import {LoadingIndicator} from '../components/LoadingIndicator';
import {ErrorMessage} from '../components/ErrorMessage';
import {Divider} from '../components/Divider';
import {ListItem} from '../components/ListItem';
import {useRefreshByUser} from '../hooks/useRefreshByUser';
import {useRefreshOnFocus} from '../hooks/useRefreshOnFocus';
import {fetchMovies, Movie} from '../services/api-cc';
import {useNavigation} from '@react-navigation/native';

export function MoviesListScreen() {
  const {isPending, error, data, refetch} = useQuery<Movie[], Error>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);
  const navigation = useNavigation();

  const onListItemPress = React.useCallback(
    (movie: any) =>
      navigation.navigate('MovieDetails', {
        movie,
      }),
    [navigation],
  );

  const renderItem = React.useCallback(
    ({item}) => {
      return <ListItem item={item} onPress={onListItemPress} />;
    },
    [onListItemPress],
  );

  if (isPending) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.title}
      ItemSeparatorComponent={() => <Divider height={10} />}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
    />
  );
}
